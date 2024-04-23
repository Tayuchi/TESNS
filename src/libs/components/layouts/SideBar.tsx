"use client"

import React from 'react'
import { Box, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, Toolbar } from '@mui/material'

const SideBar = () => {
  return (
    <div>
      <Drawer
        variant='permanent'
        sx={{ width: 240, flexShrink: 0, }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Link href='/'>
                    Home
                  </Link>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Link href='/'>
                    About
                  </Link>
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