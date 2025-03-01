'use client';

import { useState } from 'react';

// next
import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//project imports
import AnimateButton from 'components/@extended/AnimateButton';

// third-party
import { motion } from 'framer-motion';

// ==============================|| AFRIKABAL - HERO PAGE ||============================== //

export default function HeroPage() {
  const theme = useTheme();
  const [] = useState(null);

  const disabledLinkSX = {
    cursor: 'default', // Disable pointer effect
    pointerEvents: 'none' // Prevents interaction
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pb: 12.5, pt: 10, display: 'flex', alignItems: 'center' }}>
      <Container>
        <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ pt: { md: 0, xs: 10 }, pb: { md: 0, xs: 22 } }}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3} sx={{ textAlign: 'center' }}>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                >
                  <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: '1.825rem', sm: '2rem', md: '3.4375rem' }, fontWeight: 700, lineHeight: 1.2 }}
                  >
                    Welcome to{' '}
                    <Typography
                      variant="h1"
                      component="span"
                      sx={{
                        fontSize: 'inherit',
                        background: 'linear-gradient(90deg, rgb(161, 211, 108), rgb(79, 184, 76), rgb(161, 211, 108)) 0 0 / 400% 100%',
                        color: 'transparent',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        animation: 'move-bg 24s infinite linear',
                        '@keyframes move-bg': { '100%': { backgroundPosition: '400% 0' } }
                      }}
                    >
                      Afrikabal
                    </Typography>
                  </Typography>
                </motion.div>
              </Grid>
              <Grid container justifyContent="center" item xs={12}>
                <Grid item xs={8}>
                  <motion.div
                    initial={{ opacity: 0, translateY: 550 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, fontWeight: 400, lineHeight: { xs: 1.4, md: 1.4 } }}
                    >
                      Connecting farmers, businesses, and investors to a seamless blockchain-powered ecosystem for trade and financial
                      growth.
                    </Typography>
                  </motion.div>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.4 }}
                >
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <AnimateButton>
                        <Button component={Link} href="/marketplace" size="large" color="secondary" variant="outlined" sx={disabledLinkSX}>
                          Explore Marketplace
                        </Button>
                      </AnimateButton>
                    </Grid>
                    <Grid item>
                      <AnimateButton>
                        <Button component={Link} href="/get-started" size="large" color="primary" variant="contained" sx={disabledLinkSX}>
                          Get Started
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 550 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.6 }}
                >
                  <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                      <Typography variant="h5">
                        <span
                          style={{
                            fontSize: '75%',
                            fontWeight: 400,
                            color: theme.palette.text.secondary
                          }}
                        >
                          Active Users
                        </span>
                      </Typography>
                      <Typography variant="h4">10K+</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">
                        <span
                          style={{
                            fontSize: '75%',
                            fontWeight: 400,
                            color: theme.palette.text.secondary
                          }}
                        >
                          Transactions
                        </span>
                      </Typography>
                      <Typography variant="h4">50M+</Typography>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
