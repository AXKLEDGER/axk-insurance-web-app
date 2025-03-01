'use client';

import { useState, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import { InfoCircle } from 'iconsax-react';

// Our plans
const plans = [
  {
    active: true,
    title: 'Starter',
    description: 'Access basic marketplace features',
    price: 29,
    permission: [0, 1, 2],
  },
  {
    active: false,
    title: 'Pro',
    description: 'Unlock advanced tools for scaling',
    price: 99,
    permission: [0, 1, 2, 3, 4],
  },
  {
    active: false,
    title: 'Elite',
    description: 'All-in-one package for enterprises',
    price: 499,
    permission: [0, 1, 2, 3, 4, 5, 6],
  },
];

const planList = [
  'Access Afrikabal Marketplace', // 0
  'Tokenized Asset Management', // 1
  'Basic Wallet Services', // 2
  'Advanced Wallet Analytics', // 3
  'Priority Support', // 4
  'Bulk Produce Traceability', // 5
  'Custom Marketplace Solutions', // 6
];

// ==============================|| PRICING ||============================== //

export default function Pricing() {
  const theme = useTheme();
  const [timePeriod, setTimePeriod] = useState(true);

  const priceListDisable = {
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const priceActivePlan = {
    padding: 3,
    borderRadius: 1,
    bgcolor: alpha(theme.palette.primary.main, 0.1),
  };

  const price = {
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: 1,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert
          color="info"
          variant="outlined"
          icon={<InfoCircle variant="Bold" />}
          sx={{ backgroundColor: alpha(theme.palette.info.lighter, 0.15) }}
        >
          <AlertTitle sx={{ fontWeight: 500, color: 'info.dark' }}>Important</AlertTitle>
          <Typography variant="h6">
            These plans are tailored to provide the best value for Afrikabal users. For more details, visit our official
            <Link
              color="info.dark"
              sx={{ textDecoration: 'none', ml: 0.5 }}
              variant="subtitle1"
              target="_blank"
              href="https://afrikabal.org/pricing"
            >
              pricing page
            </Link>
          </Typography>
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
          <Stack spacing={0}>
            <Typography variant="h5">Empowering farmers and businesses with innovative tools</Typography>
            <Typography color="text.secondary">Choose a plan that works best for your growth journey.</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="subtitle1" color={timePeriod ? 'text.secondary' : 'text.primary'}>
              Billed Yearly
            </Typography>
            <Switch
              checked={timePeriod}
              onChange={() => setTimePeriod(!timePeriod)}
              inputProps={{ 'aria-label': 'billing-period' }}
            />
            <Typography variant="subtitle1" color={timePeriod ? 'text.primary' : 'text.secondary'}>
              Billed Monthly
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item container spacing={3} xs={12} alignItems="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={plan.active ? priceActivePlan : { padding: 3 }}>
                    <Grid container spacing={3}>
                      {plan.active && (
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                          <Chip label="Most Popular" color="primary" />
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Stack spacing={0} textAlign="center">
                          <Typography variant="h4">{plan.title}</Typography>
                          <Typography>{plan.description}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={0} alignItems="center">
                          {timePeriod ? (
                            <Typography variant="h2" sx={price}>
                              ${plan.price}
                            </Typography>
                          ) : (
                            <Typography variant="h2" sx={price}>
                              ${plan.price * 12 - 50}
                            </Typography>
                          )}
                          <Typography variant="h6" color="text.secondary">
                            {timePeriod ? 'Yearly' : 'Monthly'}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          color={plan.active ? 'primary' : 'secondary'}
                          variant={plan.active ? 'contained' : 'outlined'}
                          fullWidth
                        >
                          Subscribe Now
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <List
                    sx={{
                      m: 0,
                      p: 0,
                      '& > li': {
                        px: 0,
                        py: 0.625,
                      },
                    }}
                    component="ul"
                  >
                    {planList.map((list, i) => (
                      <Fragment key={i}>
                        <ListItem sx={!plan.permission.includes(i) ? priceListDisable : {}}>
                          <ListItemText primary={list} sx={{ textAlign: 'center' }} />
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
