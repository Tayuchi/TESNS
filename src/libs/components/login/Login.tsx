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

    const handleClick = () => {
        const data = {
            email: email,
            password: password
        };

        // ユーザーが入力した値をどうこうする

    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Card sx={{ maxWidth: 250 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="fontWeightBold">
                            ログイン
                        </Typography>

                        <TextField id="email" label="メールアドレス" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <PassField value={password} onChange={(e) => setPassword(e.target.value)} />

                        <Button fullWidth sx={{ mt: 2 }} onClick={handleClick} color="primary" variant="contained" >
                            ログインする
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}
