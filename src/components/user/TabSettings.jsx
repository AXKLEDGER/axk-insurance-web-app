// Customized Settings Component for Afrikabal with Role-Specific Settings

'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { DocumentLike, Sms, Translate, Profile2User, Setting2, Activity, MessageNotif, Gift, Login } from 'iconsax-react';

// Master list of all settings
const allSettings = [
  {
    key: 'oc',
    label: 'Order Confirmation',
    description: 'Receive notifications when a new order is placed.',
    icon: <DocumentLike style={{ fontSize: '1.5rem' }} />,
  },
  {
    key: 'usn',
    label: 'System Notifications',
    description: 'Receive updates and alerts about system activities.',
    icon: <Sms style={{ fontSize: '1.5rem' }} />,
  },
  {
    key: 'lc',
    label: 'Language Change',
    description: 'Choose your preferred language for Afrikabal.',
    icon: <Translate style={{ fontSize: '1.5rem' }} />,
  },
  {
    key: 'mm',
    label: 'Manage Members',
    description: 'Enable or disable member management tools.',
    icon: <Profile2User style={{ fontSize: '1.5rem' }} />,
  },
  {
    key: 'su',
    label: 'System Upgrades',
    description: 'Be notified about upcoming system updates.',
    icon: <Setting2 style={{ fontSize: '1.5rem' }} />,
  },
  {
    key: 'bt',
    label: 'Beta Testing Notifications',
    description: 'Join our beta testing program and get early updates.',
    icon: <Activity style={{ fontSize: '1.5rem' }} />,
  },
  {
    key: 'nl',
    label: 'Newsletters',
    description: 'Receive regular updates and news.',
    icon: <MessageNotif style={{ fontSize: '1.5rem' }} />,
  },
  {
    key: 'pe',
    label: 'Promotional Emails',
    description: 'Stay updated on our latest offers and promotions.',
    icon: <Gift style={{ fontSize: '1.5rem' }} />,
  },
  {
    key: 'mla',
    label: 'Multi-Device Login Alerts',
    description: 'Get alerts when your account is logged in on multiple devices.',
    icon: <Login style={{ fontSize: '1.5rem' }} />,
  },
];

// Role-based default settings
const roleSettings = {
  admin: ['oc', 'usn', 'lc', 'mm', 'su', 'bt', 'mla', 'pe'],
  cooperative_member: ['oc', 'lc', 'nl', 'la'],
  large_scale_farmer: ['usn', 'lc', 'oc', 'su', 'nl'],
  wholesale_trader: ['oc', 'usn', 'pe', 'bt'],
  retail_client: ['lc', 'nl', 'pe', 'mla'],
};

export default function TabSettings({ role }) {
  const [checked, setChecked] = useState(roleSettings[role]);
  const [initialChecked, setInitialChecked] = useState([...roleSettings[role]]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const theme = useTheme();

  // console.log("Received role", role)

  const handleToggle = (value) => () => {
    setChecked((prevChecked) => {
      const currentIndex = prevChecked.indexOf(value);
      const newChecked = [...prevChecked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      return newChecked;
    });
  };

  const isSettingsChanged = () => {
    const sortedChecked = [...checked].sort();
    const sortedInitialChecked = [...initialChecked].sort();
    return JSON.stringify(sortedChecked) !== JSON.stringify(sortedInitialChecked);
  };

  const handleSave = () => {
    setInitialChecked(checked);
    setConfirmDialogOpen(false);

    const payload = { role, settings: checked };
    console.log('Updated settings:', payload);
    // Call API to save the settings if necessary
  };

  return (
    <>
      <MainCard
        title={
          <>
            System Settings -{' '}
            <span style={{ color: theme.palette.primary.main }}>
              {role
                .replace(/_/g, ' ')
                .toLowerCase()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </span>
          </>
        }
      >
        <List sx={{ '& .MuiListItem-root': { p: 2 } }}>
          {allSettings.map((setting) => (
            <ListItem key={setting.key} divider>
              <ListItemIcon sx={{ color: 'primary.main', mr: 2, display: { xs: 'none', sm: 'block' } }}>
                {setting.icon}
              </ListItemIcon>
              <ListItemText
                id={`switch-list-label-${setting.key}`}
                primary={<Typography variant="h5">{setting.label}</Typography>}
                secondary={setting.description}
              />
              <Switch
                edge="end"
                onChange={handleToggle(setting.key)}
                checked={checked.includes(setting.key)}
                inputProps={{ 'aria-labelledby': `switch-list-label-${setting.key}` }}
              />
            </ListItem>
          ))}
        </List>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setChecked(initialChecked)}
            disabled={!isSettingsChanged()}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() => setConfirmDialogOpen(true)}
            disabled={!isSettingsChanged()}
          >
            Save
          </Button>
        </Stack>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          PaperProps={{
            sx: {
              p: 2,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.5rem', color: theme.palette.primary.main }}>
            Confirm Changes
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', mt: 1 }}>
            <DialogContentText sx={{ fontSize: '1rem', color: theme.palette.text.secondary }}>
              Are you sure you want to save the changes to your settings? These changes will be applied immediately.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
            <Button
              onClick={() => setConfirmDialogOpen(false)}
              variant="outlined"
              color="secondary"
              sx={{
                px: 3,
                py: 1,
                fontSize: '0.9rem',
                borderRadius: '20px',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={{
                px: 3,
                py: 1,
                fontSize: '0.9rem',
                borderRadius: '20px',
                boxShadow: '0px 4px 12px rgba(0, 123, 255, 0.3)',
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </MainCard >
    </>
  );
}

TabSettings.propTypes = {
  role: PropTypes.string.isRequired,
};