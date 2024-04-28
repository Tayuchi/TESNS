import * as React from 'react';
import { Box, Button, Stack, Typography, Grid } from '@mui/material';
import RedirectIfNoUser from '@/libs/components/acountInformation/Redirect';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
      <Grid item xs={12} md={6}>
        <Image
          src="/icon.png"
          alt="icon"
          width={400}
          height={400}
          layout='responsive'
        />
      </Grid>

      <Grid item xs={12} md={6} textAlign="center">  
        <Typography variant='h1'>
          Parrotter
        </Typography>
        <Typography variant='subtitle1'>
          絶対に炎上しないSNS
        </Typography>
        <Link href="/home" passHref>
          <Button variant='contained' sx={{ mt: 5 }}> 
            はじめる
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}