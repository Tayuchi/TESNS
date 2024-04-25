import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Nav from "./nav";

export default function Profile() {
    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <Image
                        src="/1500x500.jpg"
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
                        src="/3zU3wFwk_400x400.jpg"
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
            <Typography fontWeight="fontWeightBold" color={'#0f1419'} sx={{ fontSize: '20px', ml: 1 }}>すんぎょ</Typography>
            <Typography sx={{ fontSize: '13px', ml: 1 }} color={'#536471'} >@ユーザーID</Typography>
            <Typography sx={{ ml: 1, mr: 1, mt: 2, mb: 2 }} color={'#0f1419'}>わたしはすんぎょすんぎょすんぎょすんぎょすんぎょすんぎょすんぎょすんぎょ</Typography>
            <Typography sx={{ ml: 1, mr: 1, mt: 2, mb: 2 }} color={'#536471'}>created_at</Typography>

            <Grid container>
                <Grid item xs={3}>
                    <Typography sx={{ fontSize: '13px', ml: 1 }} color={'#536471'} >Following</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ fontSize: '13px', ml: 1 }} color={'#536471'} >Followers</Typography>
                </Grid>
            </Grid>
            <Nav />
        </>
    )
}
