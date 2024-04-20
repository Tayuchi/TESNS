import { TextField, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import PassField from "../PassField"
import Link from "next/link"

export default function SignUp() {
    const href = '/dashboard/customers'

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Card sx={{ maxWidth: 250 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="fontWeightBold">
                            アカウントを作成
                        </Typography>

                        <TextField id="mail" label="名前" variant="outlined" margin="normal" />
                        <TextField id="mail" label="メールアドレス" variant="outlined" sx={{ mb: 1 }}/>
                        <PassField />
                        <Link href="/login/pass">
                            <Button fullWidth sx={{ mt: 2 }} type="submit" color="primary" variant="contained" >
                                次へ
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}
