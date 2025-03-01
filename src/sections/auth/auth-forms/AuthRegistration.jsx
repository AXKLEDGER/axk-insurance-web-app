'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Fab,
  Slide,
} from '@mui/material';
import { Replay } from '@mui/icons-material';
import AccountSetupForm from './AccountSetupForm';
import AccountTypeForm from './AccountType';
import AuthCodeVerification from './AuthCodeVerification';
import { useTheme } from '@mui/material/styles';

// Steps
const steps = [
  'Select Role',
  'Sign Up',
  'Verify',
  'Complete'
];

export default function AccountSetupWizard() {
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const initialStep = parseInt(localStorage.getItem('activeStep')) || 0;
  const initialFormData = JSON.parse(localStorage.getItem('formData')) || {
    password: '',
    confirmPassword: '',
    accountType: '',
    email: '',
  };

  console.log('Initial Step from localStorage:', initialStep);
  console.log('Initial Form Data from localStorage:', initialFormData);

  const [activeStep, setActiveStep] = useState(initialStep);
  const [formData, setFormData] = useState(initialFormData);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    console.log('Saving activeStep to localStorage:', activeStep);
    localStorage.setItem('activeStep', activeStep);
  }, [activeStep]);

  useEffect(() => {
    console.log('Saving formData to localStorage:', formData);
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    setActiveStep((prevStep) => {
      const nextStep = prevStep + 1;
      console.log('Moving to Next Step:', nextStep);
      localStorage.setItem('activeStep', nextStep);
      return nextStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevStep) => {
      const prevStepUpdated = prevStep - 1;
      console.log('Moving to Previous Step:', prevStepUpdated);
      localStorage.setItem('activeStep', prevStepUpdated);
      return prevStepUpdated;
    });
  };

  const handleRestart = () => {
    localStorage.removeItem('activeStep');
    localStorage.removeItem('formData');

    setActiveStep(0);
    setFormData({
      password: '',
      confirmPassword: '',
      accountType: '',
      email: '',
    });

    setOpenConfirm(false);
  };

  const handleCompleteKYC = () => {
    // Save formData to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Redirect to the KYC Wizard
    router.push('/auth/kyc-wizard');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AccountTypeForm
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <AccountSetupForm
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <AuthCodeVerification
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        return (
          <Box
            sx={{
              textAlign: 'center',
              padding: 4,
              border: `1px solid ${isDarkMode ? '#555' : '#e0e0e0'}`,
              borderRadius: 2,
              boxShadow: isDarkMode
                ? '0px 4px 10px rgba(255, 255, 255, 0.1)'
                : '0px 4px 10px rgba(0, 0, 0, 0.1)',
              maxWidth: 400,
              margin: '0 auto',
              backgroundColor: isDarkMode ? '#333' : '#fff',
              color: isDarkMode ? '#ddd' : '#444',
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: isDarkMode ? '#2aa1af' : '#4caf50',
              }}
            >
              Registration Complete
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                color: isDarkMode ? '#aaa' : '#757575',
              }}
            >
              Thank you for registering! Your account has been successfully created.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: 3,
                color: isDarkMode ? '#ccc' : '#444',
              }}
            >
              To enhance your experience and unlock all features, please complete your KYC verification.
            </Typography>
            <Button
              variant="contained"
              // color="primary"
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                borderRadius: 4,
                textTransform: 'none',
                background: isDarkMode
                  ? 'linear-gradient(135deg, #77A956, #2aa1af)'
                  : 'linear-gradient(135deg, #4caf50, #66bb6a)',
                color: '#fff',
                boxShadow: isDarkMode
                  ? '0px 3px 10px rgba(255, 255, 255, 0.2)'
                  : '0px 3px 10px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #66bb6a, #4caf50)'
                    : 'linear-gradient(135deg, #77A956, #2aa1af)',
                },
              }}
              // onClick={() => alert('Redirecting to KYC process...')}
              onClick={handleCompleteKYC}
            >
              Complete KYC
            </Button>
          </Box>
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 5 }}>
        {getStepContent(activeStep)}
      </Box>

      {activeStep > 0 && (
        <Tooltip title="Restart the KYC process" placement="left">
          <Slide direction="up" in>
            <Fab
              color="primary"
              aria-label="restart"
              onClick={() => setOpenConfirm(true)}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                boxShadow: theme.shadows[4],
                background: 'linear-gradient(135deg, #2aa1af 0%, #87B855 100%)',
                color: '#FFF',
                '&:hover': {
                  background: 'linear-gradient(135deg, #87B855 0%, #6CA244 100%)',
                },
              }}
            >
              <Replay />
            </Fab>
          </Slide>
        </Tooltip>
      )}

      <Dialog
        open={openConfirm}
        onClose={(e) => {
          e.stopPropagation();
          setOpenConfirm(false);
        }}
        aria-labelledby="restart-dialog-title"
        aria-describedby="restart-dialog-description"
        PaperProps={{
          sx: {
            padding: 0,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
            backgroundColor: '#F8F9FA',
            transform: openConfirm ? 'scale(1) translateY(0)' : 'scale(0.98) translateY(-8px)',
            opacity: openConfirm ? 1 : 0,
            transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            transition: 'opacity 0.2s ease-out',
            opacity: openConfirm ? 0.6 : 0,
            backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2aa1af 0%, #87B855 100%)',
            padding: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: '#FFF',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: '1.25rem',
              letterSpacing: '-0.01em',
            }}
          >
            Restart Registration Process
          </Typography>
        </Box>

        <DialogContent
          sx={{
            textAlign: 'center',
            padding: 3.5,
            color: '#2D3748',
            backgroundColor: '#FFF',
          }}
        >
          <Typography
            id="restart-dialog-description"
            variant="body1"
            sx={{
              fontSize: '1rem',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Are you sure you want to restart the process?
            <Box
              component="p"
              sx={{
                color: '#87B855',
                fontWeight: 600,
                marginTop: 1,
                fontSize: '0.95rem'
              }}
            >
              All progress will be lost.
            </Box>
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: '#FFF',
            padding: 2.5,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpenConfirm(false);
            }}
            variant="outlined"
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: 500,
              borderRadius: '8px',
              color: '#4A5568',
              borderColor: '#E2E8F0',
              backgroundColor: '#FFF',
              '&:hover': {
                backgroundColor: '#F7FAFC',
                borderColor: '#CBD5E0',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRestart}
            variant="contained"
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: 500,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2aa1af 0%, #87B855 100%)',
              color: '#FFF',
              boxShadow: '0 2px 8px rgba(135, 184, 85, 0.25)',
              '&:hover': {
                background: 'linear-gradient(135deg, #87B855 0%, #6CA244 100%)',
                boxShadow: '0 4px 12px rgba(135, 184, 85, 0.3)',
              },
            }}
          >
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
