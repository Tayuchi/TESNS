"use client"
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Modal, Card, CardMedia } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // ホームアイコン
import InfoIcon from '@mui/icons-material/Info'; // 情報アイコン
import MessageIcon from '@mui/icons-material/Message'; // メッセージアイコン
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // プロフィールアイコン
import AddBoxIcon from '@mui/icons-material/AddBox'; // 投稿するアイコン
import LogoutIcon from '@mui/icons-material/Logout'; // ログアウトアイコン
import { doc, setDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore, auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // この部分が重要
import PostModal from './PostModal';
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
                  <Link href='/home' color="inherit">Home</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <MessageIcon />
                  <Link href='/home' color="inherit">Message</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                  <Link href='/home/profile' color="inherit">Profile</Link>
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
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                  <Link href='/logout' color="inherit">Logout</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <PostModal
        open={open}
        handleClose={handleClose}
      />

    </div>
  )
}

export default SideBar
