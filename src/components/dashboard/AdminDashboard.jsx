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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// Import MUI Icons
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WhatshotIcon from '@mui/icons-material/Whatshot';

// Custom styled components
const WelcomeBanner = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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
  backgroundColor: color,
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  opacity: 0.8,
}));

const HighlightCard = styled(Card)(({ theme, bgcolor }) => ({
  background: bgcolor || theme.palette.background.default,
  borderRadius: '16px',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  }
}));

const NotificationBanner = styled(Alert)(({ theme }) => ({
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  '& .MuiAlert-message': {
    width: '100%',
  }
}));

export default function AdminDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBalance: null,
    transactionVolume: null,
    activeUsers: null,
    growthRate: null,
  });
  const [notifications, setNotifications] = useState([]);
  const [marketHighlights, setMarketHighlights] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalBalance: 25840.50,
        transactionVolume: 1250,
        activeUsers: 342,
        growthRate: 28.5,
      });
      setNotifications([
        {
          id: 1,
          type: 'warning',
          title: 'New Investment Opportunity',
          message: 'Premium Cocoa Farm investment portfolio is now open for funding',
          action: 'View Details'
        },
        {
          id: 2,
          type: 'info',
          title: 'Market Update',
          message: 'Coffee prices have increased by 5% in the last 24 hours',
          action: 'See Market'
        }
      ]);

      setMarketHighlights([
        {
          title: 'Top Performing',
          value: 'Organic Cocoa',
          change: '+15.4%',
          trend: 'up'
        },
        {
          title: 'Most Traded',
          value: 'Coffee Beans',
          change: '+8.2%',
          trend: 'up'
        },
        {
          title: 'New Listing',
          value: 'Cashew Nuts',
          change: 'Just Listed',
          trend: 'new'
        }
      ]);

      setTrendingProducts([
        {
          name: 'Premium Coffee Beans',
          origin: 'Ethiopia',
          price: '$4.50/kg',
          trend: '+12%',
          investors: 24,
          completion: 75
        },
        {
          name: 'Organic Cocoa',
          origin: 'Ghana',
          price: '$3.80/kg',
          trend: '+8%',
          investors: 18,
          completion: 60
        },
        {
          name: 'Raw Cashews',
          origin: 'Tanzania',
          price: '$6.20/kg',
          trend: '+5%',
          investors: 15,
          completion: 45
        }
      ]);

      setLoading(false);
    }, 2000);
  }, []);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(note => note.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return theme.palette.success.main;
      case 'pending':
        return theme.palette.warning.main;
      case 'failed':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  const renderStatCard = (title, value, subtitle, Icon, color) => (
    <StyledCard>
      <CardContent>
        {loading ? (
          <Skeleton variant="rectangular" height={100} animation="wave" />
        ) : (
          <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <IconWrapper color={color + '20'}>
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
                24h
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Banner */}
      <WelcomeBanner>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back, Admin!
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Your marketplace is performing well today. You have 3 new investment opportunities
              and 5 pending approvals.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                View Analytics
              </Button>
            </Box>
          </Grid>
        </Grid>
      </WelcomeBanner>

      {/* Sticky Notifications */}
      <Box sx={{ mb: 4 }}>
        {notifications.map((notification) => (
          <NotificationBanner
            key={notification.id}
            severity={notification.type}
            action={
              <Stack direction="row" spacing={1}>
                <Button color="inherit" size="small">
                  {notification.action}
                </Button>
                <IconButton
                  size="small"
                  onClick={() => removeNotification(notification.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            }
          >
            <AlertTitle>{notification.title}</AlertTitle>
            {notification.message}
          </NotificationBanner>
        ))}
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Total Trade Volume',
            `${(2458600).toLocaleString()}`,
            '↑ 12.5% this month',
            MonetizationOnOutlinedIcon,
            theme.palette.primary.main
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Active Investments',
            `${84} Projects`,
            '↑ 8.2% from last month',
            AccountBalanceOutlinedIcon,
            theme.palette.success.main
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Verified Producers',
            `${156} Farmers`,
            '↑ 5.1% new verifications',
            AgricultureOutlinedIcon,
            theme.palette.info.main
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Success Rate',
            '98.5%',
            '↑ 2.4% improvement',
            TrendingUpIcon,
            theme.palette.warning.main
          )}
        </Grid>
      </Grid>

      {/* Market Highlights */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Market Highlights
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {marketHighlights.map((highlight, index) => (
          <Grid item xs={12} md={4} key={index}>
            <HighlightCard>
              <Box sx={{
                p: 1,
                borderRadius: '12px',
                backgroundColor: theme.palette.primary.main + '20'
              }}>
                {highlight.trend === 'up' ? (
                  <TrendingUpIcon color="primary" />
                ) : (
                  <WhatshotIcon color="error" />
                )}
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {highlight.title}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {highlight.value}
                </Typography>
                <Typography
                  variant="caption"
                  color={highlight.trend === 'up' ? 'success.main' : 'primary.main'}
                >
                  {highlight.change}
                </Typography>
              </Box>
            </HighlightCard>
          </Grid>
        ))}
      </Grid>

      {/* Trending Products */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Trending Products & Investments
      </Typography>
      <Grid container spacing={3}>
        {trendingProducts.map((product, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main + '20', mr: 2 }}>
                    <LocalOfferIcon color="primary" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Origin: {product.origin}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Market Price
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="bold">
                      {product.price}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'success.main' }}
                    >
                      {product.trend}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Investment Progress
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={product.completion}
                      sx={{
                        flexGrow: 1,
                        height: 8,
                        borderRadius: 4
                      }}
                    />
                    <Typography variant="caption" fontWeight="bold">
                      {product.completion}%
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    size="small"
                    label={`${product.investors} Investors`}
                    sx={{
                      backgroundColor: theme.palette.primary.main + '20',
                      color: theme.palette.primary.main
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: '20px' }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Recent Transactions & Performance Tables */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Recent Transactions */}
        <Grid item xs={12} md={7}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Transactions
                </Typography>
                <Button variant="text" size="small">View All</Button>
              </Box>
              {loading ? (
                <Skeleton variant="rectangular" height={200} />
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Transaction</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Amount</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Payment</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, name: 'Coffee Purchase', amount: '$3,200', payment: 'Stripe', status: 'completed' },
                        { id: 2, name: 'Cocoa Investment', amount: '$5,400', payment: 'Flutterwave', status: 'pending' },
                        { id: 3, name: 'Cashew Order', amount: '$2,800', payment: 'Stripe', status: 'completed' },
                        { id: 4, name: 'Farm Investment', amount: '$8,900', payment: 'Flutterwave', status: 'processing' },
                      ].map((transaction) => (
                        <tr key={transaction.id}>
                          <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="body2" fontWeight="medium">{transaction.name}</Typography>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="body2">{transaction.amount}</Typography>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Chip
                              label={transaction.payment}
                              size="small"
                              sx={{
                                backgroundColor: theme.palette.primary.main + '10',
                                color: theme.palette.primary.main,
                              }}
                            />
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Chip
                              label={transaction.status}
                              size="small"
                              sx={{
                                backgroundColor: getStatusColor(transaction.status) + '20',
                                color: getStatusColor(transaction.status),
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Top Performing Farmers */}
        <Grid item xs={12} md={5}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Top Farmers
                </Typography>
                <Button variant="text" size="small">View All</Button>
              </Box>
              {loading ? (
                <Skeleton variant="rectangular" height={200} />
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Farmer</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Products</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, name: 'John Kamau', location: 'Kenya', products: 'Coffee, Tea', rating: 4.9 },
                        { id: 2, name: 'Aisha Mohammed', location: 'Tanzania', products: 'Cashews', rating: 4.8 },
                        { id: 3, name: 'Kwame Mensah', location: 'Ghana', products: 'Cocoa', rating: 4.7 },
                        { id: 4, name: 'Zara Ibrahim', location: 'Ethiopia', products: 'Coffee', rating: 4.7 },
                      ].map((farmer) => (
                        <tr key={farmer.id}>
                          <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 32, height: 32 }}>
                                {farmer.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight="medium">{farmer.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{farmer.location}</Typography>
                              </Box>
                            </Box>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="body2">{farmer.products}</Typography>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Typography variant="body2" fontWeight="medium">{farmer.rating}</Typography>
                              <Typography variant="caption" color="success.main">★</Typography>
                            </Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}