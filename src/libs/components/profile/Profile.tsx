'use client'

import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Nav from "./nav";
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
interface UserProfile {
    nickname: string;
    email: string;
    userId: string;
    followers: number;
    following: number;
    profileImage?: string;  // プロファイル画像のURLを含む新しいプロパティ
}
type PostData = {
    id: string;
    content: string;
    imageUrl?: string;
    likes: number;
    retweets: number;
    replies: number;
    userEmail: string;
};
export default function Profile() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<PostData[]>([]);
    var createdAt = 'なう';
    const [uName, setUName] = useState('');
    const [uID, setUID] = useState('');
    const [hdPicSrc, setHdPicSrc] = useState('');
    const [icnSrc, setIcnSrc] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [followings, setFollowings] = useState(0);
    const [followers, setFollowers] = useState(0);
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
                    setUID(userData.userId);
                    setHdPicSrc('/1500x500.jpg'); // 仮に固定の画像パスを設定
                    setIcnSrc(userData.profileImage || '/3zU3wFwk_400x400.jpg');
                    //setIntroduction(userData.introduction || '紹介文が設定されていません。');
                    setFollowings(userData.following);
                    setFollowers(userData.followers);
                }
            }).catch(console.error);

            // ユーザーの投稿を取得
            const q = query(collection(firestore, 'posts'), orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const postsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    content: doc.data().content,
                    imageUrl: doc.data().imageUrl,
                    likes: doc.data().likes,
                    retweets: doc.data().retweets,
                    replies: doc.data().replies,
                    userEmail: doc.data().userEmail,
                }) as PostData);
                setPosts(postsData);
            });

            return () => unsubscribe(); // コンポーネントのアンマウント時にリスナーを解除
        }
    }, []);



    // データ取ってくる処理

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <Image
                        src={hdPicSrc}
                        width={1080}
                        height={360}
                        layout="responsive"
                        objectFit="cover"
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
