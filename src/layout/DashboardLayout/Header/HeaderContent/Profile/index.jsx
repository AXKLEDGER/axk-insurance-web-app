import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

// project-imports
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';
import useUser from 'hooks/useUser';
import { ThemeMode } from 'config';

// assets
import { Setting2, Profile, Logout } from 'iconsax-react';
import userAvatar from 'components/customization/userAvatar';

const roleTextMap = {
  admin: 'Administrator',
  cooperative_member: 'Cooperative Member',
  large_scale_farmer: 'Large Scale Farmer',
  wholesale_trader: 'Wholesale Trader',
  retail_client: 'Retail Client',
};

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      sx={{ p: 1 }}
    >
      {value === index && children}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function ProfilePage() {
  const theme = useTheme();
  const router = useRouter();
  const user = useUser();

  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setSnackbarOpen(true);

    setTimeout(() => {
      // Clear user and token data from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');

      // Redirect to the login page
      router.push('/auth/login');
    }, 1500);
  };

  const openLogoutDialog = () => setConfirmLogoutOpen(true);
  const closeLogoutDialog = () => setConfirmLogoutOpen(false);

  const confirmLogout = () => {
    handleLogout();
    closeLogoutDialog();
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const avatarUrl = user?.profile?.profile_image || userAvatar(user?.profile?.full_name || user?.username);

  const primaryText = user?.full_name || user?.username || 'Guest User';
  const roleKey = user?.role?.toLowerCase();
  const secondaryText = roleTextMap[roleKey] || 'Unknown Role';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Box
          sx={{
            position: 'relative',
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD700, #FFB800, #FFA500)', // Gold gradient
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(255, 215, 0, 0.5)', // Subtle glow
          }}
        >
          <Avatar
            alt={primaryText}
            src={avatarUrl}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.8)',
            }}
          />
        </Box>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250,
                },
                borderRadius: 1.5,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Box
                            sx={{
                              position: 'relative',
                              width: 46,
                              height: 46,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #FFD700, #FFB800, #FFA500)', // Gold gradient
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              overflow: 'hidden',
                              boxShadow: '0 4px 8px rgba(255, 215, 0, 0.5)', // Subtle glow
                              cursor: user?.profile?.profile_image ? 'default' : 'pointer', // Pointer cursor for custom avatar
                              '&:hover': {
                                background: !user?.profile?.profile_image
                                  ? 'linear-gradient(135deg, #FFB800, #FFD700, #FF8C00)' // Subtle change on hover
                                  : undefined,
                              },
                            }}
                            onClick={() => {
                              if (!user?.profile?.profile_image) {
                                const fileInput = document.createElement('input');
                                fileInput.type = 'file';
                                fileInput.accept = 'image/*';
                                fileInput.onchange = (e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      // Save the uploaded image URL to the user object (or backend)
                                      console.log('Uploaded Image URL:', event.target.result);
                                      // You might want to update the user profile with this image here
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                };
                                fileInput.click();
                              }
                            }}
                          >
                            <Avatar
                              alt={primaryText}
                              src={avatarUrl}
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                border: '2px solid rgba(255, 255, 255, 0.8)',
                                position: 'relative',
                                zIndex: 2,
                              }}
                            />
                            {!user?.profile?.profile_image && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  opacity: 0,
                                  transition: 'opacity 0.3s ease',
                                  zIndex: 1,
                                  '&:hover': {
                                    opacity: 1,
                                  },
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  Click to Upload
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          <Stack>
                            <Typography variant="subtitle1">{primaryText}</Typography>
                            <Typography variant="body2" color="secondary">
                              {secondaryText}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" color="error" sx={{ p: 1 }} onClick={openLogoutDialog}>
                            <Logout variant="Bulk" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                        }}
                        icon={<Profile size={18} style={{ marginBottom: 0, marginRight: '10px' }} />}
                        label="Profile"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                        }}
                        icon={<Setting2 size={18} style={{ marginBottom: 0, marginRight: '10px' }} />}
                        label="Setting"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProfileTab handleLogout={handleLogout} />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <SettingTab />
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      <Dialog
        open={confirmLogoutOpen}
        onClose={closeLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
          },
        }}
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
        message={
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircularProgress size={20} />
            <Typography>Logging you out...</Typography>
          </Stack>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
