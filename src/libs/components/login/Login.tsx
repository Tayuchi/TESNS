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

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);


    const handleClick = () => {
        const data = {
            email: email,
            password: password
        };

        // ユーザーが入力した値をどうこうする

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
                            ログイン
                        </Typography>

                        <TextField 
                            id="email" 
                            label="メールアドレス" 
                            variant="outlined" 
                            margin="normal" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            sx={{width: '96%'}}
                            onBlur={validateEmail}
                            error={emailError}
                            helperText={emailError ? 'メールアドレスを入力してください' : ''}
                        />
                        <PassField value={password} onChange={(e) => setPassword(e.target.value)} />

                        <Button fullWidth sx={{ mt: 2, width:'96%' }} onClick={handleClick} color="primary" variant="contained" >
                            ログインする
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}
