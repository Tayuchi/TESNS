'use client'
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';
import { useSearchParams } from "next/navigation";
import { TextField, Button, Card, CardContent, Typography, CardMedia } from '@mui/material';
import Link from 'next/link';
const getUserFromStorage = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
};
export default function AccountInformation() {

    const [userId, setUserId] = useState('');
    const [userImage, setUserImage] = useState();
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [nickname, setNickname] = useState('');
    const storedUser = localStorage.getItem('user');
    const [email, setEmail] = useState('');
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setEmail(parsedUser.email);
        }
    }, []);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (userId && profileImage && nickname) {
            if (email != null) {

                const imageRef = ref(storage, `userImages/${userId}`);
                const uploadResult = await uploadBytes(imageRef, profileImage);
                const imageUrl = await getDownloadURL(uploadResult.ref);

                const emailFormatted = (email).replace(/\./g, ','); // FirestoreのIDとして使用するためにメールアドレスのドットをカンマに置換
                await setDoc(doc(firestore, "users", emailFormatted), {
                    email: email,
                    profileImage: imageUrl,
                    nickname: nickname,
                    userId: userId,
                    follow: 0,
                    follower: 0,
                    postsOfNumber: 0,
                });
            }
        }
        else {
            alert("入力されてない項目があります！");
        }

    };
    const isLinkDisabled = !(userId && profileImage && nickname);

    return (
        <Card sx={{ maxWidth: 480, m: 'auto', mt: 5, p: 3 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    アカウント情報を設定
                </Typography>
                <TextField
                    fullWidth
                    label="ニックネーム"
                    variant="outlined"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="ユーザーID"
                    variant="outlined"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    画像を選択
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {previewUrl && (
                    <CardMedia
                        component="img"
                        sx={{ width: '50%', height: 'auto', mt: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                        image={previewUrl}
                        alt="プレビュー画像"
                    />
                )}
                <Link href={isLinkDisabled ? "/home" : {
                    pathname: "",
                }}>
                    <div style={{ pointerEvents: isLinkDisabled ? 'none' : 'auto' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={handleSave}
                            disabled={isLinkDisabled}
                        >
                            次へ
                        </Button>
                    </div>
                </Link>
            </CardContent>
        </Card>
    );
}