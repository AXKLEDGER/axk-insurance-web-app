import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Modal,
  alpha,
  Chip,
  Stack
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

// Toast Component
function Toast({ message, color, type, onClose }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: 'flex',
        alignItems: 'center',
        background: color,
        color: '#fff',
        p: 2,
        borderRadius: 8,
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        animation: 'fadeIn 0.5s, fadeOut 0.5s 4.5s'
      }}
    >
      {type === 'success' ? (
        <CheckCircleIcon sx={{ mr: 1, fontSize: '1.5rem' }} />
      ) : (
        <ErrorIcon sx={{ mr: 1, fontSize: '1.5rem' }} />
      )}
      <Typography>{message}</Typography>
      <IconButton
        size="small"
        onClick={onClose}
        sx={{ color: '#fff', ml: 2 }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired
};

const roles = [
  {
    id: 'patient',
    title: 'Policy Holder',
    tagline: 'Your Insurance, Your Control',
    description: 'Manage your insurance policies, file claims, and control access to your health records.',
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
    benefits: ['Easy policy management', 'Quick claims filing', 'Access to health records'],
    color: '#2aa1af'
  },
  {
    id: 'hospital',
    title: 'Care Provider',
    tagline: 'Streamline Claims and Simplify Operations',
    description: 'Process claims, access patient data, and manage healthcare workflows.',
    icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
    benefits: ['Simplified claims process', 'Secure patient data access', 'Streamlined operations'],
    color: '#1d8a97'
  },
  {
    id: 'insurer',
    title: 'Insurance Company',
    tagline: 'Empowering Transparent Insurance',
    description: 'Leverage AXK\'s blockchain to manage policies, approve claims, and eliminate fraud.',
    icon: <ShieldIcon sx={{ fontSize: 40 }} />,
    benefits: ['Fraud prevention', 'Automated approvals', 'Enhanced data security'],
    color: '#3cbbc9'
  }
];

const validationSchema = Yup.object({
  accountType: Yup.string().required('Please select a role.')
});

// Note: This component uses the framer-motion library for animations
// Please add it to your dependencies with: npm install framer-motion

