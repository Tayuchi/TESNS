'use client'
import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, onSnapshot, orderBy, DocumentData } from 'firebase/firestore';
import { firestore } from '@/libs/components/firebase/firebase';

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
                <div key={post.id}>
                    <p>Content: {post.content}</p>
                    {post.imageUrl && (
                        <img src={post.imageUrl} alt="Post" style={{ width: "256px" }} />
                    )}
                    <p>Likes: {post.likes}</p>
                    <p>Retweets: {post.retweets}</p>
                    <p>Replies: {post.replies}</p>
                    {post.userData && (
                        <div>
                            <p>Posted by: {post.userData.nickname}</p>
                            <img src={post.userData.profileImage} alt="User" style={{ width: "50px" }} />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

