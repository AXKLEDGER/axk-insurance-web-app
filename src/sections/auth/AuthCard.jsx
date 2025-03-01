import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD ||============================== //

export default function AuthCard({ children, ...other }) {
  return (
    <MainCard
      sx={{
        width: '100%', // Fill the available width from its container
        mx: 'auto', // Center horizontally within its container
        margin: { xs: 2.5, md: 3 },
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%'
        }
      }}
      content={false}
      {...other}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4, xl: 5 },
        }}
      >
        {children}
      </Box>
    </MainCard>
  );
}

AuthCard.propTypes = { children: PropTypes.any, other: PropTypes.any };
