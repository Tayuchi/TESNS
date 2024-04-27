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
    const [imagePreview, setImagePreview] = useState('');
    const [postImage, setPostImage] = useState<File | null>(null);
    const [user, setUser] = useState<any>(null);
    const [claude3Message, setClaude3Message] = useState('');
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setPostImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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

            // 応答から特定のテキスト内容だけを抽出して状態にセット
            if (data && data.message) {
                setClaude3Message(data.message);
            } else {
                console.error('No message returned from the API');
            }

            if (postImage) {
                const imageRef = ref(storage, `images/${postImage.name}`);
                const snapshot = await uploadBytes(imageRef, postImage);
                imageUrl = await getDownloadURL(snapshot.ref);
            }
            const newPostRef = doc(collection(firestore, 'posts'));
            await setDoc(newPostRef, {
                content: claude3Message,
                imageUrl: imageUrl,
                likes: 0,
                retweets: 0,
                replies: 0,
                email: user.email,
                timestamp: serverTimestamp()
            });

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
