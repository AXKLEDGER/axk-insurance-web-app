import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  alpha
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Visibility,
  VisibilityOff,
  Info as InfoIcon
} from '@mui/icons-material';

import { checkUsername, register } from 'app/api/auth/route';

// ------------------------------------------------------
// Constants & Validation Schema
// ------------------------------------------------------
const DEBOUNCE_DELAY = 500;
const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 20;

const usernameValidation = Yup.string()
  .trim()
  .min(MIN_USERNAME_LENGTH, `Username must be at least ${MIN_USERNAME_LENGTH} characters`)
  .max(MAX_USERNAME_LENGTH, `Username must be at most ${MAX_USERNAME_LENGTH} characters`)
  .matches(/^[a-zA-Z0-9_.]+$/, 'Username can only contain letters, numbers, underscores, and periods') // Allows alphanumeric, underscores, and periods
  .notOneOf(['admin', 'administrator', 'root'], 'This username is not allowed') // Reserved words
  .test(
    'not-all-uppercase',
    'Username cannot be all uppercase. Use lowercase or capitalized style.',
    (value) => value && value !== value.toUpperCase()
  )
  .required('Username is required');

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Include at least one uppercase letter')
    .matches(/[a-z]/, 'Include at least one lowercase letter')
    .matches(/[0-9]/, 'Include at least one number')
    .matches(/[^A-Za-z0-9]/, 'Include at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
});

const accountTypeToRoleMap = {
  flow: 'RETAIL_CLIENT',
  titan: 'WHOLESALE_TRADER',
  agriAlliance: 'COOPERATIVE_MEMBER',
  proHarvest: 'LARGE_SCALE_FARMER'
};

// ------------------------------------------------------
// Helper Functions
// ------------------------------------------------------
const getRoleFromAccountType = (accountType) => accountTypeToRoleMap[accountType] || null;

