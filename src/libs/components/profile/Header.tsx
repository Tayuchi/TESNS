'use client'

import { Box, Button, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
interface UserProfile {
    nickname: string;
    postsOfNumber: number;
}
export default function Header() {
    const [postsOfNumber, setPostsOfNumber] = useState(0 + ' posts');
    const [user, setUser] = useState<UserProfile | null>(null);
    const [uName, setUName] = useState('');

    useEffect(() => {
        // ローカルストレージからユーザーデータを取得
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const emailFormatted = parsedUser.email.replace(/\./g, ',');

            // ユーザーデータの取得
            const userRef = doc(firestore, 'users', emailFormatted);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data() as UserProfile;
                    setUser(userData);
                    // 取得したデータでUIの状態を更新
                    setUName(userData.nickname);
                }
            }).catch(console.error);
        }
    }, []);
    // データとってくる処理

    return (
        <Box sx={{ position: 'fixed', backgroundColor: '#FFFFFF', padding: 1, width: '100%', zIndex: 9999 }}>
            <Grid container alignItems="center">
                <Grid item xs={1.5}>
                    <Button href="/home" style={{ padding: 0 }}>
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
