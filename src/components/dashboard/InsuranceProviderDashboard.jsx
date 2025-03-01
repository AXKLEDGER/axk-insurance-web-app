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
import AssessmentIcon from '@mui/icons-material/Assessment';
import PolicyIcon from '@mui/icons-material/Policy';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaidIcon from '@mui/icons-material/Paid';
import GroupIcon from '@mui/icons-material/Group';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

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

export default function InsuranceProviderDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPolicies: null,
    totalPremiums: null,
    claimsPaid: null,
    newCustomers: null
  });
  const [policyBreakdown, setPolicyBreakdown] = useState([]);
  const [pendingClaims, setPendingClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalPolicies: 5234,
        totalPremiums: 15650000,
        claimsPaid: 3420000,
        newCustomers: 342
      });

      setPolicyBreakdown([
        { type: 'Health', count: 2100, percentage: 40 },
        { type: 'Auto', count: 1568, percentage: 30 },
        { type: 'Life', count: 1044, percentage: 20 },
        { type: 'Property', count: 522, percentage: 10 }
      ]);

      setPendingClaims([
        {
          id: 1,
          customerName: 'Emily Chen',
          claimType: 'Medical',
          claimAmount: 45000,
          dateSubmitted: '2024-03-10',
          status: 'Under Review'
        },
        {
          id: 2,
          customerName: 'Michael Rodriguez',
          claimType: 'Auto',
          claimAmount: 75000,
          dateSubmitted: '2024-03-08',
          status: 'Pending Approval'
        },
        {
          id: 3,
          customerName: 'Sarah Johnson',
          claimType: 'Property',
          claimAmount: 32500,
          dateSubmitted: '2024-03-05',
          status: 'Requires Additional Info'
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
              Insurance Provider Dashboard
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Comprehensive overview of your insurance ecosystem.
              Monitor policies, claims, and financial performance.
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
                Generate Report
              </Button>
            </Box>
          </Grid>
        </Grid>
      </WelcomeBanner>

      {/* Key Performance Indicators */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Total Policies',
            stats.totalPolicies?.toLocaleString() || '0',
            '↑ 12.5% this quarter',
            PolicyIcon,
            axkColors.primary
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Total Premiums',
            `$${stats.totalPremiums?.toLocaleString() || '0'}`,
            'Collected This Year',
            AttachMoneyIcon,
            axkColors.secondary
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Claims Paid',
            `$${stats.claimsPaid?.toLocaleString() || '0'}`,
            'Total Claim Disbursement',
            PaidIcon,
            axkColors.dark
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'New Customers',
            stats.newCustomers?.toLocaleString() || '0',
            '↑ 8.2% Growth',
            GroupIcon,
            axkColors.secondary
          )}
        </Grid>
      </Grid>

      {/* Policy Breakdown */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Policy Type Distribution
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {policyBreakdown.map((policy, index) => (
          <Grid item xs={12} md={3} key={policy.type}>
            <StyledCard>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                  {policy.type} Insurance
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                    {policy.count} Policies
                  </Typography>
                  <Typography variant="caption" color={axkColors.primary}>
                    {policy.percentage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={policy.percentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: axkColors.light,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: axkColors.primary
                    }
                  }}
                />
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Pending Claims */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Pending Claims
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Claim Type</TableCell>
              <TableCell>Claim Amount</TableCell>
              <TableCell>Date Submitted</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingClaims.map((claim) => (
              <TableRow key={claim.id} hover>
                <TableCell>{claim.customerName}</TableCell>
                <TableCell>
                  <Chip
                    label={claim.claimType}
                    size="small"
                    sx={{
                      backgroundColor: axkColors.light,
                      color: axkColors.primary
                    }}
                  />
                </TableCell>
                <TableCell>${claim.claimAmount.toLocaleString()}</TableCell>
                <TableCell>{claim.dateSubmitted}</TableCell>
                <TableCell>
                  <Chip
                    label={claim.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        claim.status === 'Under Review'
                          ? '#fff3e0'
                          : claim.status === 'Pending Approval'
                            ? '#f0f4c3'
                            : '#ffebee',
                      color:
                        claim.status === 'Under Review'
                          ? '#ff9800'
                          : claim.status === 'Pending Approval'
                            ? '#8bc34a'
                            : '#f44336'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
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
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                <strong>Customer:</strong> {selectedClaim.customerName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Claim Type:</strong> {selectedClaim.claimType}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Claim Amount:</strong> ${selectedClaim.claimAmount.toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Date Submitted:</strong> {selectedClaim.dateSubmitted}
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
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Close
          </Button>
          <Button
            onClick={handleCloseClaimDetails}
            color="primary"
            variant="contained"
          >
            Approve Claim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}