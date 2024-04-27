'use client'

import { TextField, Button, Card, CardContent, Grid, Typography, colors } from "@mui/material"
import PassField from "../PassField"
import { useState } from "react";
import { auth, firestore } from '../firebase/firebase'; // パスは貴様の環境に合わせて変更すること
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleClick = async () => {
        const data = {
            email: email,
            password: password
        };

        if (!email || !password) {
            setEmailError(true);
            return; // メールアドレスやパスワードが空の場合はここで処理を止める
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("アカウント作成成功:", userCredential.user);

            // ローカルストレージにユーザーデータを保存
            localStorage.setItem('user', JSON.stringify(userCredential.user));
        } catch (error) {
            const firebaseError = error as Error; // エラーをErrorとして扱う
            console.error("アカウント作成エラー:", firebaseError.message); // firebaseError.message でエラーメッセージを参照
            // エラー処理をここに書く（例：エラーメッセージを表示）
        }
    };

    const validateEmail = () => { // 追加
        const isValid = /^.+@.+/.test(email);
        setEmailError(!isValid)
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Card sx={{ maxWidth: 300 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the image */}
                            <Image
                                src="/icon.jpg"
                                width={50}
                                height={50}
                                layout="fixed"
                                alt=""
                            />
                        </div>

                        <Typography variant="h6" fontWeight="fontWeightBold">
                            アカウントを作成
                        </Typography>
                        <TextField
                            fullWidth
                            id="email"
                            label="メールアドレス"
                            variant="outlined"
                            sx={{ mb: 1, width: '96%' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            error={emailError}
                            helperText={emailError ? '正しいメールアドレスを入力してください' : ''}
                        />
                        <PassField value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Link href={{
                            pathname: "/accountInformation"
                        }}>
                            <Button
                                sx={{ mt: 2, mb: 2, width: '96%' }}
                                onClick={handleClick}
                                color="primary"
                                variant="contained"
                            >
                                アカウントを作成する
                            </Button>
                        </Link>
                        <Link href="/login" style={{ color: '#1d9bf0' }}>
                            ログインする
                        </Link>

                    </CardContent>
                </Card>
            </Grid>
        </div >
    );
}
