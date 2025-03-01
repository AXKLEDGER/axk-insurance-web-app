import { useEffect, useState } from 'react';

// next
import { usePathname, useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// assets
import { CardCoin, Lock, Profile, Setting3 } from 'iconsax-react';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case '/retail-portal/profile/personal':
      selectedTab = 0;
      break;
    case '/retail-portal/profile/wallet':
      selectedTab = 1;
      break;
    case '/retail-portal/profile/password':
      selectedTab = 2;
      break;
    case '/retail-portal/profile/settings':
      selectedTab = 3;
      break;
    default:
      selectedTab = 0;
  }
  console.log(`getPathIndex: Resolved path "${pathname}" to tab index ${selectedTab}`);
  return selectedTab;
}

// ==============================|| USER PROFILE - BASIC ||============================== //

export default function ProfileTab() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname || '/'));
  const handleListItemClick = (index, route) => {
    console.log(`handleListItemClick: Clicked on index ${index}, route "${route}"`);
    setSelectedIndex(index);
    router.push(route);
  };

  useEffect(() => {
    const resolvedIndex = getPathIndex(pathname || '/');
    console.log(`useEffect: Pathname changed to "${pathname}", setting selectedIndex to ${resolvedIndex}`);
    setSelectedIndex(resolvedIndex);
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.secondary.main } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/retail-portal/profile/personal')}>
        <ListItemIcon>
          <Profile size={18} />
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, '/retail-portal/profile/wallet')}>
        <ListItemIcon>
          <CardCoin size={18} />
        </ListItemIcon>
        <ListItemText primary="Wallet" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2, '/retail-portal/profile/password')}>
        <ListItemIcon>
          <Lock size={18} />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3, '/retail-portal/profile/settings')}>
        <ListItemIcon>
          <Setting3 size={18} />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </List>
  );
}
