// next
import Image from 'next/image';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';

// assets
const cardBack = '/assets/images/widget/img-dropbox-bg.svg';
const WelcomeImage = '/assets/images/analytics/welcome-banner.png';

// ==============================|| AXK INSURANCE - WELCOME ||============================== //

export default function WelcomeBanner() {
  const theme = useTheme();

  return (
    <MainCard
      border={false}
      sx={{
        color: 'common.white',
        bgcolor: theme.palette.mode === ThemeMode.DARK ? '#1e8691' : '#2aa1af',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          content: '""',
          background: `url("${cardBack}") 100% 100% / cover no-repeat`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.3
        }
      }}
    >
      <Grid container>
        <Grid item md={6} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3, zIndex: 2, position: 'relative' }}>
            <Typography variant="h2" sx={{ color: 'background.paper', fontWeight: 'bold' }}>
              Welcome to AXK Insurance
            </Typography>
            <Typography variant="h6" sx={{ color: 'background.paper' }}>
              Secure, transparent healthcare coverage with fast claims processing. Your health data stays private and your claims get paid quickly.
            </Typography>
            <Box>
              <Button
                variant="outlined"
                href="#"
                sx={{
                  color: 'background.paper',
                  borderColor: theme.palette.background.paper,
                  zIndex: 2,
                  '&:hover': { color: 'background.paper', borderColor: 'background.paper', bgcolor: '#1e8691' } // Darker teal hover
                }}
                target="_blank"
              >
                Explore Coverage Options
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Stack
            sx={{
              position: 'relative',
              pr: { sm: 3, md: 8 },
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}
          >
            <Image src={WelcomeImage} alt="Welcome to AXK Insurance" width={200} height={200} />
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}