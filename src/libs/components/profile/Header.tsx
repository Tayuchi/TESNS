'use client'

import { Box, Button, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function Header() {
    return (
        <Box sx={{ position: 'fixed', backgroundColor: '#FFFFFF', padding: 1 , width: '100%', zIndex: 9999}}>
            <Grid container alignItems="center">
                <Grid item xs={1}>
                    <ArrowBack />
                </Grid>
                <Grid item xs={11}>
                    <Typography fontWeight="fontWeightBold" color={'#0f1419'} sx={{ fontSize: '20px' }}>
                        すんぎょ
                    </Typography>
                    <Typography  sx={{ fontSize: '13px' }} color={'#0f1419'}>
                        ポスト数
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
