import { Fragment, useState, useEffect } from 'react';
import useConfig from 'hooks/useConfig';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import { adminMenu, regularUserMenu, wholesaleTraderMenu, cooperativeMenu, largeScaleFarmerMenu } from 'menu-items/menus';
import { HORIZONTAL_MAX_ITEM, MenuOrientation } from 'config';
import useUser from 'hooks/useUser';

export default function Navigation({ drawerOpen }) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const user = useUser();

  const roleBasedMenu = {
    admin: adminMenu,
    retail_client: regularUserMenu,
    wholesale_trader: wholesaleTraderMenu,
    cooperative_member: cooperativeMenu,
    large_scale_farmer: largeScaleFarmerMenu,
  };

  const userRole = user?.role?.toLowerCase();

  // Always call hooks
  const [selectedID, setSelectedID] = useState('');
  const [selectedItems, setSelectedItems] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const isHorizontal = useConfig().menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // Guard against invalid userRole or menu
  if (!userRole || !roleBasedMenu[userRole]) {
    return null;
  }

  const menuItems = roleBasedMenu[userRole];

  // Apply HORIZONTAL_MAX_ITEM limit if in horizontal mode
  const limitedMenuItems = isHorizontal
    ? menuItems.slice(0, HORIZONTAL_MAX_ITEM) // Limit menu items for horizontal layout
    : menuItems;

  const navGroups = limitedMenuItems.map((item) => {
    switch (item.type) {
      case 'group':
        if (item.url) {
          return (
            <Fragment key={item.id}>
              {!isHorizontal && <Divider sx={{ my: 0.5 }} />}
              <NavItem
                item={item}
                level={1}
                setSelectedID={() => setSelectedID('')}
                drawerOpen={drawerOpen}
              />
            </Fragment>
          );
        }

        return (
          <Fragment key={item.id}>
            {!isHorizontal && <Divider sx={{ my: 0.5 }} />}
            <NavGroup
              key={item.id}
              item={item}
              selectedID={selectedID}
              setSelectedID={setSelectedID}
              setSelectedItems={setSelectedItems}
              setSelectedLevel={setSelectedLevel}
              selectedLevel={selectedLevel}
              selectedItems={selectedItems}
              drawerOpen={drawerOpen}
            />
          </Fragment>
        );

      case 'item':
        return (
          <Fragment key={item.id}>
            {!isHorizontal && <Divider sx={{ my: 0.5 }} />}
            <NavItem
              item={item}
              level={1}
              setSelectedID={() => setSelectedID('')}
              drawerOpen={drawerOpen}
            />
          </Fragment>
        );

      default:
        return (
          <Fragment key={item.id || `unknown-${Math.random()}`}>
            {!isHorizontal && <Divider sx={{ my: 0.5 }} />}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary" align="center">
                Section unavailable
              </Typography>
              <Typography variant="caption" color="textSecondary" align="center">
                Contact support if this persists.
              </Typography>
            </Box>
          </Fragment>
        );
    }
  });

  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block',
        alignItems: 'center',
      }}
    >
      {navGroups}
    </Box>
  );
}
