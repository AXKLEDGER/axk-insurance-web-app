import { useMemo } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project-imports
import Message from './Message';
import Profile from './Profile';
import FullScreen from './FullScreen';
import Localization from './Localization';
import Notification from './Notification';
import MobileSection from './MobileSection';
import MegaMenuSection from './MegaMenuSection';
import Search from './Search';

import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/DashboardLayout/Drawer/DrawerHeader';
import { MenuOrientation } from 'config';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { i18n, menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localization = useMemo(() => <Localization />, [i18n]);

  const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Search />}
      {/* {!downLG && megaMenu} */}
      {/* {!downLG && localization} */}
      <Notification />
      {!downLG && <FullScreen />}
      {/* <Message /> */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </Box>
  );
}
