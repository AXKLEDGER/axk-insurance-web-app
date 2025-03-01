'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PaymentIcon from '@mui/icons-material/Payment';
import EventIcon from '@mui/icons-material/Event';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// AxkInsurance brand colors
const axkColors = {
  primary: '#2aa1af',
  secondary: '#3cbbc9',
  dark: '#1d8a97',
  light: '#e6f7f8',
  background: '#f0fafa'
};

// Styled Components
const WelcomeBanner = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${axkColors.primary} 0%, ${axkColors.dark} 100%)`,
  borderRadius: '16px',
  padding: theme.spacing(3),
  color: 'white',
  marginBottom: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '200px',
    height: '100%',
    background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 100%)',
    transform: 'skewX(-45deg)',
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  borderRadius: '16px',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px 0 rgba(0,0,0,0.1)',
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  backgroundColor: color + '20',
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  opacity: 0.8,
}));

export default function PatientDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [insuranceCoverage, setInsuranceCoverage] = useState(null);
  const [recentClaims, setRecentClaims] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUserProfile({
        name: 'Sarah Johnson',
        age: 35,
        memberSince: '2022-03-15'
      });

      setInsuranceCoverage({
        planName: 'Comprehensive Health Shield',
        coverageLimit: 500000,
        remainingCoverage: 375000,
        coveragePercentage: 75
      });

      setRecentClaims([
        {
          id: 1,
          date: '2024-02-15',
          type: 'Medical Consultation',
          amount: 250,
          status: 'Processed'
        },
        {
          id: 2,
          date: '2024-01-22',
          type: 'Dental Procedure',
          amount: 1200,
          status: 'Approved'
        },
        {
          id: 3,
          date: '2024-03-05',
          type: 'Prescription Medication',
          amount: 75,
          status: 'Pending'
        }
      ]);

      setUpcomingAppointments([
        {
          id: 1,
          date: '2024-03-20',
          time: '10:00 AM',
          type: 'Annual Check-up',
          doctor: 'Dr. Emily Chen',
          status: 'Confirmed'
        },
        {
          id: 2,
          date: '2024-04-05',
          time: '02:30 PM',
          type: 'Dental Screening',
          doctor: 'Dr. Michael Rodriguez',
          status: 'Scheduled'
        }
      ]);

      setLoading(false);
    }, 2000);
  }, []);

  const renderStatCard = (title, value, subtitle, Icon, color) => (
    <StyledCard>
      <CardContent>
        {loading ? (
          <Skeleton variant="rectangular" height={100} animation="wave" />
        ) : (
          <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <IconWrapper color={color}>
                <Icon sx={{ color: color }} />
              </IconWrapper>
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: theme.palette.background.default,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  color: theme.palette.text.secondary
                }}
              >
                Current
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="caption" sx={{ color: color }}>
              {subtitle}
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );

  const handleClaimDetails = (claim) => {
    setSelectedClaim(claim);
  };

  const handleCloseClaimDetails = () => {
    setSelectedClaim(null);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: axkColors.background }}>
      {/* Welcome Banner */}
      <WelcomeBanner>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome, {userProfile?.name}!
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Your health is our priority. Stay informed about your insurance
              coverage and upcoming medical needs.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  backgroundColor: axkColors.secondary,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: axkColors.dark
                  }
                }}
              >
                View Policy Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </WelcomeBanner>

      {/* Insurance Coverage Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Coverage Plan',
            insuranceCoverage?.planName || 'Loading',
            'Comprehensive Health',
            HealthAndSafetyIcon,
            axkColors.primary
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Total Coverage',
            `$${insuranceCoverage?.coverageLimit.toLocaleString() || '0'}`,
            'Annual Limit',
            AccountBalanceWalletIcon,
            axkColors.secondary
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Remaining Coverage',
            `$${insuranceCoverage?.remainingCoverage.toLocaleString() || '0'}`,
            'Available Balance',
            PaymentIcon,
            axkColors.dark
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Coverage Progress',
            `${insuranceCoverage?.coveragePercentage || 0}%`,
            'Utilized This Year',
            MedicalServicesIcon,
            axkColors.secondary
          )}
        </Grid>
      </Grid>

      {/* Recent Claims */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Recent Claims
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {recentClaims.map((claim, index) => (
          <Grid item xs={12} md={4} key={claim.id}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {claim.type}
                  </Typography>
                  <Chip
                    label={claim.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        claim.status === 'Processed'
                          ? axkColors.light
                          : claim.status === 'Pending'
                            ? '#fff3e0'
                            : axkColors.light,
                      color:
                        claim.status === 'Processed'
                          ? axkColors.primary
                          : claim.status === 'Pending'
                            ? '#ff9800'
                            : axkColors.primary
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Claim Date
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {claim.date}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Claim Amount
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    ${claim.amount}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    borderColor: axkColors.primary,
                    color: axkColors.primary,
                    '&:hover': {
                      backgroundColor: axkColors.light
                    }
                  }}
                  onClick={() => handleClaimDetails(claim)}
                >
                  View Details
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Appointments */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Upcoming Appointments
      </Typography>
      <Grid container spacing={3}>
        {upcomingAppointments.map((appointment, index) => (
          <Grid item xs={12} md={4} key={appointment.id}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventIcon sx={{ color: axkColors.primary, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {appointment.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {appointment.doctor}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {appointment.date}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                      Time
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {appointment.time}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={appointment.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      appointment.status === 'Confirmed'
                        ? axkColors.light
                        : '#fff3e0',
                    color:
                      appointment.status === 'Confirmed'
                        ? axkColors.primary
                        : '#ff9800'
                  }}
                />
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Claim Details Dialog */}
      <Dialog
        open={!!selectedClaim}
        onClose={handleCloseClaimDetails}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Claim Details</DialogTitle>
        <DialogContent>
          {selectedClaim && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Type:</strong> {selectedClaim.type}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Date:</strong> {selectedClaim.date}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Amount:</strong> ${selectedClaim.amount}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Status:</strong> {selectedClaim.status}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClaimDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}