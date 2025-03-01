'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// next
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import MUILink from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { preload } from 'swr';

// assets
import { Eye, EyeSlash, Shield, ShieldTick, Lock1, TickCircle, InfoCircle } from 'iconsax-react';
import { getClientDetails, login } from 'app/api/auth/route';
import Logo from 'components/logo';

// AxkInsurance brand colors
const axkColors = {
  primary: '#2aa1af',
  secondary: '#3cbbc9',
  dark: '#1d8a97',
  light: '#e6f7f8',
  background: '#f0fafa'
};

export default function AuthLogin({ csrfToken }) {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [serviceUnavailable, setServiceUnavailable] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: '',
    color: 'info',
  });

  useEffect(() => {
    // Initial animation effect
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseModal = () => {
    setServiceUnavailable(false);
    setSubscriptionMessage('');
    setEmail('');
  };

  const handleRoleRedirect = (role) => {
    const normalizedRole = role.toLowerCase().trim();
    const dashboardPath = getDashboardPath(normalizedRole);
    console.log(`Redirecting to: ${dashboardPath}`);

    setToast({
      open: true,
      message: 'Redirecting to your dashboard...',
      color: 'info',
    });

    router.push(dashboardPath)
    setToast({
      open: false,
      message: '',
      color: '',
    });
  };

  const getDashboardPath = (role) => {
    console.log(`Mapping role to dashboard path: ${role}`);

    switch (role) {
      case 'admin':
        return '/admin-portal/dashboard';
      case 'cooperative_member':
        return '/alliance-portal/dashboard';
      case 'large_scale_farmer':
        return '/farmer-portal/dashboard';
      case 'wholesale_trader':
        return '/trader-portal/dashboard';
      case 'retail_client':
        return '/retail-portal/dashboard';
      default:
        return '/auth/login';
    }
  };

  const storeUserData = (user, persist) => {
    console.log("Persist data?", persist);
    const storage = persist ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(user));
  };

  const handleSubscribe = async () => {
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setSubscriptionMessage('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setLoading(false);

      if (response.ok) {
        setSubscriptionMessage('You have been subscribed successfully! We will notify you once the service is available.');
      } else {
        setSubscriptionMessage('Failed to subscribe. Please try again later.');
      }
    } catch (error) {
      setLoading(false);
      setSubscriptionMessage('An error occurred. Please try again later.');
    }
  };

  const handleError = (error) => {
    if (error?.message) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <>
      {/* Main Login Container with Background Pattern */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          mx: 'auto',
          width: '100%',
          maxWidth: '480px',
          transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
          opacity: isAnimating ? 0 : 1,
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Decorative Pattern Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V0C4.477 0 0 4.477 0 10v30zm22 0c-5.523 0-10-4.477-10-10V0c5.523 0 10 4.477 10 10v30z' fill='%23${axkColors.primary.substring(1)}' fill-opacity='0.8' fillRule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '40px',
            zIndex: 0,
            borderRadius: '24px',
          }}
        />

        {/* Login Form Card */}
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            borderRadius: '24px',
            background: isDark ? alpha(axkColors.dark, 0.1) : axkColors.background,
            overflow: 'hidden',
            p: 4,
            border: `1px solid ${isDark ? alpha(axkColors.secondary, 0.2) : alpha(axkColors.primary, 0.1)}`,
            boxShadow: `0 8px 40px ${alpha(axkColors.primary, 0.1)}`,
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: `linear-gradient(90deg, ${axkColors.secondary}, ${axkColors.primary})`,
            }
          }}
        >
          {/* Logo and Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0} // Changed from spacing={1} to eliminate the gap
              sx={{ mb: 2 }}
            >
              <Logo
                sx={{
                  maxWidth: '150px',
                  height: 'auto',
                  mr: -1 // Added negative margin-right to pull text closer
                }}
                to="#"
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: axkColors.primary,
                  textShadow: `0 2px 4px ${alpha(axkColors.primary, 0.2)}`,
                }}
              >
                AxkInsurance
              </Typography>
            </Stack> */}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                // mb: 2.5
              }}
            >
              <Logo
                sx={{
                  maxWidth: '180px',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto'
                }}
                to="#"
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 1,
                background: `linear-gradient(135deg, ${axkColors.primary}, ${axkColors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: '80%',
                mx: 'auto',
              }}
            >
              Sign in to access your secure insurance portal
            </Typography>
          </Box>

          <Formik
            initialValues={{
              email: '',
              password: '',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                setLoading(true);
                const clientDetails = await getClientDetails();

                const payload = {
                  loginDto: {
                    email: values.email,
                    password: values.password,
                  },
                  clientDetails,
                };

                const response = await login(payload);

                setLoading(false);

                if (response?.success && response?.data?.user?.role) {
                  const { role, ...userData } = response.data.user;

                  storeUserData({ ...userData, role }, checked);

                  handleRoleRedirect(role);
                } else {
                  setErrors({ submit: 'User role not defined. Contact support.' });
                  setStatus({ success: false });
                  setSubmitting(false);
                }
              } catch (error) {
                setLoading(false);
                setErrors({ submit: handleError(error) });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <Grid container spacing={3}>
                  {/* Email Field */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel
                        htmlFor="email-login"
                        sx={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: isDark ? axkColors.light : 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        <InfoCircle size="16" variant="Bold" color={axkColors.primary} />
                        Email Address
                      </InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        sx={{
                          borderRadius: '12px',
                          backgroundColor: isDark ? alpha('#fff', 0.03) : alpha('#fff', 0.8),
                          '& fieldset': {
                            borderRadius: '12px',
                            borderColor: isDark ? alpha(axkColors.secondary, 0.3) : alpha(axkColors.primary, 0.2),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: axkColors.primary,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: axkColors.primary,
                            borderWidth: '2px',
                          },
                          transition: 'all 0.3s ease',
                          boxShadow: touched.email ? `0 0 0 2px ${alpha(axkColors.primary, 0.1)}` : 'none',
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                color: touched.email && values.email ? axkColors.primary : 'text.secondary',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              @
                            </Box>
                          </InputAdornment>
                        }
                      />
                    </Stack>
                    {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ ml: 1.5 }}>
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Grid>

                  {/* Password Field */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel
                        htmlFor="password-login"
                        sx={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: isDark ? axkColors.light : 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        <Lock1 size="16" variant="Bold" color={axkColors.primary} />
                        Password
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                if (values.password) setShowPassword(!showPassword);
                              }}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              color="secondary"
                              disabled={!values.password}
                              sx={{
                                opacity: values.password ? 1 : 0.5,
                                pointerEvents: values.password ? 'auto' : 'none',
                                color: axkColors.primary,
                              }}
                              title={values.password ? 'Toggle Password Visibility' : 'Enter a Password First'}
                            >
                              {showPassword ? <Eye variant="Bold" /> : <EyeSlash variant="Bold" />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Enter password"
                        sx={{
                          borderRadius: '12px',
                          backgroundColor: isDark ? alpha('#fff', 0.03) : alpha('#fff', 0.8),
                          '& fieldset': {
                            borderRadius: '12px',
                            borderColor: isDark ? alpha(axkColors.secondary, 0.3) : alpha(axkColors.primary, 0.2),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: axkColors.primary,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: axkColors.primary,
                            borderWidth: '2px',
                          },
                          transition: 'all 0.3s ease',
                          boxShadow: touched.password ? `0 0 0 2px ${alpha(axkColors.primary, 0.1)}` : 'none',
                        }}
                      />
                    </Stack>
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-login" sx={{ ml: 1.5 }}>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Grid>

                  {/* Keep Me Signed In + Forgot Password */}
                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            // onChange={(event) => event.preventDefault()}
                            onChange={() => setChecked(!checked)}
                            name="keepMeSignedIn"
                            sx={{
                              color: axkColors.primary,
                              '&.Mui-checked': {
                                color: axkColors.primary,
                              },
                            }}
                            size="small"
                            icon={<Box
                              sx={{
                                width: 16,
                                height: 16,
                                border: `1px solid ${axkColors.primary}`,
                                borderRadius: '4px',
                              }}
                            />}
                            checkedIcon={<TickCircle variant="Bold" size={18} color={axkColors.primary} />}
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? axkColors.light : 'text.secondary',
                              fontWeight: 500,
                            }}
                          >
                            Keep me signed in
                          </Typography>
                        }
                      />
                      <MUILink
                        component={Link}
                        href='/auth/forgot-password'
                        variant="body2"
                        sx={{
                          textDecoration: 'none',
                          color: axkColors.primary,
                          fontWeight: 'bold',
                          position: 'relative',
                          '&:hover': {
                            '&::after': {
                              width: '100%',
                            }
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '-2px',
                            left: 0,
                            width: '0%',
                            height: '2px',
                            background: `linear-gradient(90deg, ${axkColors.primary}, ${axkColors.secondary})`,
                            transition: 'width 0.3s ease',
                          }
                        }}
                      >
                        Forgot Password?
                      </MUILink>
                    </Stack>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting || loading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{
                          textTransform: 'none',
                          borderRadius: '12px',
                          padding: '12px 0',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          backgroundColor: axkColors.primary,
                          background: `linear-gradient(135deg, ${axkColors.primary}, ${axkColors.secondary})`,
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transition: 'all 0.5s ease',
                          },
                          '&:hover': {
                            backgroundColor: axkColors.primary,
                            boxShadow: `0 8px 20px ${alpha(axkColors.primary, 0.4)}`,
                            '&::before': {
                              left: '100%',
                            }
                          },
                          boxShadow: `0 4px 15px ${alpha(axkColors.primary, 0.3)}`,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "#fff" }} />
                        ) : (
                          <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                            <ShieldTick size={20} variant="Bold" />
                            <span>Secure Login</span>
                          </Stack>
                        )}
                      </Button>
                    </AnimateButton>
                  </Grid>

                  {/* Submit Error */}
                  {errors.submit && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          backgroundColor: alpha('#f44336', 0.1),
                          borderRadius: '8px',
                          p: 1.5,
                          borderLeft: `4px solid #f44336`,
                        }}
                      >
                        <Typography variant="body2" color="error" sx={{ ml: 1 }}>
                          {errors.submit}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </form>
            )}
          </Formik>

          {/* Footer / Create Account */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              Don't have an account?{' '}
              <MUILink
                component={Link}
                href='/auth/register'
                sx={{
                  color: axkColors.primary,
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Create Account
              </MUILink>
            </Typography>
          </Box>

          {/* Security Badge */}
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              borderRadius: '24px',
              backgroundColor: isDark ? alpha(axkColors.dark, 0.2) : alpha(axkColors.light, 0.8),
              border: `1px solid ${isDark ? alpha(axkColors.secondary, 0.2) : alpha(axkColors.primary, 0.1)}`,
              width: 'fit-content',
              mx: 'auto',
            }}
          >
            <Shield variant="Bold" size={16} color={axkColors.primary} style={{ marginRight: '8px' }} />
            <Typography
              variant="caption"
              sx={{
                color: isDark ? axkColors.light : 'text.secondary',
                fontWeight: 500,
              }}
            >
              Powered by <span style={{ color: axkColors.primary, fontWeight: 'bold' }}>AXK Ledger</span>
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Beautified Service Unavailable Modal */}
      <Dialog
        open={serviceUnavailable}
        onClose={handleCloseModal}
        PaperProps={{
          style: {
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '500px',
            margin: 'auto',
            border: `1px solid ${alpha(axkColors.primary, 0.1)}`,
            background: isDark ? '#1a1a1a' : '#ffffff',
          },
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: axkColors.primary,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '3px',
            background: `linear-gradient(90deg, ${axkColors.primary}, ${axkColors.secondary})`,
            borderRadius: '3px',
          }
        }}>
          Service Unavailable
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
            Our services are currently unavailable in your region.
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Leave your email below, and we'll notify you as soon as we're live in your area.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                borderColor: alpha(axkColors.primary, 0.2),
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: axkColors.primary,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: axkColors.primary,
                  borderWidth: '2px',
                },
              },
            }}
          />
          {subscriptionMessage && (
            <Typography
              sx={{
                mt: 2,
                fontSize: '0.875rem',
                color: subscriptionMessage.includes('successfully') ? 'success.main' : 'error.main',
                textAlign: 'center',
              }}
            >
              {subscriptionMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pt: 2, pb: 2 }}>
          <Button
            onClick={handleSubscribe}
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none',
              padding: '10px 24px',
              borderRadius: '12px',
              fontWeight: 'bold',
              background: `linear-gradient(135deg, ${axkColors.primary}, ${axkColors.secondary})`,
              '&:hover': {
                background: `linear-gradient(135deg, ${axkColors.secondary}, ${axkColors.primary})`,
                boxShadow: `0 8px 16px ${alpha(axkColors.primary, 0.3)}`,
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : 'Notify Me'}
          </Button>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            sx={{
              textTransform: 'none',
              padding: '10px 24px',
              borderRadius: '12px',
              fontWeight: 'bold',
              borderColor: axkColors.primary,
              color: axkColors.primary,
              '&:hover': {
                borderColor: axkColors.secondary,
                backgroundColor: alpha(axkColors.primary, 0.05),
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.color}
          sx={{
            backgroundColor: toast.color === 'info'
              ? alpha(axkColors.light, 0.9)
              : toast.color === 'error'
                ? '#FAD4D4'
                : '#FFF8E1',
            color: toast.color === 'info'
              ? axkColors.primary
              : toast.color === 'error'
                ? '#D32F2F'
                : '#FFC107',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            padding: '12px 20px',
            border: `2px solid ${toast.color === 'info'
              ? axkColors.primary
              : toast.color === 'error'
                ? '#D32F2F'
                : '#FFC107'
              }`,
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}

AuthLogin.propTypes = {
  csrfToken: PropTypes.string,
};