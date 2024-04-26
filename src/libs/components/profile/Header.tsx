'use client'

import { Box, Button, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";

export default function Header() {
    const [uName, setUName] = useState('すんぎょ');
    const [postsOfNumber, setPostsOfNumber] = useState('24K posts');

    // データとってくる処理

    return (
        <Box sx={{ position: 'fixed', backgroundColor: '#FFFFFF', padding: 1, width: '100%', zIndex: 9999 }}>
            <Grid container alignItems="center">
                <Grid item xs={1.5}>
                    <Button href="/" style={{ padding: 0 }}>
                        <ArrowBack />
                    </Button>
                </Grid>
                <Grid item xs={10.5}>
                    <Typography fontWeight="fontWeightBold" color={'#0f1419'} sx={{ fontSize: '20px' }}>
                        {uName}
                    </Typography>
                    <Typography sx={{ fontSize: '13px' }} color={'#536471'}>
                        {postsOfNumber}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
