'use client';

import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';
import { ThemeMode } from 'config';

// assets
import { ArrowUp } from 'iconsax-react';

// chart options for Afrikabal
const pieChartOptions = {
  chart: {
    type: 'donut',
    height: 320
  },
  labels: ['Onramp Transactions', 'Offramp Transactions', 'Token Sales', 'Rewards'],
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  }
};

// ==============================|| DONUT CHART ||============================== //

function AfrikabalDonutChart() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const mode = theme.palette.mode;
  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const backColor = theme.palette.background.paper;

  const [series] = useState([40, 30, 20, 10]); // Replace with dynamic Afrikabal data if needed
  const [options, setOptions] = useState(pieChartOptions);

  useEffect(() => {
    const primaryMain = theme.palette.primary.main;
    const warning = theme.palette.warning.main;
    const success = theme.palette.success.main;
    const info = theme.palette.info.main;

    setOptions((prevState) => ({
      ...prevState,
      colors: [primaryMain, warning, success, info],
      xaxis: {
        labels: {
          style: { colors: Array(7).fill(primary) }
        }
      },
      yaxis: {
        labels: {
          style: { colors: [primary] }
        }
      },
      grid: {
        borderColor: line
      },
      stroke: {
        colors: [backColor]
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, line, backColor, theme]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      width={downSM ? 280 : 320}
      height={downSM ? 280 : 320}
      id="afrikabal-donut-chart"
    />
  );
}

// ==============================|| TOTAL INCOME CARD ||============================== //

export default function TotalIncome() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const incomeDetails = [
    {
      label: 'Onramp Transactions',
      value: '$45,678',
      change: '+$5,432',
      dotColor: 'primary.main'
    },
    {
      label: 'Offramp Transactions',
      value: '$30,123',
      change: '+$2,300',
      dotColor: 'warning.main'
    },
    {
      label: 'Token Sales',
      value: '$15,567',
      change: '+$1,200',
      dotColor: 'success.main'
    },
    {
      label: 'Rewards',
      value: '$8,432',
      change: '+$800',
      dotColor: 'info.main'
    }
  ];

  return (
    <MainCard>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">Total Blockchain Income</Typography>
            <IconButton
              color="secondary"
              id="income-menu-button"
              aria-controls={open ? 'income-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="income-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'income-menu-button',
                sx: { p: 1.25, minWidth: 150 }
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <ListItemButton onClick={handleClose}>Today</ListItemButton>
              <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
              <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
            </Menu>
          </Stack>
        </Grid>

        {/* Donut Chart */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <AfrikabalDonutChart />
          </Stack>
        </Grid>

        {/* Income Details */}
        {incomeDetails.map(({ label, value, change, dotColor }, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
              <Stack alignItems="flex-start" sx={{ p: 2 }} spacing={0.5}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Dot componentDiv sx={{ bgcolor: dotColor }} />
                  <Typography>{label}</Typography>
                </Stack>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {value}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.25 }}
                  >
                    <ArrowUp size={14} /> {change}
                  </Typography>
                </Typography>
              </Stack>
            </MainCard>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
}
