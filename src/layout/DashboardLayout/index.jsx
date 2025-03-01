'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// project-imports
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import AddCustomer from 'sections/apps/customer/AddCustomer';

import { DRAWER_WIDTH, MenuOrientation } from 'config';
import useUser from 'hooks/useUser';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const downXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  // Local state for drawer management
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [miniDrawer, setMiniDrawer] = useState(true);
  const [menuOrientation, setMenuOrientation] = useState(MenuOrientation.VERTICAL);
  const [kycStatus, setKycStatus] = useState(null);
  const [showSupportEmail, setShowSupportEmail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;
  const user = useUser();

  useEffect(() => {
    if (user?.kyc_status) {
      setKycStatus(user.kyc_status);
    }
  }, [user]);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => {
      const newState = !prev;
      // console.log(`Drawer toggled: ${newState ? 'Open' : 'Closed'}`);
      return newState;
    });
  };

  // useEffect(() => {
  //   console.log(`Drawer state changed: ${drawerOpen ? 'Open' : 'Closed'}`);
  // }, [drawerOpen]);

  // Set media-wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      setMiniDrawer(!downXL);
    }
  }, [downXL, miniDrawer]);

  const [menuMasterLoading, setMenuMasterLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMenuMasterLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (menuMasterLoading) return <Loader />;

  const renderKycOverlay = () => {
    switch (kycStatus) {
      case 'Pending':
        return (
          <Overlay
            title="🚦 Verification in Progress"
            message="Your account is currently under review. Once approved, you’ll have full access to all features. Thank you for your patience."
            actionText="Contact Support"
            actionHref="mailto:support@afrikabal.org"
          />
        );
      case 'Rejected':
        return (
          <Overlay
            title="⚠️ Verification Issue"
            message="Your verification was not successful. Please reach out to our support team to resolve the issue. We’re here to help you!"
            actionText="Contact Support"
            actionHref="mailto:support@afrikabal.org"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', position: 'relative' }}>
      <Header drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      {!isHorizontal ? <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} /> : <HorizontalBar />}

      <Box
        component="main"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          flexGrow: 1,
          p: { xs: 1, sm: 3 }
        }}
      >
        <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit', mb: isHorizontal ? 2 : 'inherit' }} />
        <Container
          maxWidth={miniDrawer ? 'xl' : false}
          sx={{
            ...(miniDrawer && { px: { xs: 0, sm: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 124px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Breadcrumbs />
          {children}
          <Footer />
        </Container>
      </Box>
      <AddCustomer />

      {kycStatus && kycStatus !== 'Approved' && renderKycOverlay()}
    </Box>
  );
}

DashboardLayout.propTypes = { children: PropTypes.node };

// Reusable Overlay Component
function Overlay({ title, message, actionText, actionHref }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: '24px 32px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          maxWidth: '480px',
          width: '90%',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.error.main,
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            marginBottom: '16px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            marginBottom: '16px',
          }}
        >
          {message}
        </Typography>
        <Box
          component="a"
          href={actionHref}
          sx={{
            display: 'inline-block',
            textDecoration: 'none',
            padding: '10px 22px',
            borderRadius: '12px',
            fontSize: '12px',
            backgroundColor: '#2aa1af',
            color: theme.palette.common.white,
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#B2DF8A',
              transform: 'translateY(-3px)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              transform: 'scale(0)',
              opacity: 0,
              pointerEvents: 'none',
              animation: 'ripple 0.6s ease-out',
            },
            '@keyframes ripple': {
              '0%': { transform: 'scale(0)', opacity: 1 },
              '100%': { transform: 'scale(4)', opacity: 0 },
            },
          }}
        >
          {actionText}
        </Box>
      </Box>
    </Box>
  );
}

Overlay.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  actionHref: PropTypes.string.isRequired,
};
