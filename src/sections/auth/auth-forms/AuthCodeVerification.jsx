'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Grid,
  Snackbar,
  Stack,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import OtpInput from 'react-otp-input';
import AnimateButton from 'components/@extended/AnimateButton';
import { resendOtp, validateOtp } from 'app/api/auth/route';

export default function AuthCodeVerification({ formData, setFormData, handleNext }) {
  const theme = useTheme();
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });
  const [resendCooldown, setResendCooldown] = useState(0);

  // Handle Resending OTP
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    try {
      const response = await resendOtp({ email: formData.email });

      if (response && response.expiresAt) {
        setFeedback({
          open: true,
          message: 'A new OTP has been sent to your email!',
          severity: 'success'
        });
        setResendCooldown(30);

        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        throw new Error('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setFeedback({
        open: true,
        message: error || 'Failed to resend OTP. Please try again.',
        severity: 'error'
      });
    }
  };

  // Handle OTP Validation
  const handleValidateOtp = async (otp, resetForm, setFieldError) => {
    try {
      const result = await validateOtp(formData.email, otp);
      console.log("Validation Result: ", result);

      if (result.success && result.statusCode === 201) {
        setFormData((prev) => ({ ...prev, otpVerified: true }));
        setFeedback({
          open: true,
          message: result.message || 'OTP successfully verified!',
          severity: 'success'
        });
        resetForm();
        handleNext();
      } else {
        throw new Error(result.message || 'Unexpected validation error.');
      }
    } catch (error) {
      console.error("OTP Validation Error: ", error);
      setFieldError('otp', 'Invalid OTP. Please try again.');
      setFeedback({
        open: true,
        message: error.message || 'OTP verification failed. Try again.',
        severity: 'error'
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ otp: '' }}
        validationSchema={Yup.object({
          otp: Yup.string()
            .length(6, 'OTP must be exactly 6 digits')
            .required('Please enter the OTP sent to your email.')
        })}
        onSubmit={(values, { resetForm, setFieldError }) => {
          handleValidateOtp(values.otp, resetForm, setFieldError);
        }}
      >
        {({ errors, handleSubmit, touched, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Heading */}
              <Grid item xs={12}>
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h5" fontWeight="bold">
                    Verify Your Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    A 6-digit code has been sent to your email. Enter the code below to complete the verification.
                  </Typography>
                </Stack>
              </Grid>

              {/* OTP Input */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 auto',
                    '& input': {
                      width: '70px',
                      height: '70px',
                      fontSize: '22px',
                      fontWeight: '500',
                      textAlign: 'center',
                      border: `2px solid ${theme.palette.divider}`,
                      borderRadius: '16px',
                      margin: '0 10px',
                      padding: '10px',
                      backgroundColor: theme.palette.background.default,
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxShadow: `0px 3px 6px rgba(0, 0, 0, 0.1)`
                    },
                    '& input:focus': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.2)`
                    },
                    '& input:hover': {
                      backgroundColor: theme.palette.action.hover,
                      boxShadow: `0px 3px 6px rgba(0, 0, 0, 0.15)`
                    }
                  }}
                >
                  <OtpInput
                    value={values.otp}
                    onChange={(otp) => setFieldValue('otp', otp)}
                    isInputNum
                    shouldAutoFocus
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={{ justifyContent: 'space-between', margin: -8 }}
                    inputStyle={{
                      width: '100%',
                      height: '60px',
                      fontSize: '18px',
                      fontWeight: '500',
                      textAlign: 'center',
                      margin: '0 8px',
                      padding: '10px',
                      borderRadius: '16px',
                      border: `2px solid ${touched.otp && errors.otp ? theme.palette.error.main : theme.palette.divider
                        }`,
                      backgroundColor: theme.palette.background.default,
                      outline: 'none',
                      boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.1)`,
                      transition: 'all 0.3s ease'
                    }}
                    focusStyle={{
                      borderColor: theme.palette.primary.main,
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.2)`
                    }}
                    errorStyle={{
                      borderColor: theme.palette.error.main,
                      backgroundColor: theme.palette.error.light,
                      boxShadow: `0px 3px 6px rgba(255, 0, 0, 0.3)`
                    }}
                  />
                </Box>
                {touched.otp && errors.otp && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-otp"
                    sx={{ textAlign: 'center', fontWeight: '500', mt: 4 }}
                  >
                    {errors.otp}
                  </FormHelperText>
                )}
              </Grid>

              {/* Verify Button */}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={resendCooldown > 0}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      py: 1.5,
                      borderRadius: '8px',
                      fontWeight: 'bold'
                    }}
                  >
                    Verify OTP
                  </Button>
                </AnimateButton>
              </Grid>

              {/* Resend Code */}
              <Grid item xs={12}>
                <Stack
                  direction="column"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ textAlign: 'center' }}
                >
                  {/* Instructional Text */}
                  <Typography variant="body2" color="text.secondary">
                    Didn’t receive the code? Check your spam folder, or request a new one.
                  </Typography>

                  {/* Resend Button */}
                  <Button
                    variant="text"
                    disabled={resendCooldown > 0}
                    onClick={handleResendCode}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      textDecoration: 'underline',
                      textTransform: 'none',
                      color: resendCooldown > 0 ? 'text.secondary' : 'primary.main',
                      cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                      '&:hover': {
                        textDecoration: resendCooldown > 0 ? 'none' : 'underline',
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : 'Resend Code'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      {/* Feedback Snackbar */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
          severity={feedback.severity}
          sx={{
            width: '100%',
            backgroundColor: feedback.severity === 'success' ? '#d4edda' : feedback.severity === 'error' ? '#f8d7da' : '#fff3cd',
            color: feedback.severity === 'success' ? '#155724' : feedback.severity === 'error' ? '#721c24' : '#856404',
            fontWeight: 500,
            borderRadius: '32px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

AuthCodeVerification.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};