export default function AccountTypeForm({ formData, setFormData, handleNext }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    color: '',
    type: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      accountType: formData.accountType || '',
      hasConsented: formData.hasConsented || false
    },
    validationSchema,
    onSubmit: () => {
      if (formik.values.hasConsented) {
        setFormData((prev) => ({
          ...prev,
          accountType: formik.values.accountType,
          hasConsented: true
        }));
        handleNext();
      } else {
        setModalOpen(true);
      }
    }
  });

  // Find index of selected role if any
  useState(() => {
    if (formData.accountType) {
      const index = roles.findIndex(role => role.id === formData.accountType);
      if (index !== -1) setActiveIndex(index);
    }
  }, [formData.accountType]);

  const triggerToast = (message, color, type) => {
    setToast({ open: true, message, color, type });
    setTimeout(() => {
      setToast({ open: false, message: '', color: '', type: '' });
    }, 5000);
  };

  const handleSelect = (role, index) => {
    formik.setFieldValue('accountType', role.id);
    setActiveIndex(index);
    triggerToast(
      `You selected ${role.title} – ${role.tagline}!`,
      role.color,
      'success'
    );
  };

  // T&C modal scroll
  const handleModalScroll = (e) => {
    const target = e.target;
    const isScrolledToEnd = target.scrollTop + target.clientHeight >= target.scrollHeight - 10;
    if (!footerVisible && isScrolledToEnd) {
      setFooterVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    triggerToast(
      'You must accept the Terms & Conditions to proceed.',
      '#d32f2f',
      'error'
    );
  };

  const handleAgreeAndContinue = () => {
    formik.setFieldValue('hasConsented', true);
    setModalOpen(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setFormData((prev) => ({
        ...prev,
        accountType: formik.values.accountType,
        hasConsented: true
      }));
      handleNext();
    }, 800);
  };

  const handleNextClick = () => {
    if (!formik.values.accountType) {
      triggerToast('Please select a role.', '#d32f2f', 'error');
      return;
    }

    if (formik.values.hasConsented) {
      setFormData((prev) => ({
        ...prev,
        accountType: formik.values.accountType,
        hasConsented: true
      }));
      handleNext();
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Header with Subtle Pattern */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          position: 'relative',
          py: 3,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-20px',
            left: '-10%',
            width: '120%',
            height: '120%',
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23${isDarkMode ? '2aa1af' : '2aa1af'}' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            zIndex: -1,
          }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: isDarkMode ? '#fff' : '#333',
            fontFamily: 'Poppins, sans-serif',
            textTransform: 'uppercase',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #2aa1af, #3cbbc9)',
              borderRadius: '2px'
            }
          }}
        >
          Choose Your Role
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: isDarkMode ? '#bbb' : '#777',
            maxWidth: 600,
            mx: 'auto',
            fontFamily: 'Poppins, sans-serif',
            mt: 4
          }}
        >
          Select the account type that best fits your needs with AXK Insurance
        </Typography>
      </Box>

      {/* Numbered Selection Indicators */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
          gap: { xs: 2, md: 6 },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            height: '2px',
            width: { xs: '70%', md: '50%', lg: '30%' },
            background: alpha('#2aa1af', 0.2),
            top: '50%',
            zIndex: 0,
          }
        }}
      >
        {roles.map((role, index) => {
          const isActive = activeIndex === index;
          const isSelected = formik.values.accountType === role.id;

          return (
            <Box
              key={`indicator-${index}`}
              onClick={() => handleSelect(role, index)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 1,
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {/* Number Indicator */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isActive ? role.color : isDarkMode ? '#333' : '#f5f5f5',
                  color: isActive ? '#fff' : isDarkMode ? '#aaa' : '#666',
                  border: `2px solid ${isActive ? role.color : 'transparent'}`,
                  boxShadow: isActive ? `0 0 15px ${alpha(role.color, 0.5)}` : 'none',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  mb: 1,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&::after': isSelected ? {
                    content: '""',
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${role.color.replace('#', '%23')}' width='16px' height='16px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E")`,
                    backgroundSize: '80%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  } : {},
                }}
              >
                {index + 1}
              </Box>

              {/* Role Name */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? role.color : isDarkMode ? '#bbb' : '#666',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  maxWidth: '100px',
                  transition: 'all 0.3s ease',
                }}
              >
                {role.title}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Card Display Area */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: '900px',
          height: '380px',
          mx: 'auto',
          mb: 6,
          overflow: 'hidden',
          borderRadius: '20px',
          boxShadow: isDarkMode ?
            '0 10px 40px rgba(0, 0, 0, 0.4)' :
            '0 10px 40px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AnimatePresence mode="wait">
          {roles.map((role, index) => {
            const isActive = activeIndex === index;

            if (!isActive) return null;

            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    height: '100%',
                    background: isDarkMode ?
                      `linear-gradient(135deg, #111, #222)` :
                      `linear-gradient(135deg, #fff, #f8f8f8)`,
                    borderTop: `5px solid ${role.color}`,
                    p: 0,
                  }}
                >
                  {/* Left side - Visual */}
                  <Box
                    sx={{
                      width: { xs: '100%', md: '40%' },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 4,
                      position: 'relative',
                      overflow: 'hidden',
                      background: `linear-gradient(135deg, ${alpha(role.color, 0.2)}, ${alpha(role.color, 0.05)})`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23${role.color.replace('#', '')}' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.8,
                        zIndex: 0,
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        backgroundColor: role.color,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: `0 5px 30px ${alpha(role.color, 0.5)}`,
                        color: '#fff',
                        mb: 3,
                        zIndex: 1,
                      }}
                    >
                      {role.icon}
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: role.color,
                        mb: 2,
                        zIndex: 1,
                        textAlign: 'center',
                      }}
                    >
                      {role.title}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        color: isDarkMode ? '#ddd' : '#444',
                        zIndex: 1,
                        textAlign: 'center',
                      }}
                    >
                      {role.tagline}
                    </Typography>

                    <Button
                      variant="contained"
                      onClick={() => handleSelect(role, index)}
                      sx={{
                        mt: 4,
                        py: 1,
                        px: 3,
                        backgroundColor: role.color,
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        boxShadow: `0 4px 15px ${alpha(role.color, 0.4)}`,
                        '&:hover': {
                          backgroundColor: role.color,
                          boxShadow: `0 6px 20px ${alpha(role.color, 0.6)}`,
                        },
                        zIndex: 1,
                      }}
                    >
                      {formik.values.accountType === role.id ? 'Selected' : 'Select Role'}
                    </Button>
                  </Box>

                  {/* Right side - Information */}
                  <Box
                    sx={{
                      flex: 1,
                      p: 4,
                      pl: { md: 5 },
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 4,
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        color: isDarkMode ? '#ccc' : '#444',
                      }}
                    >
                      {role.description}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: role.color,
                        mb: 2,
                        fontSize: '1.1rem',
                      }}
                    >
                      Key Benefits
                    </Typography>

                    <Box sx={{ mb: 'auto' }}>
                      {role.benefits.map((benefit, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              backgroundColor: alpha(role.color, 0.1),
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              mr: 2,
                              flexShrink: 0,
                            }}
                          >
                            <VerifiedUserIcon
                              sx={{
                                color: role.color,
                                fontSize: '0.9rem'
                              }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDarkMode ? '#bbb' : '#666',
                            }}
                          >
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Selection Indicator */}
                    {formik.values.accountType === role.id && (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Currently Selected"
                        sx={{
                          alignSelf: 'flex-end',
                          backgroundColor: alpha(role.color, 0.1),
                          color: role.color,
                          fontWeight: 'bold',
                          mt: 2,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>

      {/* Next Button */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="contained"
          sx={{
            px: 6,
            py: 1.5,
            background: 'linear-gradient(135deg, #2aa1af, #3cbbc9)',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            borderRadius: '30px',
            boxShadow: '0px 5px 20px rgba(42, 161, 175, 0.4)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.7s ease',
            },
            '&:hover': {
              boxShadow: '0px 8px 25px rgba(42, 161, 175, 0.6)',
              '&::after': {
                left: '100%',
              }
            }
          }}
          type="button"
          onClick={handleNextClick}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          ) : (
            'Continue Your Journey'
          )}
        </Button>
      </Box>

      {/* T&C Modal - remains the same as before */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            maxHeight: '80vh',
            bgcolor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#ddd' : '#444',
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            fontFamily: 'Poppins, sans-serif',
            border: `1px solid ${alpha('#2aa1af', 0.3)}`,
            overflow: 'hidden',
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              background: 'linear-gradient(135deg, #2aa1af, #3cbbc9)',
              color: '#fff',
              py: 2,
              px: 3,
              zIndex: 1,
              textAlign: 'center',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Terms & Conditions
            </Typography>
          </Box>

          {/* Scrollable Content */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              overflowY: 'auto',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              fontFamily: 'Poppins, sans-serif',
              color: isDarkMode ? '#fff' : '#444',
            }}
            onScroll={handleModalScroll}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: isDarkMode ? '#2aa1af' : '#3cbbc9',
                fontWeight: 600,
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Effective Date: December 21, 2024
            </Typography>

            {/* 1. Introduction */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              1. Introduction
            </Typography>
            <Typography sx={{ mt: 1 }}>
              AXK Insurance is a hybrid platform integrating blockchain, fintech,
              and e-commerce. These Terms and Conditions (the “Terms”) govern
              your access to and use of our website, mobile applications, and
              any other services we offer (collectively, the “Platform” or
              “Services”).
            </Typography>

            {/* 2. Definitions */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              2. Definitions
            </Typography>
            <Typography sx={{ mt: 1 }}>
              The following terms apply:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <b>AXK Insurance:</b> Refers to AXK Insurance, its owners, affiliates,
                and subsidiaries.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <b>User:</b> Any individual or entity accessing or using
                AXK Insurance’s Services.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <b>Content:</b> Includes but is not limited to text, images,
                data, software, and other materials provided through AXK Insurance.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <b>Services:</b> The features, functionalities, and tools made
                available by AXK Insurance.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <b>Platform:</b> Collectively refers to AXK Insurance’s website,
                mobile applications, and any related infrastructure.
              </Box>
            </Box>

            {/* 3. Eligibility */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              3. Eligibility
            </Typography>
            <Typography sx={{ mt: 1 }}>
              To use AXK Insurance, you must:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li" sx={{ mb: 1 }}>
                Be at least 18 years of age or have parental/guardian consent.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Provide accurate and truthful information during registration.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Agree to comply with all applicable local, state, national, and
                international laws.
              </Box>
            </Box>

            {/* 4. User Responsibilities */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              4. User Responsibilities
            </Typography>
            <Typography sx={{ mt: 1 }}>
              By using AXK Insurance, you agree to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li" sx={{ mb: 1 }}>
                Safeguard your account credentials and notify us immediately of
                any unauthorized use.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Use AXK Insurance solely for lawful purposes and refrain from
                engaging in prohibited activities.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Be responsible for any activity that occurs under your account.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Provide up-to-date, accurate, and complete information when
                required.
              </Box>
            </Box>

            <Typography sx={{ mt: 1 }}>
              Prohibited activities include but are not limited to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li" sx={{ mb: 1 }}>
                Spreading malware, viruses, or engaging in any malicious
                activity.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Using AXK Insurance for fraudulent activities, including money
                laundering.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Posting defamatory, obscene, or otherwise objectionable
                content.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Accessing or attempting to access our systems without
                authorization.
              </Box>
            </Box>

            {/* 5. License to Use */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              5. License to Use
            </Typography>
            <Typography sx={{ mt: 1 }}>
              AXK Insurance grants you a limited, non-exclusive, non-transferable,
              and revocable license to access and use the Platform and its
              Services for personal or business purposes as outlined in these
              Terms. You agree not to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li" sx={{ mb: 1 }}>
                Modify, copy, distribute, or create derivative works from
                AXK Insurance’s Content without explicit consent.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Reverse-engineer, decompile, or disassemble any aspect of
                AXK Insurance’s technology.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                Use the Platform in a manner that could disrupt its normal
                operations.
              </Box>
            </Box>

            {/* 6. Intellectual Property Rights */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              6. Intellectual Property Rights
            </Typography>
            <Typography sx={{ mt: 1 }}>
              All trademarks, logos, service marks, and trade names displayed on
              the Platform are the registered or unregistered trademarks of
              AXK Insurance or its affiliates. You may not use, copy, reproduce,
              republish, upload, post, transmit, distribute, or modify these
              marks in any way without AXK Insurance’s prior written permission.
              Unauthorized use of any materials found on the Platform may
              violate copyright laws, trademark laws, privacy, and publicity
              regulations, and/or communications statutes.
            </Typography>

            {/* 7. Payment Terms */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              7. Payment Terms
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Certain features or Services offered on the Platform may require
              payment. You agree to pay all fees and applicable taxes incurred
              by you or anyone using your account. AXK Insurance reserves the right
              to change its pricing and fees at any time, and will provide
              notice of any such changes within a reasonable timeframe. All
              payments must be made in accordance with the terms posted at the
              time of purchase, including any relevant billing cycle or
              subscription model.
            </Typography>

            {/* 8. Privacy */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              8. Privacy
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Your privacy is important to us. Our Privacy Policy explains how
              we collect, use, store, and protect your personal data. By using
              AXK Insurance, you consent to the collection and use of your
              information in accordance with our Privacy Policy.
            </Typography>

            {/* 9. Third-Party Services */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              9. Third-Party Services
            </Typography>
            <Typography sx={{ mt: 1 }}>
              The Platform may contain links to third-party websites or
              services. AXK Insurance does not control and is not responsible for
              the content, availability, or practices of such third-party
              sites. Your dealings or communications with any third-party are
              solely between you and that third party. We encourage you to
              review the policies of any third-party site you visit.
            </Typography>

            {/* 10. Termination */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              10. Termination
            </Typography>
            <Typography sx={{ mt: 1 }}>
              AXK Insurance may terminate or suspend your account and/or access to
              the Platform at any time, with or without notice, for any reason,
              including but not limited to breach of these Terms. In the event
              of termination, you remain bound by all sections of these Terms
              that by their nature should survive termination, including
              intellectual property provisions, disclaimers, and limitations of
              liability.
            </Typography>

            {/* 11. Disclaimers */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              11. Disclaimers
            </Typography>
            <Typography sx={{ mt: 1 }}>
              AXK Insurance provides its Platform and Services under the following terms:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <b>No Warranty:</b> The Platform and Services are provided “as is” and “as
                available,” without warranties of any kind. We do not guarantee that the
                Platform will be uninterrupted or error-free, nor do we make any warranty
                as to the results that may be obtained from the use of the Platform.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <b>Blockchain-Related Risks:</b> AXK Insurance integrates blockchain
                technology, which carries inherent risks, including potential loss of
                funds. You acknowledge and accept such risks.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <b>E-commerce Risks:</b> Transactions on the Platform may involve third
                parties. AXK Insurance is not responsible for the products or services provided
                by these third parties.
              </Box>
            </Box>

            {/* 12. Limitation of Liability */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              12. Limitation of Liability
            </Typography>
            <Typography sx={{ mt: 1 }}>
              To the fullest extent permitted by law, AXK Insurance shall not be
              liable for any direct, indirect, incidental, special,
              consequential, or exemplary damages, including but not limited to
              damages for loss of profits, goodwill, use, data, or other
              intangible losses resulting from:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 1 }}>
              <Box component="li" sx={{ mb: 1 }}>Your use of or inability to use the Platform.</Box>
              <Box component="li" sx={{ mb: 1 }}>Any unauthorized access to or alteration of your data.</Box>
              <Box component="li" sx={{ mb: 1 }}>Statements or conduct of any third party on the Platform.</Box>
              <Box component="li" sx={{ mb: 1 }}>
                Any other matter relating to the Platform or the Services provided.
              </Box>
            </Box>

            {/* 13. Indemnification */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              13. Indemnification
            </Typography>
            <Typography sx={{ mt: 1 }}>
              You agree to indemnify, defend, and hold harmless AXK Insurance and
              its affiliates, officers, agents, and employees from any claims,
              liabilities, damages, losses, and expenses (including reasonable
              attorneys’ fees and costs) arising out of or in any way connected
              to your use of the Platform or violation of these Terms.
            </Typography>

            {/* 14. Governing Law */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              14. Governing Law
            </Typography>
            <Typography sx={{ mt: 1 }}>
              These Terms and any disputes relating to them shall be governed by
              and construed in accordance with the laws of [Insert Jurisdiction]
              without regard to its conflict of law provisions. You expressly
              consent to the exclusive jurisdiction of the courts in [Insert
              Jurisdiction] for the resolution of any disputes.
            </Typography>

            {/* 15. Force Majeure */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              15. Force Majeure
            </Typography>
            <Typography sx={{ mt: 1 }}>
              AXK Insurance shall not be liable for any failure or delay in
              performance due to circumstances beyond its reasonable control,
              including but not limited to acts of God, natural disasters,
              strikes, lockouts, war, terrorism, riots, embargoes, acts of
              civil or military authority, or shortages of transportation,
              facilities, fuel, energy, labor, or materials.
            </Typography>

            {/* 16. Changes to These Terms */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              16. Changes to These Terms
            </Typography>
            <Typography sx={{ mt: 1 }}>
              AXK Insurance may update or modify these Terms at any time. We will
              provide notice of material changes to the Terms by posting the
              revised Terms on the Platform and indicating the date of the most
              recent update. Your continued use of the Platform after any such
              changes constitutes your acceptance of the updated Terms.
            </Typography>

            {/* 17. Entire Agreement */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              17. Entire Agreement
            </Typography>
            <Typography sx={{ mt: 1 }}>
              These Terms, together with any other legal notices and agreements
              published by AXK Insurance on the Platform, constitute the entire
              agreement between you and AXK Insurance concerning the use of the
              Platform. Any waiver of any provision of these Terms will be
              effective only if in writing and signed by an authorized
              representative of AXK Insurance.
            </Typography>

            {/* 18. Severability */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              18. Severability
            </Typography>
            <Typography sx={{ mt: 1 }}>
              If any provision of these Terms is deemed invalid, unlawful, void,
              or for any reason unenforceable, then that provision will be
              deemed severable from these Terms and will not affect the validity
              and enforceability of any remaining provisions.
            </Typography>

            {/* 19. Contact Information */}
            <Typography sx={{ mt: 3, fontWeight: 700 }}>
              19. Contact Information
            </Typography>
            <Typography sx={{ mt: 1 }}>
              For any questions, feedback, or issues, you can reach us at:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 2,
                mt: 2,
                p: 3,
                // bgcolor: isDarkMode ? '#444' : '#f9f9f9',
                backgroundColor: isDarkMode ? alpha('#ffffff', 0.1) : '#F9F9F9',
                borderRadius: '10px',
                boxShadow: isDarkMode
                  ? '0px 4px 10px rgba(255, 255, 255, 0.1)'
                  : '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <IconButton
                  sx={{
                    background: 'linear-gradient(135deg, #2aa1af, #3cbbc9)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    boxShadow: isDarkMode
                      ? '0px 3px 10px rgba(255, 255, 255, 0.2)'
                      : '0px 3px 10px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  📧
                </IconButton>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: isDarkMode ? '#ddd' : '#333',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Email:{' '}
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 'normal',
                      color: isDarkMode ? '#aaa' : '#555',
                    }}>
                    support@axkinsurance.org
                  </Typography>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <IconButton
                  sx={{
                    background: 'linear-gradient(135deg, #1E90FF, #87CEFA)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    boxShadow: isDarkMode
                      ? '0px 3px 10px rgba(255, 255, 255, 0.2)'
                      : '0px 3px 10px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  📍
                </IconButton>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: isDarkMode ? '#ddd' : '#333',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Address:{' '}
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 'normal',
                      color: isDarkMode ? '#aaa' : '#555',
                    }}>
                    Kigali, Rwanda
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Sticky Footer */}
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              py: 2,
              textAlign: 'center',
              borderTop: `1px solid ${isDarkMode ? '#444' : 'rgba(0, 0, 0, 0.05)'}`,
              boxShadow: '0px -5px 20px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.5s ease',
              opacity: footerVisible ? 1 : 0,
              transform: footerVisible ? 'translateY(0)' : 'translateY(20px)',
              pointerEvents: footerVisible ? 'auto' : 'none',
              bgcolor: isDarkMode ? '#2a2a2a' : '#f9f9f9',
            }}
          >
            <Button
              onClick={handleAgreeAndContinue}
              variant="contained"
              sx={{
                width: '80%',
                py: 1.5,
                background: 'linear-gradient(135deg, #2aa1af, #3cbbc9)',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '10px',
                boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3cbbc9, #2aa1af)',
                  boxShadow: '0px 7px 25px rgba(0, 0, 0, 0.3)',
                }
              }}
            >
              I Accept the Terms & Conditions
            </Button>
          </Box>
        </Box>
      </Modal>

      {toast.open && (
        <Toast
          message={toast.message}
          color={toast.color}
          type={toast.type}
          onClose={() =>
            setToast({ open: false, message: '', color: '', type: '' })
          }
        />
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
      `}</style>
    </form>
  );
}

AccountTypeForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};