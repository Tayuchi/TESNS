'use client'

import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Nav from "./nav";
import { useId, useState } from "react";

export default function Profile() {
    var createdAt = 'なう';
    const [uName, setUName] = useState('すんぎょ');
    const [uID, setUID] = useState('@user_id');
    const [hdPicSrc, setHdPicSrc] = useState('/1500x500.jpg');
    const [icnSrc, setIcnSrc] = useState('/3zU3wFwk_400x400.jpg');
    const [introduction, setIntroduction] = useState('わたしはすんぎょすんぎょすんぎょすんぎょすんぎょすんぎょすんぎょすんぎょ');
    const [followings, setFollowings] = useState(100);
    const [followers, setFollowers] = useState(100);

    // データ取ってくる処理

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <Image
                        src={hdPicSrc}
                        width={1080}
                        height={360}
                        layout="fixed"
                        objectFit="cover"
                        className="hidden md:block"
                        alt=""
                    />
                </Grid>
                <Grid item xs={3}>
                    <Image
                        src={icnSrc}
                        width={200}
                        height={200}
                        layout="fixed"
                        alt=""
                        style={{ borderRadius: '100%', marginTop: '-50%' }}
                    />
                </Grid>
                <Grid item xs={7}></Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' size='small' style={{ borderRadius: '10%' }} color='inherit'>Edit</Button>
                </Grid>
            </Grid>
            <Typography fontWeight="fontWeightBold" color={'#0f1419'} sx={{ fontSize: '20px', ml: 1 }}>{uName}</Typography>
            <Typography sx={{ fontSize: '13px', ml: 1 }} color={'#536471'} >{uID}</Typography>
            <Typography sx={{ ml: 1, mr: 1, mt: 2, mb: 2 }} color={'#0f1419'}>{introduction}</Typography>
            <Typography sx={{ ml: 1, mr: 1, mt: 2, mb: 2 }} color={'#536471'}>{createdAt}</Typography>

            <Grid container>
                <Grid item xs={3}>
                    <Typography sx={{ fontSize: '13px', ml: 1 }} color={'#536471'} >
                        <span style={{ color: '#0f1419', fontWeight: 'bold', marginRight: 3, fontSize: '14px' }}>{followings}</span>Following
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ fontSize: '13px', ml: 1 }} color={'#536471'} >
                        <span style={{ color: '#0f1419', fontWeight: 'bold', marginRight: 3, fontSize: '14px' }}>{followers}</span>
                        Followers
                    </Typography>
                </Grid>
            </Grid>
            <Nav />
        </>
    )
}
