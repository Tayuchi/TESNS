import React from 'react'
import { Box, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // ホームアイコン
import ExploreIcon from '@mui/icons-material/Explore'; // 探索アイコン
import InfoIcon from '@mui/icons-material/Info'; // 情報アイコン
import MessageIcon from '@mui/icons-material/Message'; // メッセージアイコン
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // プロフィールアイコン
import AddBoxIcon from '@mui/icons-material/AddBox'; // 投稿するアイコン

const SideBar = () => {
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
              <ListItemButton>
                <ListItemIcon>
                  <AddBoxIcon />
                  <Link href='/' color="inherit">Post</Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  )
}

export default SideBar
