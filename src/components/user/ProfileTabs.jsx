import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// next
import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import ProfileTab from './ProfileTab';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';
import { facebookColor, linkedInColor } from 'config';
import { ThemeMode } from 'config';
import useUser from 'hooks/useUser';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// assets
import { Apple, Camera, Facebook, Google } from 'iconsax-react';


const generateAvatar = (name) =>
  `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
    name || 'User'
  )}&backgroundColor=A1D36C&fontColor=ffffff&radius=50&size=128&fontWeight=700`;

const avatarImage = '/assets/images/users';

const roleTextMap = {
  admin: 'Administrator',
  cooperative_member: 'Cooperative Member',
  large_scale_farmer: 'Large Scale Farmer',
  wholesale_trader: 'Wholesale Trader',
  retail_client: 'Retail Client',
};

export default function ProfileTabs({ focusInput }) {
  const theme = useTheme();
  const user = useUser();

  const primaryText = user?.full_name || user?.username || 'Guest User';
  const roleKey = user?.role?.toLowerCase();
  const secondaryText = roleTextMap[roleKey] || 'Unknown Role';
  const avatarUrl = user?.image || generateAvatar(user?.profile?.full_name || user?.username);

  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(`${avatarImage}/default.png`);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              variant="light"
              color="secondary"
              id="basic-button"
              sx={{ transform: 'rotate(90deg)' }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem
                component={Link}
                href="/apps/profiles/user/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Delete
              </MenuItem>
            </Menu>
          </Stack>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avatar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer',
              }}
            >
              <ListItemAvatar>
                <Box
                  sx={{
                    position: 'relative',
                    width: 124,
                    height: 124,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFD700, #FFB800, #FFA500)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(255, 215, 0, 0.5)',
                    flexShrink: 0, // Prevent resizing
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
                  <style jsx global>
                    {`
                @keyframes glitter {
                  0% { background-position: 0% 0%; }
                  100% { background-position: 100% 100%; }
                }
                @keyframes shine {
                  0% { transform: translateX(-100%); }
                  50% { transform: translateX(50%); }
                  100% { transform: translateX(200%); }
                }
              `}
                  </style>
                </Box>
              </ListItemAvatar>
              {/* Hover Overlay */}
              {/* <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.3s ease',
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                </Stack>
              </Box> */}
            </FormLabel>
            <TextField
              type="file"
              id="change-avatar"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e) => setSelectedImage(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{primaryText}</Typography>
              <Typography color="secondary">{secondaryText}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        {/* <Grid item xs={12} sm={6} md={12}>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">86</Typography>
              <Typography color="secondary">Post</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">40</Typography>
              <Typography color="secondary">Project</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">4.5K</Typography>
              <Typography color="secondary">Members</Typography>
            </Stack>
          </Stack>
        </Grid> */}
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
}

ProfileTabs.propTypes = { focusInput: PropTypes.func };
