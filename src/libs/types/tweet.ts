export type tweet_user = {
  name: string;
  icon: string;
};

export type tweet = {
  user: tweet_user;
  content: string;
  imageUrl: string | null;
  likes: number;
  retweets: number;
  replies: number;
};
