import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// project-imports
import NavUser from './NavUser';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { Box } from '@mui/material';
import useUser from 'hooks/useUser';
import NavCard from './NavCard';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent({ drawerOpen }) {
  const theme = useTheme();
  const user = useUser();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        pb: 4,
      }}
    >
      <SimpleBar
        sx={{
          '& .simplebar-content': { display: 'flex', flexDirection: 'column', flexGrow: 1 },
        }}
      >
        <Navigation drawerOpen={drawerOpen} />
      </SimpleBar>
      <Box sx={{ mb: 6 }}>
        {drawerOpen && !matchDownMD && <NavCard />}
      </Box>
      <NavUser user={user} drawerOpen={drawerOpen} />
    </Box>
  );
}

DrawerContent.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
};
