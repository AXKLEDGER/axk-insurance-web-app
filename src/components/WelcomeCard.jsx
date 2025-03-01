'use client';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// assets
const WelcomeImage = '/assets/images/analytics/welcome-banner.png';

export default function WelcomeCard() {
    const theme = useTheme();

    return (
        <Grid
            container
            sx={{
                bgcolor: theme.palette.primary.main,
                color: 'white',
                borderRadius: 3,
                overflow: 'hidden',
                padding: 4,
            }}
        >
            <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                    <Typography variant="h4">Welcome back, [User's Name]!</Typography>
                    <Typography variant="body1">
                        Empowering communities through innovation. Explore the features of Afrikabal today!
                    </Typography>
                    <Button variant="contained" color="secondary">Explore Marketplace</Button>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <img src={WelcomeImage} alt="Welcome Banner" width={200} height={200} />
            </Grid>
        </Grid>
    );
}
