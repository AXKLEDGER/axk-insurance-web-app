'use client';

// next
import Link from 'next/link';
import Image from 'next/image';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Logo from 'components/logo';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';

// next-auth
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

// assets
const imgGoogle = '/assets/images/auth/google.svg';

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
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Logo style={{ maxWidth: '150px', height: 'auto' }} to="#" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Welcome to Afrikabal
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
                        Explore our features and see how we can empower your farming and financial journey.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    padding: '12px',
                                    fontWeight: 'bold',
                                }}
                                onClick={() => router.push('/explore/produce-market')}
                            >
                                Explore Produce Market
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    padding: '12px',
                                    fontWeight: 'bold',
                                }}
                                onClick={() => router.push('/explore/financial-tools')}
                            >
                                Explore Financial Tools
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    padding: '12px',
                                    fontWeight: 'bold',
                                }}
                                onClick={() => router.push('/explore/community')}
                            >
                                Join the Afrikabal Community
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <AuthDivider>
                        <Typography variant="body1">OR</Typography>
                    </AuthDivider>
                </Grid>
                <Grid item xs={12}>
                    <AuthSocButton onClick={handleGoogleLogin}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Image src={imgGoogle} alt="Google" width={16} height={16} />
                            <Typography>Sign In with Google</Typography>
                        </Stack>
                    </AuthSocButton>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
}
