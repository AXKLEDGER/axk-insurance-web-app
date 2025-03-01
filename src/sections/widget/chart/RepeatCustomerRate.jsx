import { useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import UserRetentionChart from './UserRetentionChart';
import MainCard from 'components/MainCard';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';

// ==============================|| CHART - USER RETENTION RATE ||============================== //

export default function UserRetentionRate() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard>
      {/* Header Section */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="h5">User Retention Rate</Typography>
        <IconButton
          color="secondary"
          id="retention-menu-button"
          aria-controls={open ? 'retention-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ transform: 'rotate(90deg)' }}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id="retention-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'retention-menu-button',
            sx: { p: 1.25, minWidth: 150 }
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
          <ListItemButton onClick={handleClose}>Today</ListItemButton>
          <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
          <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
        </Menu>
      </Stack>

      {/* Metric Display */}
      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">7.89%</Typography>
        <Chip
          color="success"
          variant="filled"
          label="+3.1%"
          size="small"
          sx={{
            bgcolor: 'success.main',
            borderRadius: 1
          }}
        />
      </Stack>

      {/* Chart Section */}
      <UserRetentionChart />
    </MainCard>
  );
}
