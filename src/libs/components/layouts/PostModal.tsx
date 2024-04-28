'use client'
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardMedia, Modal } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { storage, firestore } from '../firebase/firebase';
import { User } from 'firebase/auth';
interface PostModalProps {
    open: boolean;
    handleClose: () => void;

}

const PostModal: React.FC<PostModalProps> = ({
    open,
    handleClose,
}) => {
    const [postContent, setPostContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string>('');
    const [postImage, setPostImage] = useState<File | null>(null);
    const [user, setUser] = useState<any>(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            // 画像ファイルの拡張子を確認
            const fileType = file.type;
            if (fileType === "image/jpeg" || fileType === "image/png") {
                setPostImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result as string;
                    setImagePreview(base64data);
                };
                reader.readAsDataURL(file);
            } else {
                // 対応していないファイルタイプの場合、警告を表示
                alert('JPEG、PNG以外の画像はアップロードできません！！');
            }
        }
    };
    async function uploadImageToServer(imageUrl: string) {
        try {
            const response = await fetch('/api/firebase', {  // `/api/uploadImage`はサーバー側のAPIエンドポイントのパス
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imageUrl })
            });

            const data = await response.json();  // サーバーからのレスポンスをJSON形式で受け取る

            if (response.ok) {
                console.log('Image uploaded successfully:', data.savedUrl);
                return data.savedUrl;  // アップロードした画像の永続的なURLを返す
            } else {
                throw new Error(data.error || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    async function imageGenerate(prompt: string): Promise<string> {
        console.log("prompt", prompt);
        try {
            const response = await fetch('/api/dalle3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    str: prompt
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // サーバーからのレスポンスをJSONとしてパース
            return data.dalle3Url;
        } catch (error) {
            console.error("エラーが発生しました:", error);
            throw new Error("API response processing failed.");
        }
    }
    async function sendImageToAPI(imageData: string, imageType: string): Promise<string> {
        console.log("base64data", imageData)
        console.log("postImage.type", imageType)
        try {
            const response = await fetch('/api/anthropicPicture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image1_media_type: imageType,
                    image1_data: imageData
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();  // サーバーからのレスポンスをJSONとしてパース
            return data.message;  // 応答からメッセージを返す
        } catch (error) {
            console.error("エラーが発生しました:", error);
            throw new Error("API response processing failed.");
        }
    }

    const handleSubmit = async () => {
        if (!user || !user.email) return;

        try {
            const res = await fetch('/api/anthropic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: postContent
                }),
            });
            const data = await res.json();

            if (data.message != "") {
                const contentToSave = data.message;

                if (postImage) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        const result = reader.result as string;
                        const base64data = result.replace(/^data:image\/\w+;base64,/, '');
                        try {
                            const imageInformation = await sendImageToAPI(base64data, postImage.type);
                            const generatedImage = await imageGenerate(imageInformation);

                            if (generatedImage) {
                                const imageUrl = await uploadImageToServer(generatedImage);

                                // Update Firestore after the image URL is available
                                const newPostRef = doc(collection(firestore, 'posts'));
                                await setDoc(newPostRef, {
                                    content: contentToSave,
                                    imageUrl: imageUrl,
                                    likes: 0,
                                    retweets: 0,
                                    replies: 0,
                                    email: user.email,
                                    timestamp: serverTimestamp()
                                });
                            } else {
                                console.error("Generated image URL is invalid.");
                                alert('生成された画像のURLが無効です。');
                            }
                        } catch (error) {
                            console.error("Error during image processing:", error);
                            alert('画像を保存できませんでした。URLが正しいか確認してください。');
                        }
                    };
                    reader.readAsDataURL(postImage);
                } else {
                    // No image case, just save the text
                    const newPostRef = doc(collection(firestore, 'posts'));
                    await setDoc(newPostRef, {
                        content: postContent,
                        imageUrl: '',  // No image URL
                        likes: 0,
                        retweets: 0,
                        replies: 0,
                        email: user.email,
                        timestamp: serverTimestamp()
                    });
                }
            }

            setPostContent('');
            setImagePreview('');
            setPostImage(null);
            handleClose();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '16px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="post-modal-title"
            aria-describedby="post-modal-description"
        >
            <Box sx={style}>
                <Typography id="post-modal-title" variant="h6" component="h2">
                    投稿画面
                </Typography>
                <TextField
                    id="post-content"
                    label="何を思ってる？"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    margin="normal"
                />
                <input
                    accept="image/*"
                    id="post-image"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="post-image">
                    <Button variant="outlined" color="primary" component="span">
                        画像をアップロード
                    </Button>
                </label>
                {imagePreview && (
                    <Card sx={{ maxWidth: 345, mt: 2 }}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={imagePreview}
                            alt="Image preview"
                        />
                    </Card>
                )}
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        送信
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default PostModal;
