'use client';

// next
import Link from 'next/link';
import Image from 'next/image';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import { APP_DEFAULT_PATH } from 'config';

// assets
const error500 = '/assets/images/maintenance/img-error-500.svg';

// ==============================|| ERROR 500 ||============================== //

export default function Error500Page() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }} spacing={3}>
        <Grid item xs={12}>
          <Image
            src={error500}
            alt="afrikabal-webapp"
            width={matchDownSM ? 350 : 396}
            height={matchDownSM ? 325 : 370}
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack justifyContent="center" alignItems="center">
            <Typography align="center" variant={matchDownSM ? 'h2' : 'h1'}>
              Internal Server Error
            </Typography>
            <Typography color="text.secondary" variant="body2" align="center" sx={{ width: { xs: '73%', sm: '70%' }, mt: 1 }}>
              Server error 500. we fixing the problem. please try again at a later stage.
            </Typography>
            <Button component={Link} href={APP_DEFAULT_PATH} variant="contained" sx={{ textTransform: 'none', mt: 4 }}>
              Back To Home
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
