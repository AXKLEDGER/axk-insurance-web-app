'use client';

// next
import Link from 'next/link';
import Image from 'next/image';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Logo from 'components/logo';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';

// next-auth
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

// assets
const imgGoogle = '/assets/images/auth/google.svg';

function AnimatedTagline() {
  const taglines = [
    'Insurance That Works For You',
    'Healthcare Coverage Made Simple',
    'Quick Claims, Peace of Mind',
    'Your Health, Your Control',
  ];

  const [currentTagline, setCurrentTagline] = useState(0);
  const [fade, setFade] = useState(true);

  // console.log('Current Tagline:', taglines[currentTagline]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          width: '100%',
          textAlign: 'left',
          color: 'primary.main',
          fontWeight: 'bold',
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        {taglines[currentTagline]}
      </Typography>
    </Box>
  );
}

// ================================|| LOGIN ||================================ //

export default function Login() {
  const router = useRouter();

  const isGoogleLoginDisabled = false;

  const handleGoogleLogin = async () => {
    if (!isGoogleLoginDisabled) {
      try {
        const response = await signIn('google', { redirect: false });
        console.log('Google Login Response:', response);
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    }
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Box sx={{ flex: 1 }}>
              <AnimatedTagline />
            </Box>
            <Typography
              component={Link}
              href={'/auth/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
              passHref
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}