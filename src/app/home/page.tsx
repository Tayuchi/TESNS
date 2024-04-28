'use client'
import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, onSnapshot, orderBy, DocumentData } from 'firebase/firestore';
import { firestore } from '@/libs/components/firebase/firebase';
import { Card, IconButton, Link, Stack, Typography } from '@mui/material';
import RedirectIfNoUser from '@/libs/components/acountInformation/Redirect';
import Image from 'next/image';
import twemoji from 'twemoji';
//@ts-ignore
import DOMParserReact from 'dom-parser-react'
import ReactSVG from 'react-svg';

const DEFAULT_AVATAR = ""; // TODO: 初期アバターのURLをぶちこむ

const emoji_urls = {
    heart: `https://twemoji.maxcdn.com/v/latest/svg/${twemoji.convert.toCodePoint("❤").split('-')[0]}.svg`,
    recycle: `https://twemoji.maxcdn.com/v/latest/svg/${twemoji.convert.toCodePoint("♻️").split('-')[0]}.svg`,
    message: `https://twemoji.maxcdn.com/v/latest/svg/${twemoji.convert.toCodePoint("💬").split('-')[0]}.svg`,
};

type UserData = {
    email: string;
    nickname: string;
    profileImage: string;
    userId: string;
};

type PostData = {
    id: string;
    content: string;
    imageUrl?: string;
    likes: number;
    retweets: number;
    replies: number;
    userEmail: string;
    userData?: UserData;
};
export default function HomePage() {
    RedirectIfNoUser();
    const [user, setUser] = useState<UserData | null>(null);
    const [posts, setPosts] = useState<PostData[]>([]); // 投稿を保持するための状態
    useEffect(() => {
        const q = query(collection(firestore, 'posts'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const postsWithUsers = await Promise.all(querySnapshot.docs.map(async docSnapshot => { // docSnapshotに名前を変更
                const postData = docSnapshot.data();
                const userEmailFormatted = postData.email.replace(/\./g, ',');
                const userRef = doc(firestore, 'users', userEmailFormatted);
                const userSnap = await getDoc(userRef);
                let userData: UserData | undefined = undefined;

                if (userSnap.exists()) {
                    userData = userSnap.data() as UserData;
                }

                return {
                    id: docSnapshot.id, // docSnapshotを使用
                    content: postData.content,
                    imageUrl: postData.imageUrl,
                    likes: postData.likes,
                    retweets: postData.retweets,
                    replies: postData.replies,
                    userEmail: postData.userEmail,
                    userData // ユーザーデータを関連付ける
                };
            }));

            setPosts(postsWithUsers);
        });

        return () => unsubscribe();
    }, []);


    return (
        <>
            {posts.map((post) => (
                <Card key={post.id} sx={{
                    padding: 1,
                    width: { xs: "100%", sm: "500px" },
                    margin: 2
                }}>
                    <Stack direction="row">
                        <div className="m-1">
                            {/* アカウントのアイコン */}
                            <Image src={post.userData?.profileImage || DEFAULT_AVATAR} alt="" width={40} height={40} className='rounded-full' />
                        </div>
                        <div>
                            <Stack direction="column">
                                <div>
                                    {/* アカウント名 */}
                                    <Link href="#" underline="hover" sx={{ color: "black", fontWeight: "bold" }}>{post.userData?.nickname}</Link>
                                </div>
                                <div>
                                    {/* ポストの文章 */}
                                    <Typography variant="body1">{post.content}</Typography>
                                </div>
                                <div>
                                    {/* ポストの画像 */}
                                    {post.imageUrl && <Image src={post.imageUrl} alt="" width={256} height={256} className="border rounded-xl" />}
                                </div>
                                <div>
                                    {/* ポストへの反応 */}
                                    <Stack direction="row">
                                        <div>
                                            <IconButton>
                                                <Image src={emoji_urls.heart} alt="いいね" width={20} height={20} draggable="false" />
                                            </IconButton>
                                            {post.likes}
                                        </div>
                                        <div>
                                            <IconButton>
                                                <Image src={emoji_urls.recycle} alt="リポスト" width={20} height={20} draggable="false" />
                                            </IconButton>
                                            {post.retweets}
                                        </div>
                                        <div>
                                            <IconButton>
                                                <Image src={emoji_urls.message} alt="リプライ" width={20} height={20} draggable="false" />
                                            </IconButton>
                                            {post.replies}
                                        </div>
                                    </Stack>
                                </div>
                            </Stack>
                        </div>
                    </Stack>

                </Card>
            ))}
        </>
    );
}

