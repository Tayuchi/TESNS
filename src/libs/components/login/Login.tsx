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

export default function Login() {

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Card sx={{ maxWidth: 250 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="fontWeightBold">
                            TESNSにログインする
                        </Typography>

                        <TextField id="mail" label="メールアドレス" variant="outlined" margin="normal" />
                        <PassField />

                        <Button fullWidth sx={{ mt: 2 }} type="submit" color="primary" variant="contained" >
                            ログイン
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}
