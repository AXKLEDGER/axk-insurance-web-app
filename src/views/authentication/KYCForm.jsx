// next
import Link from 'next/link';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import KYCWizard from 'sections/auth/auth-forms/KYCWizard';

// ================================|| KYC COMPLETION ||================================ //

export default function CompleteKYC() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" justifyContent="center" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3" align="center">
              KYC Verification Required
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ mt: 2, maxWidth: 600 }}
              color="text.secondary"
            >
              To access your account and unlock all features, please complete your KYC process. This is mandatory to comply with our platform requirements.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <KYCWizard />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
