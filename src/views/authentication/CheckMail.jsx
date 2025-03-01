'use client';
// next
import Link from 'next/link';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import AuthWrapper from 'sections/auth/AuthWrapper';

// ================================|| CHECK MAIL ||================================ //

export default function CheckMail() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const verificationCode = event.target.verificationCode.value;
    console.log('Verification Code:', verificationCode);
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Hi, Check Your Mail</Typography>
            <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
              We have sent a password recovery code to your email. Please enter it below to proceed.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField id="verificationCode" name="verificationCode" label="Verification Code" variant="outlined" fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                    Submit Code
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" align="center">
            Didn’t receive an email?{' '}
            <Link href="/resend" passHref>
              <Button variant="text" color="primary">
                Resend Code
              </Button>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
