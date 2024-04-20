'use client'

import { TextField, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import PassField from "../PassField"
import { useState } from "react";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        const data = {
            name: name,
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
                            アカウントを作成
                        </Typography>

                        <TextField id="name" label="名前" variant="outlined" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField id="email" label="メールアドレス" variant="outlined" sx={{ mb: 1 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <PassField value={password} onChange={(e) => setPassword(e.target.value)} />

                        <Button fullWidth sx={{ mt: 2 }} onClick={handleClick} color="primary" variant="contained" >
                            アカウントを作成する
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}

