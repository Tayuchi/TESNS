"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Grid, Card, CardContent, Typography, Button  } from '@mui/material'

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // ログアウト処理
    localStorage.clear();
    router.push('/login');
  }

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Card sx={{ maxWidth: 300 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="fontWeightBold">
              ログアウトしますか？
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2, mr:2 }} onClick={handleLogout}>
              はい
            </Button>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} >
              <Link href='/home'>
                キャンセル
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </div>
  )
}

export default Logout