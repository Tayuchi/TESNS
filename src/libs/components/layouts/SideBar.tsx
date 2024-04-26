"use client"
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Modal, Card, CardMedia } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // ホームアイコン
import ExploreIcon from '@mui/icons-material/Explore'; // 探索アイコン
import InfoIcon from '@mui/icons-material/Info'; // 情報アイコン
import MessageIcon from '@mui/icons-material/Message'; // メッセージアイコン
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // プロフィールアイコン
import AddBoxIcon from '@mui/icons-material/AddBox'; // 投稿するアイコン
import { doc, setDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore, auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // この部分が重要
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};

const SideBar = () => {
  const [user] = useAuthState(auth); // 現在のユーザーを取得
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postContent, setPostContent] = useState('');
  const [imagePreview, setImagePreview] = useState('')
  const [postImage, setPostImage] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const savePostData = async (content: string, imageFile: File | null, userEmail: string | null) => {
    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const newPostRef = doc(collection(firestore, 'posts'));
    await setDoc(newPostRef, {
      content: content,
      imageUrl: imageUrl,
      likes: 0,
      retweets: 0,
      replies: 0,
      email: userEmail
    });
  };
  /*
    const handleSubmit = async () => {
      if (!user || !user.email) return;
      try {
        await savePostData(postContent, postImage, user.email);
        setPostContent('');
        setImagePreview('');
        setPostImage(null);
        handleClose();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };
  */
  const handleSubmit = () => {
    setPostContent('');
    setImagePreview('');
    setPostImage(null);
    console.log(postContent);
    handleClose();
  };

  return (
    <div>
      <Drawer
        variant='permanent'
        sx={{ widACth: 160, flexShrink: 0 }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                  <Link href='/' color="inherit">Home</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ExploreIcon />
                  <Link href='/' color="inherit">Explore</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon />
                  <Link href='/' color="inherit">About</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <MessageIcon />
                  <Link href='/' color="inherit">Message</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                  <Link href='/' color="inherit">Profile</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                  <AddBoxIcon />
                  Post
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="post-modal-title"
        aria-describedby="post-modal-description"
      >
        <Box sx={style}>
          <Typography id="post-modal-title" variant="h6" component="h2">
            投稿画面
          </Typography>
          <TextField
            id="post-content"
            label="何を思ってる？"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            margin="normal"
          />
          <input
            accept="image/*"
            id="post-image"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="post-image">
            <Button variant="outlined" color="primary" component="span">
              画像をアップロード
            </Button>
          </label>
          {imagePreview && (
            <Card sx={{ maxWidth: 345, mt: 2 }}>
              <CardMedia
                component="img"
                height="194"
                image={imagePreview}
                alt="Image preview"
              />
            </Card>
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              送信
            </Button>
          </Box>
        </Box>
      </Modal>

    </div>
  )
}

export default SideBar