const getPasswordStrength = (password) => {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return (strength / 5) * 100;
};

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: 'At least 8 characters', test: pwd => pwd.length >= 8 },
    { label: 'One uppercase letter', test: pwd => /[A-Z]/.test(pwd) },
    { label: 'One lowercase letter', test: pwd => /[a-z]/.test(pwd) },
    { label: 'One number', test: pwd => /[0-9]/.test(pwd) },
    { label: 'One special character', test: pwd => /[^A-Za-z0-9]/.test(pwd) }
  ];

  return (
    <Box sx={{ mt: 1 }}>
      <Grid container spacing={1}>
        {criteria.map((criterion, index) => (
          <Grid item xs={12} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {criterion.test(password) ? (
                <CheckIcon fontSize="small" color="success" />
              ) : (
                <InfoIcon fontSize="small" color="action" />
              )}
              <Typography variant="caption" color={criterion.test(password) ? 'success.main' : 'text.secondary'}>
                {criterion.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default function AccountSetupForm({ formData, setFormData, handleNext, handleBack }) {
  const theme = useTheme();
  // ------------------------------------------------------
  // States
  // ------------------------------------------------------
  const isDarkMode = theme.palette.mode === 'dark';
  const [serviceUnavailable, setServiceUnavailable] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [showPasswordState, setShowPasswordState] = useState({
    password: false,
    confirmPassword: false
  });

  // ------------------------------------------------------
  // Formik Configuration
  // ------------------------------------------------------
  // const formik = useFormik({
  //   initialValues: {
  //     email: formData.email || '',
  //     password: formData.password || '',
  //     confirmPassword: formData.confirmPassword || ''
  //   },
  //   validationSchema,
  //   onSubmit: (values) => {
  //     const isServiceRestricted = false;
  //     // Implement your logic here
  //     if (isServiceRestricted) {
  //       setServiceUnavailable(true);
  //       return;
  //     }
  //     setFormData((prev) => ({ ...prev, ...values }));
  //     setShowUsernameModal(true);
  //   }
  // });

  const formik = useFormik({
    initialValues: {
      email: formData.email || '',
      password: formData.password || '',
      confirmPassword: formData.confirmPassword || ''
    },
    validateOnMount: true, // Add this line
    validationSchema,
    onSubmit: async (values) => { // Make this async
      const isServiceRestricted = false;
      if (isServiceRestricted) {
        setServiceUnavailable(true);
        return;
      }
      await setFormData((prev) => ({ ...prev, ...values }));
      setShowUsernameModal(true);
    }
  });

  const passwordStrength = getPasswordStrength(formik.values.password);

  // ------------------------------------------------------
  // Handlers
  // ------------------------------------------------------
  const checkUsernameAvailability = useCallback(async (value) => {
    if (!value || value.length < MIN_USERNAME_LENGTH) {
      setUsernameError(`Username must be at least ${MIN_USERNAME_LENGTH} characters long`);
      setIsUsernameAvailable(false);
      return;
    }

    setIsCheckingUsername(true);
    try {
      const data = await checkUsername(value);

      setIsUsernameAvailable(data.success && data.data.available);
      setUsernameError(
        data.success && !data.data.available
          ? 'This username is already taken'
          : ''
      );
    } catch (error) {
      setUsernameError('Unable to verify username availability');
      setIsUsernameAvailable(false);
    } finally {
      setIsCheckingUsername(false);
    }
  }, []);

  // const handleUsernameChange = useCallback(async (e) => {
  //   const { value } = e.target;
  //   // const sanitizedValue = value.trim().toLowerCase();
  //   const sanitizedValue = value.trim();

  //   try {
  //     await usernameValidation.validate(sanitizedValue);
  //     setUsername(sanitizedValue);
  //     setIsUsernameAvailable(null);

  //     const timeoutId = setTimeout(() => checkUsernameAvailability(sanitizedValue), DEBOUNCE_DELAY);
  //     return () => clearTimeout(timeoutId);

  //   } catch (error) {
  //     // Handle validation errors
  //     console.error('Username validation error:', error.message);
  //     setUsername(sanitizedValue);
  //     setUsernameError(error.message);
  //     setIsUsernameAvailable(false);
  //   }
  // }, [checkUsernameAvailability, usernameValidation]);

  const handleUsernameChange = useCallback((e) => {
    const { value } = e.target;
    const sanitizedValue = value.trim();

    setUsername(sanitizedValue); // Update the state with the input

    // Clear previous validation messages
    setUsernameError('');
    setIsUsernameAvailable(null);

    // Debounce the validation and availability check
    clearTimeout(handleUsernameChange.timeout);

    handleUsernameChange.timeout = setTimeout(async () => {
      try {
        await usernameValidation.validate(sanitizedValue); // Validate the username
        setUsernameError(''); // Clear validation errors if valid
      } catch (validationError) {
        setUsernameError(validationError.message); // Set validation error message
        setIsUsernameAvailable(false); // Mark username as unavailable
        return; // Stop further processing
      }

      // Proceed to check availability if validation passes
      try {
        const data = await checkUsername(sanitizedValue); // Simulated API check
        setIsUsernameAvailable(data.success && data.data.available);
        setUsernameError(
          data.success && !data.data.available
            ? 'This username is already taken'
            : ''
        );
      } catch (error) {
        setUsernameError('Unable to verify username availability');
        setIsUsernameAvailable(false);
      }
    }, DEBOUNCE_DELAY); // Use debounce delay here
  }, []);

  const handleRegister = async () => {
    if (!username || !isUsernameAvailable) return;

    setIsRegistering(true);
    setRegistrationError('');

    try {
      // const hashedPassword = await bcrypt.hash(formik.values.password, 10);
      const role = getRoleFromAccountType(formData.accountType);

      const userDetails = {
        email: formik.values.email,
        password_hash: formik.values.password,
        role,
        username
      };

      const data = await register(userDetails);

      if (data.success) {
        handleCloseUsernameModal();
        handleNext();
      } else {
        setRegistrationError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setRegistrationError('An unexpected error occurred. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCloseUsernameModal = () => {
    setShowUsernameModal(false);
    setIsRegistering(false);
    setUsername('');
    setUsernameError('');
    setIsUsernameAvailable(null);
    setRegistrationError('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswordState((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // ------------------------------------------------------
  // Styled Components
  // ------------------------------------------------------
  const StyledButton = ({
    children,
    loading,
    variant = 'contained',
    ...props
  }) => (
    <Button
      variant={variant}
      {...props}
      sx={{
        textTransform: 'none',
        px: 4,
        py: 1.5,
        borderRadius: '12px',
        minWidth: 160,
        height: 48,
        position: 'relative',
        fontWeight: 600,
        letterSpacing: '0.02em',
        boxShadow: variant === 'contained' ? 4 : 'none',
        '&.Mui-disabled': {
          backgroundColor: variant === 'contained'
            ? alpha(theme.palette.primary.main, 0.7)
            : 'transparent',
          opacity: 0.7,
        },
        ...props.sx
      }}
    >
      {loading ? (
        <>
          <CircularProgress
            size={24}
            sx={{
              color: variant === 'contained' ? 'white' : theme.palette.primary.main,
              position: 'absolute',
              left: '50%',
              marginLeft: '-12px'
            }}
          />
          <Box sx={{ opacity: 0 }}>{children}</Box>
        </>
      ) : children}
    </Button>
  );

  // ------------------------------------------------------
  // Render
  // ------------------------------------------------------
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        bgcolor: isDarkMode ? 'background.default' : 'background.paper',
        borderRadius: 4,
        boxShadow: `0px 10px 20px ${alpha(
          isDarkMode ? theme.palette.common.black : theme.palette.common.white,
          0.2
        )}`,
      }}
    >
      {/* Registration Form */}
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 4
          }}
        >
          Create Your Account
        </Typography>

        <Grid container spacing={3}>
          {/* Email Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                endAdornment: formik.values.email && (
                  <InputAdornment position="end">
                    <Fade in>
                      {formik.errors.email ? (
                        <Tooltip title={formik.errors.email}>
                          <ClearIcon color="error" />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Valid email format">
                          <CheckIcon color="success" />
                        </Tooltip>
                      )}
                    </Fade>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: isDarkMode ? 'background.paper' : 'background.default',
                  transition: theme.transitions.create(['box-shadow']),
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                  },
                  '&.Mui-focused': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                  }
                }
              }}
            />
          </Grid>

          {/* Password Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPasswordState.password ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              FormHelperTextProps={{ component: 'div' }}
              helperText={
                <Box component="div">
                  {formik.touched.password && formik.errors.password ? (
                    <Typography color="error" variant="caption">
                      {formik.errors.password}
                    </Typography>
                  ) : (
                    <>
                      <Box
                        sx={{
                          height: 4,
                          bgcolor: alpha(theme.palette.grey[500], 0.1),
                          borderRadius: 2,
                          overflow: 'hidden',
                          mt: 1
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${passwordStrength}%`,
                            bgcolor:
                              passwordStrength <= 33
                                ? theme.palette.error.main
                                : passwordStrength <= 66
                                  ? theme.palette.warning.main
                                  : theme.palette.success.main,
                            transition: theme.transitions.create(['width', 'background-color'])
                          }}
                        />
                      </Box>
                      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="textSecondary">
                          Password strength: {
                            passwordStrength <= 33
                              ? 'Weak'
                              : passwordStrength <= 66
                                ? 'Medium'
                                : 'Strong'
                          }
                        </Typography>
                      </Box>
                      {formik.values.password && <PasswordCriteria password={formik.values.password} />}
                    </>
                  )}
                </Box>
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('password')}
                      edge="end"
                      size="large"
                    >
                      {showPasswordState.password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: isDarkMode ? 'background.paper' : 'background.default',
                  transition: theme.transitions.create(['box-shadow']),
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                  },
                },
                '&.Mui-focused': {
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                }
              }}
            />
          </Grid>

          {/* Confirm Password Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPasswordState.confirmPassword ? 'text' : 'password'}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      edge="end"
                      size="large"
                    >
                      {showPasswordState.confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: isDarkMode ? 'background.paper' : 'background.default',
                  transition: theme.transitions.create(['box-shadow']),
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                  },
                  '&.Mui-focused': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                  }
                }
              }}
            />
          </Grid>

          {/* Submit Button */}
          {/* <Grid item xs={12}> */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
              gap: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                minWidth: '120px',
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                minWidth: '120px',
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              Continue
            </Button>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </form>

      {/* Username Modal */}
      <Dialog
        open={showUsernameModal}
        onClose={handleCloseUsernameModal}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", // Subtle shadow
            width: "500px",
            mx: "auto",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          Choose Your Username
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            error={Boolean(usernameError)}
            helperText={usernameError}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isCheckingUsername ? (
                    <CircularProgress size={20} />
                  ) : username.length >= MIN_USERNAME_LENGTH && (
                    <Fade in>
                      {isUsernameAvailable ? (
                        <CheckIcon color="success" />
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </Fade>
                  )}
                </InputAdornment>
              ),
            }}
          />
          {registrationError && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 2 }}
            >
              {registrationError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            mt: 2,
          }}
        >
          <StyledButton
            variant="outlined"
            onClick={handleCloseUsernameModal}
            sx={{
              minWidth: 100,
              borderRadius: "8px",
            }}
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleRegister}
            disabled={!isUsernameAvailable || isRegistering}
            loading={isRegistering}
            sx={{
              minWidth: 120,
              borderRadius: "8px",
              backgroundColor: !isUsernameAvailable || isRegistering
                ? "rgba(161, 211, 108, 0.5)"
                : "primary.main",
              color: !isUsernameAvailable || isRegistering ? "#ffffff" : "white",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor:
                  !isUsernameAvailable || isRegistering
                    ? "rgba(161, 211, 108, 0.5)"
                    : "primary.dark",
              },
              "&.Mui-disabled": {
                cursor: "not-allowed",
              },
            }}
          >
            Create Account
          </StyledButton>
        </DialogActions>
      </Dialog>


      {/* Service Unavailable Dialog */}
      <Dialog
        open={serviceUnavailable}
        onClose={() => setServiceUnavailable(false)}
      >
        <DialogTitle>Service Unavailable</DialogTitle>
        <DialogContent>
          <Typography>
            We apologize, but this service is currently not available in your region.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceUnavailable(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

AccountSetupForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

PasswordCriteria.propTypes = {
  password: PropTypes.string.isRequired
};