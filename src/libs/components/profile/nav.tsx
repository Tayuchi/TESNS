import React from 'react';
import { Box, Grid, Link, List, ListItem, Button, ListItemButton, ListItemIcon, Toolbar } from '@mui/material';
import Home from '@mui/icons-material/Home';
import ListItemText from '@mui/material/ListItemText';

const sidebarItems = [
  { text: 'Posts', href: '/' },
  { text: 'Replies', href: '/' },
  { text: 'Highlights', href: '/' },
  { text: 'Articles', href: '/' },
  { text: 'Media', href: '/' },
  { text: 'Likes', href: '/' },
];

export default function Nav() {
  return (
    <Box sx={{ display: 'flex', width: 1, margin:0 }}>
      {sidebarItems.map((item, index) => (
        <ListItem key={index} sx={{ padding: 0 }}>
          <Button sx={{ padding: 1 }} href={item.href} color='inherit'>
              {item.text}
          </Button>
        </ListItem>
      ))}
    </Box>
  );
}
