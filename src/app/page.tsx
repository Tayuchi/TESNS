import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

export default function Home() {
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
