import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project-imports
import AuthCard from './AuthCard';

// assets
import AuthBackground from '../../../public/assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <AuthBackground />
      <Box
        sx={{
          width: {
            xs: '90%', // 90% width on small screens
            sm: '80%', // 80% width on medium screens
            md: '70%', // 70% width on large screens
            lg: '60%'  // 60% width on extra-large screens
          },
          maxWidth: 600, // Limit max width
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 50px)'
        }}
      >
        <AuthCard>{children}</AuthCard>
      </Box>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
