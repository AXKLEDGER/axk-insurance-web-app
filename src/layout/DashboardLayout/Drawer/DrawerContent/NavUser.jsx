'use client';
import { useState } from 'react';

// next
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// project-imports
import Avatar from 'components/@extended/Avatar';

// assets
import { ArrowRight2 } from 'iconsax-react';

const generateAvatar = (name) =>
  `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
    name || 'User'
  )}&backgroundColor=A1D36C&fontColor=ffffff&radius=50&size=128&fontWeight=700`;

const roleTextMap = {
  admin: 'Administrator',
  cooperative_member: 'Cooperative Member',
  large_scale_farmer: 'Large Scale Farmer',
  wholesale_trader: 'Wholesale Trader',
  retail_client: 'Retail Client',
};

const ExpandMore = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'theme' && prop !== 'expand' && prop !== 'drawerOpen' })(
  ({ theme, expand, drawerOpen }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(-90deg)',
    marginLeft: 'auto',
    color: theme.palette.secondary.dark,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    ...(!drawerOpen && {
      opacity: 0,
      width: 50,
      height: 50,
    }),
  })
);

// ==============================|| LIST - USER ||============================== //

export default function UserList({ user, drawerOpen }) {
  const theme = useTheme();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const open = Boolean(anchorEl);

  const openLogoutDialog = () => setConfirmLogoutOpen(true);
  const closeLogoutDialog = () => setConfirmLogoutOpen(false);

  const handleLogout = () => {
    // Clear user and token data from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    // Redirect to the login page
    router.push('/auth/login');
  };

  const confirmLogout = () => {
    handleLogout();
    closeLogoutDialog();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatarUrl = user?.image || generateAvatar(user?.profile?.full_name || user?.username);

  const primaryText = user?.full_name || user?.username || 'Guest User';
  const roleKey = user?.role?.toLowerCase();
  const secondaryText = roleTextMap[roleKey] || 'Unknown Role';

  return (
    <Box
      sx={{
        p: 1.25,
        px: !drawerOpen ? 1.25 : 3,
        borderTop: '2px solid ',
        borderTopColor: 'divider',
        position: 'absolute', // Sticks the UserList to the bottom of the parent
        bottom: 0,
        width: '100%',
        background: theme.palette.background.default, // To maintain background consistency
        zIndex: 10,
      }}
    >
      <List disablePadding>
        <ListItem
          disablePadding
          secondaryAction={
            <ExpandMore
              sx={{ svg: { height: 20, width: 20 } }}
              theme={theme}
              expand={open}
              drawerOpen={drawerOpen}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              aria-label="show more"
            >
              <ArrowRight2 style={{ fontSize: '0.625rem' }} />
            </ExpandMore>
          }
          sx={{
            ...(!drawerOpen && { display: 'flex', justifyContent: 'flex-end' }),
            '& .MuiListItemSecondaryAction-root': { right: !drawerOpen ? 16 : -16 },
          }}
        >
          <ListItemAvatar>
            <Box
              sx={{
                position: 'relative',
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD700, #FFB800, #FFA500)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(255, 215, 0, 0.5)',
                marginRight: drawerOpen ? '16px' : '0',
                flexShrink: 0, // Prevent resizing when space is constrained
              }}
            >
              {/* Glitter Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '150%',
                  height: '150%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 10%, transparent 70%)',
                  opacity: 0.6,
                  animation: 'glitter 2s infinite linear',
                  zIndex: 1,
                }}
              />

              {/* Glimmering Lines */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 60%)',
                  opacity: 0.5,
                  animation: 'shine 2s infinite ease-in-out',
                  zIndex: 2,
                }}
              />

              {/* Avatar */}
              <Avatar
                alt={primaryText}
                src={avatarUrl}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  position: 'relative',
                  zIndex: 3,
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                }}
              />

              {/* My Glitter and Shine Animations */}
              <style jsx global>
                {`
                  @keyframes glitter {
                    0% {
                      background-position: 0% 0%;
                    }
                    100% {
                      background-position: 100% 100%;
                    }
                  }
                  @keyframes shine {
                    0% {
                      transform: translateX(-100%);
                    }
                    50% {
                      transform: translateX(50%);
                    }
                    100% {
                      transform: translateX(200%);
                    }
                  }
                `}
              </style>
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary={primaryText}
            sx={{ ...(!drawerOpen && { display: 'none' }) }}
            secondary={secondaryText}
          />
        </ListItem>
      </List>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem onClick={openLogoutDialog}>Logout</MenuItem>
        <MenuItem component={Link} href="/apps/profiles/user/personal" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} href="/apps/profiles/account/my-account" onClick={handleClose}>
          My account
        </MenuItem>
      </Menu>

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
    </Box>
  );
}
