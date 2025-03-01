'use client';
import PropTypes from 'prop-types';

import { useEffect, useRef } from 'react';

// next
import { usePathname } from 'next/navigation';

// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import ProfileCard from 'components/user/ProfileCard';
import ProfileTabs from 'components/user/ProfileTabs';
import TabPersonal from 'components/user/TabPersonal';
import TabPayment from 'components/user/TabPayment';
import TabPassword from 'components/user/TabPassword';
import TabSettings from 'components/user/TabSettings';

// ==============================|| PROFILE - USER ||============================== //

export default function UserProfile({ tab }) {
  const inputRef = useRef(null);
  const pathname = usePathname();

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const roleMap = {
    retail_client: 'RETAIL_CLIENT',
    wholesale_trader: 'WHOLESALE_TRADER',
    cooperative_member: 'COOPERATIVE_MEMBER',
    large_scale_farmer: 'LARGE_SCALE_FARMER',
    admin: 'ADMIN'
  };

  useEffect(() => {
    console.log('User Profile Loaded:', pathname);
    // Ensure active item logic is handled locally if needed
  }, [pathname]);

  const userRoleKey = JSON.parse(localStorage.getItem('user'))?.role || '';
  // console.log("Role key", userRoleKey)
  const role = Object.keys(roleMap).find((key) => roleMap[key] === userRoleKey) || userRoleKey;
  // console.log("User Role", role)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProfileCard focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={3}>
        <ProfileTabs focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={9}>
        {tab === 'personal' && <TabPersonal />}
        {tab === 'wallet' && <TabPayment />}
        {tab === 'password' && <TabPassword />}
        {tab === 'settings' && <TabSettings role={role} />}
      </Grid>
    </Grid>
  );
}

UserProfile.propTypes = { tab: PropTypes.string };
