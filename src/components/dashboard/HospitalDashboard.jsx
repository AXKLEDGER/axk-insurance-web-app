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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PaymentIcon from '@mui/icons-material/Payment';
import EventIcon from '@mui/icons-material/Event';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

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

export default function HospitalDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [hospitalProfile, setHospitalProfile] = useState(null);
  const [claimStats, setClaimStats] = useState(null);
  const [pendingClaims, setPendingClaims] = useState([]);
  const [processedClaims, setProcessedClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setHospitalProfile({
        name: 'Central Medical Center',
        location: 'Metro City',
        registeredSince: '2020-06-01'
      });

      setClaimStats({
        totalClaims: 450,
        pendingReview: 35,
        approvedAmount: 1250000,
        averageProcessingTime: 3.5
      });

      setPendingClaims([
        {
          id: 1,
          patientName: 'John Doe',
          claimAmount: 5600,
          serviceDate: '2024-03-10',
          status: 'Pending Review'
        },
        {
          id: 2,
          patientName: 'Emily Smith',
          claimAmount: 3200,
          serviceDate: '2024-03-12',
          status: 'Under Verification'
        },
        {
          id: 3,
          patientName: 'Michael Johnson',
          claimAmount: 7800,
          serviceDate: '2024-03-15',
          status: 'Pending Documentation'
        }
      ]);

      setProcessedClaims([
        {
          id: 4,
          patientName: 'Sarah Williams',
          claimAmount: 4500,
          serviceDate: '2024-02-25',
          status: 'Approved',
          paymentDate: '2024-03-05'
        },
        {
          id: 5,
          patientName: 'David Brown',
          claimAmount: 6200,
          serviceDate: '2024-02-20',
          status: 'Approved',
          paymentDate: '2024-03-02'
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
              {hospitalProfile?.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Your healthcare claims management portal. Stay on top of
              your claims processing and patient reimbursements.
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
                Submit New Claim
              </Button>
            </Box>
          </Grid>
        </Grid>
      </WelcomeBanner>

      {/* Claim Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Total Claims',
            claimStats?.totalClaims || 0,
            'Processed This Quarter',
            LocalHospitalIcon,
            axkColors.primary
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Pending Claims',
            claimStats?.pendingReview || 0,
            'Awaiting Review',
            DocumentScannerIcon,
            axkColors.secondary
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Total Approved Amount',
            `$${claimStats?.approvedAmount.toLocaleString() || 0}`,
            'Reimbursed Claims',
            AccountBalanceWalletIcon,
            axkColors.dark
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Avg. Processing Time',
            `${claimStats?.averageProcessingTime || 0} Days`,
            'Claim Resolution',
            AssessmentIcon,
            axkColors.secondary
          )}
        </Grid>
      </Grid>

      {/* Pending Claims */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Pending Claims
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient Name</TableCell>
                      <TableCell>Claim Amount</TableCell>
                      <TableCell>Service Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>{claim.patientName}</TableCell>
                        <TableCell>${claim.claimAmount}</TableCell>
                        <TableCell>{claim.serviceDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={claim.status}
                            size="small"
                            sx={{
                              backgroundColor: '#fff3e0',
                              color: '#ff9800'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: axkColors.primary,
                              color: axkColors.primary,
                              '&:hover': {
                                backgroundColor: axkColors.light
                              }
                            }}
                            onClick={() => handleClaimDetails(claim)}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Processed Claims */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Processed Claims
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient Name</TableCell>
                      <TableCell>Claim Amount</TableCell>
                      <TableCell>Service Date</TableCell>
                      <TableCell>Payment Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {processedClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>{claim.patientName}</TableCell>
                        <TableCell>${claim.claimAmount}</TableCell>
                        <TableCell>{claim.serviceDate}</TableCell>
                        <TableCell>{claim.paymentDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={claim.status}
                            size="small"
                            sx={{
                              backgroundColor: axkColors.light,
                              color: axkColors.primary
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Claim Details Dialog */}
      <Dialog
        open={!!selectedClaim}
        onClose={handleCloseClaimDetails}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Claim Review</DialogTitle>
        <DialogContent>
          {selectedClaim && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Patient:</strong> {selectedClaim.patientName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Claim Amount:</strong> ${selectedClaim.claimAmount}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Service Date:</strong> {selectedClaim.serviceDate}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Current Status:</strong> {selectedClaim.status}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseClaimDetails}
            variant="outlined"
            sx={{
              borderColor: axkColors.primary,
              color: axkColors.primary
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: axkColors.primary,
              '&:hover': {
                backgroundColor: axkColors.dark
              }
            }}
          >
            Process Claim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}