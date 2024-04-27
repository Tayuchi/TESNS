import React from 'react';
import { Box, ListItem, Button } from '@mui/material';

const sidebarItems = [
  { text: 'Posts', href: '/' },
  { text: 'Replies', href: '/' },
  { text: 'Media', href: '/' },
  { text: 'Likes', href: '/' },
];

export default function Nav() {
  return (
    <Box sx={{ display: 'flex', width: 1, margin: 0 }}>
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
