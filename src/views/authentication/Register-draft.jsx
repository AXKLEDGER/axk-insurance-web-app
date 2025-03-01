// next
import Link from 'next/link';
import Image from 'next/image';
import Logo from 'components/logo';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AccountSetupWizard from 'sections/auth/auth-forms/AuthRegistration';

// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <AuthWrapper>
      <Grid container spacing={3} sx={{ px: 2 }}>
        {/* Logo */}
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Logo />
          </Box>
        </Grid>

        {/* Welcome Text */}
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome to Afrikabal!
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mb: 3 }}>
            Create your account to start your journey.
          </Typography>
        </Grid>

        {/* Divider */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Fill in your details below
            </Typography>
          </Divider>
        </Grid>

        {/* Form Title and Link */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Sign up
            </Typography>
            <Typography
              component={Link}
              href="/auth/login"
              variant="body2"
              sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 500 }}
            >
              Already have an account?
            </Typography>
          </Stack>
        </Grid>

        {/* Account Setup Form */}
        <Grid item xs={12}>
          <AccountSetupWizard />
        </Grid>

        {/* Footer Button */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography align="center" variant="body2" sx={{ color: 'text.secondary' }}>
            By signing up, you agree to our{' '}
            <Typography
              component={Link}
              href="/terms"
              variant="body2"
              sx={{ textDecoration: 'underline', color: 'primary.main' }}
            >
              Terms & Conditions
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
