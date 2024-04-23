'use client'

import * as React from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    Typography,
} from "@mui/material"
import PassField from '../PassField';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';
export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState('');

    const validateEmail = () => {
        const isValid = identifier.includes('@') ? /^.+@.+\..+$/.test(identifier) : true; // メール形式またはニックネームをチェック
        setEmailError(!isValid);
        if (!isValid) {
            setLoginError('正しいメールアドレスを入力してください');
        }
    };

    const handleLogin = async () => {
        if (!identifier || !password) {
            setLoginError('メールアドレスとパスワードを入力してください。');
            return;
        }
        let email = identifier;
        if (!identifier.includes('@')) { // ニックネームでのログインを試みる
            const q = query(collection(firestore, "users"), where("nickname", "==", identifier));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setLoginError("該当するニックネームが見つかりません。");
                return;
            }
            email = querySnapshot.docs[0].data().email; // ニックネームに対応するメールアドレスを取得
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("ログイン成功:", userCredential.user);
            setLoginError('');
        } catch (error) {
            setLoginError('ログインに失敗しました。メールアドレスまたはパスワードが間違っています。');
            console.error('ログインエラー:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Card sx={{ maxWidth: 300 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="fontWeightBold">
                            ログイン
                        </Typography>
                        <TextField
                            id="identifier"
                            label="メールアドレスまたはニックネーム"
                            variant="outlined"
                            margin="normal"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            onBlur={validateEmail}
                            error={emailError}
                            helperText={loginError || (emailError && '正しいメールアドレスを入力してください')}
                            sx={{ width: '96%' }}
                        />
                        <PassField value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button fullWidth sx={{ mt: 2, width: '96%' }} onClick={handleLogin} color="primary" variant="contained">
                            ログインする
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
}