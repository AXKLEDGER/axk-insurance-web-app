import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LinearProgress from '@mui/material/LinearProgress';
import ListItemButton from '@mui/material/ListItemButton';

// Afrikabal-specific imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';

// Icons
import { Add, Link1 } from 'iconsax-react';

// =========================|| AFRIKABAL TASK MANAGEMENT ||========================= //

export default function ProjectRelease() {
  return (
    <MainCard title="Afrikabal - Project Tasks">
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>Blockchain Release v2.1.0</Typography>
              <Typography>80%</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={80} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItemButton sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <ListItemIcon>
                <Dot color="warning" />
              </ListItemIcon>
              <ListItemText primary="Smart Contract Deployment" />
              <Chip
                label={
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5, '& svg': { width: 12, height: 12 } }}>
                    <Link1 />4
                  </Typography>
                }
                size="small"
                sx={{ borderRadius: 1 }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Dot color="warning" />
              </ListItemIcon>
              <ListItemText primary="Wallet Integration" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Dot />
              </ListItemIcon>
              <ListItemText primary="Token Minting Enhancements" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Dot color="success" />
              </ListItemIcon>
              <ListItemText primary="Blockchain API Improvements" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" startIcon={<Add />}>
            Add New Task
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
