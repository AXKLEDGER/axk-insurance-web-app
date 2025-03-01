'use client';

// next
import Link from 'next/link';
import Image from 'next/image';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from 'components/logo';

// project-imports
import AuthWrapperRegistrationForm from 'sections/auth/AuthWrapperRegistrationForm';
import AccountSetupWizard from 'sections/auth/auth-forms/AuthRegistration';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import AuthWrapper from 'sections/auth/AuthWrapper';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fading out
      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
        setFade(true); // Fade in new tagline
      }, 500); // Sync with fade-out duration
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          color: 'primary.main',
          fontWeight: 'bold',
          textAlign: 'center',
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
// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo />
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, mt: 3 }}>
            Welcome to AXK Insurance
          </Typography>
          <AnimatedTagline />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Fill in your details below
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Sign up</Typography>
            <Typography component={Link} href={'/auth/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Already have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AccountSetupWizard />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
