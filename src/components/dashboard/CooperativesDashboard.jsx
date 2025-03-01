'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// Import MUI Icons
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const WelcomeBanner = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
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

export default function CooperativeDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: null,
    activeListings: null,
    monthlyRevenue: null,
    totalStock: null,
  });
  const [currentOrders, setCurrentOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalMembers: 45,
        activeListings: 4,
        monthlyRevenue: 28500,
        totalStock: 2500
      });

      setCurrentOrders([
        {
          id: 'ORD-2024-001',
          product: 'Green Coffee Beans',
          quantity: '500 kg',
          value: 2250,
          buyer: 'Kigali Coffee Traders',
          status: 'pending',
          date: '2024-02-21'
        },
        {
          id: 'ORD-2024-002',
          product: 'Dried Coffee Cherries',
          quantity: '300 kg',
          value: 1350,
          buyer: 'Rwanda Exports Ltd',
          status: 'processing',
          date: '2024-02-20'
        },
        {
          id: 'ORD-2024-003',
          product: 'Green Coffee Beans',
          quantity: '800 kg',
          value: 3600,
          buyer: 'Coffee Roasters Co',
          status: 'completed',
          date: '2024-02-19'
        }
      ]);

      setAvailableProducts([
        {
          name: 'Green Coffee Beans',
          available: 1500,
          price: 4.50,
          orders: 3
        },
        {
          name: 'Dried Coffee Cherries',
          available: 1000,
          price: 4.20,
          orders: 2
        }
      ]);

      setNotifications([
        {
          id: 1,
          type: 'warning',
          title: 'Stock Update Needed',
          message: 'Please update available stock for Green Coffee Beans'
        },
        {
          id: 2,
          type: 'success',
          title: 'New Order Received',
          message: 'New order for 500kg of Green Coffee Beans from Kigali Coffee Traders'
        }
      ]);

      setLoading(false);
    }, 2000);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return theme.palette.success.main;
      case 'processing':
        return theme.palette.warning.main;
      case 'pending':
        return theme.palette.info.main;
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
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back, Maraba Coffee Cooperative!
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              You have 2 pending orders to process and 1 stock update needed.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Add Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </WelcomeBanner>

      {/* Notifications */}
      <Box sx={{ mb: 4 }}>
        {notifications.map((notification) => (
          <Alert
            key={notification.id}
            severity={notification.type}
            sx={{ mb: 2, borderRadius: '12px' }}
            action={
              <IconButton
                size="small"
                onClick={() => setNotifications(notifications.filter(n => n.id !== notification.id))}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <AlertTitle>{notification.title}</AlertTitle>
            {notification.message}
          </Alert>
        ))}
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Total Members',
            stats.totalMembers,
            'Active cooperative members',
            PeopleOutlineIcon,
            theme.palette.primary.main
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Active Listings',
            stats.activeListings,
            'Products in marketplace',
            ShoppingCartOutlinedIcon,
            theme.palette.success.main
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Monthly Revenue',
            `$${stats.monthlyRevenue?.toLocaleString()}`,
            'This month',
            MonetizationOnOutlinedIcon,
            theme.palette.info.main
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {renderStatCard(
            'Total Stock',
            `${stats.totalStock} kg`,
            'Available for sale',
            InventoryOutlinedIcon,
            theme.palette.warning.main
          )}
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Current Inventory
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            name: 'Green Coffee (Fully Washed)',
            available: 1500,
            price: 4.50,
            orders: 3,
            grade: 'Grade A'
          },
          {
            name: 'Green Coffee (Semi Washed)',
            available: 800,
            price: 4.20,
            orders: 2,
            grade: 'Grade B'
          }
        ].map((product, index) => (
          <Grid item xs={12} md={6} key={index}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product.grade}
                    </Typography>
                  </Box>
                  <Button variant="outlined" size="small" sx={{ borderRadius: '20px' }}>
                    Update Stock
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Available Stock</Typography>
                  <Typography variant="body2" fontWeight="medium">{product.available.toLocaleString()} kg</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Price per kg</Typography>
                  <Typography variant="body2" fontWeight="medium">${product.price}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Active Orders</Typography>
                  <Typography variant="body2" fontWeight="medium">{product.orders}</Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Current Orders */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Current Orders
      </Typography>
      <StyledCard>
        <CardContent>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Order ID</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Product</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Buyer</th>
                  <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Quantity</th>
                  <th style={{ textAlign: 'right', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Value</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                      <Typography variant="body2" fontWeight="medium">
                        {order.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.date}
                      </Typography>
                    </td>
                    <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                      <Typography variant="body2">{order.product}</Typography>
                    </td>
                    <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                      <Typography variant="body2">{order.buyer}</Typography>
                    </td>
                    <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}`, textAlign: 'right' }}>
                      <Typography variant="body2">{order.quantity}</Typography>
                    </td>
                    <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}`, textAlign: 'right' }}>
                      <Typography variant="body2" fontWeight="medium">
                        ${order.value.toLocaleString()}
                      </Typography>
                    </td>
                    <td style={{ padding: '12px 8px', borderBottom: `1px solid ${theme.palette.divider}`, textAlign: 'center' }}>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(order.status) + '20',
                          color: getStatusColor(order.status),
                          textTransform: 'capitalize'
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
}