'use client';

// next
import Link from 'next/link';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import FadeInWhenVisible from './Animation';

// assets
import { ExportSquare } from 'iconsax-react';

// ==============================|| AFRIKABAL - FREE PAGE ||============================== //

export default function FreePage() {
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12} md={8}>
          <FadeInWhenVisible>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h2">
                  <Box component="span" sx={{ color: '#2aa1af' }}>
                    EXPLORE{' '}
                  </Box>
                  AFRIKABAL FOR FREE
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Experience Afrikabal’s blockchain-powered marketplace and fintech solutions with a free demo.</Typography>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
        <Grid item xs={12} md={4}>
          <FadeInWhenVisible>
            <Grid container spacing={2} justifyContent="end" alignItems="center">
              <Grid item>
                <Button variant="outlined" color="secondary" size="large" component={Link} href="/features" disabled>
                  Learn More
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ExportSquare />}
                  component={Link}
                  href="/demo"
                  sx={{
                    bgcolor: '#2aa1af',
                    color: 'white',
                    '&:hover': { bgcolor: '#79b963' }
                  }}
                  disabled
                >
                  Free Demo
                </Button>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
      </Grid>
    </Container>
  );
}
