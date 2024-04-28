'use client'
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardMedia, Modal } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { storage, firestore } from '../firebase/firebase';
import { User } from 'firebase/auth';
import { sendImageToAPI } from '@/app/api/anthropicPicture/route';
import { imageGenerate } from '@/app/api/dalle3/route';
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


    // DALL-Eからの画像URLをフェッチしてFirebase Storageにアップロードし、永続的なURLを取得する関数
    async function saveImageToFirebase(imageUrl: string) {
        console.log("saveImageToFirebase started with URL:", imageUrl);  // 開始ログ

        try {
            const response = await fetch(imageUrl, { mode: "no-cors" });
            console.log("Fetched image from URL:", response);  // レスポンスログ
            if (!response.ok) throw new Error(`Failed to fetch image from URL: ${response.statusText}`);

            const blob = await response.blob();  // 画像データをBlobとして取得
            console.log("Converted response to Blob:", blob);  // Blob変換ログ
            if (!blob) throw new Error("Failed to convert response to blob.");

            const imageRef = ref(storage, `images/${new Date().getTime()}`);
            console.log("Firebase Storage ref created:", imageRef);  // Storage refログ

            const snapshot = await uploadBytes(imageRef, blob);  // BlobをFirebase Storageにアップロード
            console.log("Uploaded Blob to Firebase Storage:", snapshot);  // アップロードログ
            if (!snapshot) throw new Error("Failed to upload blob to Firebase Storage.");

            const permanentUrl = await getDownloadURL(snapshot.ref);  // 永続的なURLを取得
            console.log("Retrieved permanent URL from Firebase:", permanentUrl);  // 永続URL取得ログ
            return permanentUrl;
        } catch (error) {
            console.error("Error in saveImageToFirebase:", error);
            throw error;  // 再throwして呼び出し元でキャッチ可能にする
        }
    }


    const handleSubmit = async () => {
        if (!user || !user.email) return;
        try {
            let imageUrl = '';


            const res = await fetch('/api/anthropic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: postContent
                }),
            })
            const data = await res.json()

            console.log("postModal", data)

            // 応答から特定のテキスト内容だけを抽出して状態にセット
            if (data.message != "") {
                const contentToSave = data.message;

                if (postImage) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        const result = reader.result as string;
                        // プレフィックスを削除
                        const base64data = result.replace(/^data:image\/\w+;base64,/, '');
                        try {
                            console.log("base64data", base64data)
                            console.log("postImage.type", postImage.type)
                            const imageInformation = await sendImageToAPI(base64data, postImage.type);
                            console.log(imageInformation);
                            const generatedImage = await imageGenerate(imageInformation);
                            console.log("Generated Image Data:", generatedImage);
                            if (generatedImage) {
                                try {
                                    console.log("Generated Image Data:", generatedImage);
                                    imageUrl = await saveImageToFirebase(generatedImage);
                                } catch (error) {
                                    console.error("Error saving image to Firebase:", error);
                                    alert('画像を保存できませんでした。URLが正しいか確認してください。');
                                    return;
                                }
                            } else {
                                console.error("Generated image URL is invalid.");
                                alert('生成された画像のURLが無効です。');
                                return;
                            }
                        } catch (error) {
                            console.error("sendImageToAPIでエラーが発生しました:", error);
                        }
                    };
                    reader.readAsDataURL(postImage);
                    /*
                    const imageRef = ref(storage, `images/${postImage.name}`);
                    const snapshot = await uploadBytes(imageRef, postImage);
                    imageUrl = await getDownloadURL(snapshot.ref);
                    */

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
                }
                else {
                    // 画像がない場合の処理
                    const newPostRef = doc(collection(firestore, 'posts'));
                    await setDoc(newPostRef, {
                        content: postContent,
                        imageUrl: '',  // 画像がない場合は空のURL
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
