'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import RedirectIfNoUser from '@/libs/components/acountInformation/Redirect';

export default function Home() {
  RedirectIfNoUser();
  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} >
          <Grid item xs={2}>test</Grid>
          <Grid item xs={6}>test</Grid>
          <Grid item xs={2}>test</Grid>
        </Grid>
      </Box>
    </main>
  );
}