import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// project-imports
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';

import { DRAWER_WIDTH } from 'config';

export default function MainDrawer({ window, drawerOpen, toggleDrawer }) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawerContent = useMemo(() => <DrawerContent drawerOpen={drawerOpen} />, [drawerOpen]);

  const handleClickAway = (event) => {
    const drawerElement = document.querySelector('.MuiDrawer-paper');
    if (drawerElement && drawerElement.contains(event.target)) {
      return;
    }

    if (downLG && drawerOpen) {
      console.log('ClickAwayListener triggered: Closing Drawer');
      !drawerOpen
    }
  };

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!downLG ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          <DrawerHeader open={drawerOpen} />
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Drawer
            container={container}
            variant="temporary"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: drawerOpen ? 'block' : 'none', lg: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                borderRight: `1px solid ${theme.palette.divider}`,
                backgroundImage: 'none',
                boxShadow: 'inherit',
              },
            }}
          >
            <DrawerHeader open={drawerOpen} />
            <Box onClick={(e) => e.stopPropagation()}>{drawerContent}</Box>
          </Drawer>
        </ClickAwayListener>
      )}
    </Box>
  );
}

MainDrawer.propTypes = {
  window: PropTypes.func,
  drawerOpen: PropTypes.bool.isRequired,
};
