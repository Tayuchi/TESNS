'use client'

import { TextField, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import PassField from "../PassField"
import { useState } from "react";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleClick = () => {
        const data = {
            name: name,
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
                            アカウントを作成
                        </Typography>

                        <TextField
                            id="name"
                            label="名前"
                            variant="outlined"
                            sx={{width: '96%'}}
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            label="メールアドレス"
                            variant="outlined"
                            sx={{ mb: 1, width: '96%'}}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            error={emailError}
                            helperText={emailError ? 'メールアドレスを入力してください' : ''}
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
    )
}
