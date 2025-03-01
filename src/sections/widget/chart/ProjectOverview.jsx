import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';

// Afrikabal imports
import MainCard from 'components/MainCard';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';
import { ThemeMode, ThemeDirection } from 'config';

// assets
import { Add } from 'iconsax-react';

// ==============================|| CHART COMPONENT ||============================== //

function TaskStatusChart({ color, data }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'task-status-chart',
      type: 'area',
      stacked: true,
      sparkline: {
        enabled: true
      },
      offsetX: -20
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      hover: {
        size: 5
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    stroke: { curve: 'smooth', width: 2 },
    tooltip: {
      x: {
        show: false
      }
    },
    grid: {
      show: false
    }
  };

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [color],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [color, mode, primary, secondary, line, theme]);

  const [series] = useState([{ name: 'Status', data }]);

  return <ReactApexChart options={options} series={series} type="area" height={60} />;
}

// ==============================|| AFRIKABAL - PROJECT OVERVIEW ||============================== //

export default function ProjectOverview() {
  const theme = useTheme();
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
        <Typography variant="h5">Afrikabal Project Overview</Typography>
        <IconButton
          color="secondary"
          id="project-menu-button"
          aria-controls={open ? 'project-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ transform: 'rotate(90deg)' }}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id="project-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'project-menu-button',
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

      {/* Metrics Section */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Total Transactions */}
        <Grid item xs={12} sm={6} md={4}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={6}>
              <Stack spacing={0.25}>
                <Typography color="text.secondary">Total Transactions</Typography>
                <Typography variant="h5">120,586</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ ...(theme.direction === ThemeDirection.RTL && { mr: 2 }) }}>
                <TaskStatusChart color={theme.palette.primary.main} data={[15, 40, 20, 70, 10, 60, 30]} />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Pending Approvals */}
        <Grid item xs={12} sm={6} md={4}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Stack spacing={0.25}>
                <Typography color="text.secondary">Pending Approvals</Typography>
                <Typography variant="h5">4,230</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ ...(theme.direction === ThemeDirection.RTL && { mr: 2 }) }}>
                <TaskStatusChart color={theme.palette.error.main} data={[5, 10, 15, 10, 5, 20, 25]} />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Add Project */}
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="contained" startIcon={<Add />} size="large">
            Add Blockchain Project
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}

TaskStatusChart.propTypes = { color: PropTypes.string, data: PropTypes.array };
