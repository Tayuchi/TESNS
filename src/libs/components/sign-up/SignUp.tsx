'use client'

import { TextField, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import PassField from "../PassField"
import { useState } from "react";
import { auth, firestore } from '../firebase/firebase'; // パスは貴様の環境に合わせて変更すること
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleClick = async () => {
        const data = {
            name: name,
            email: email,
            password: password
        };

        if (!email || !password) {
            setEmailError(true);
            return; // メールアドレスやパスワードが空の場合はここで処理を止める
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(firestore, "users", user.uid), {
                nickname: name,
                email: email,
            });
            console.log("アカウント作成成功:", userCredential.user);
            // サインアップ後の処理をここに書く（例：ダッシュボードページにリダイレクト等）
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
                        <Typography variant="h6" fontWeight="fontWeightBold">
                            アカウントを作成
                        </Typography>
                        <TextField
                            id="name"
                            label="名前"
                            variant="outlined"
                            sx={{ width: '96%' }}
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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

                        <Button
                            sx={{ mt: 2, width: '96%' }}
                            onClick={handleClick}
                            color="primary"
                            variant="contained"
                        >
                            アカウントを作成する
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
}
