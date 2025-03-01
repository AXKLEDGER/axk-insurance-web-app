'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';

// Material-UI components
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';

// Afrikabal custom components
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

// Afrikabal assets/icons
import { ArrowDown, ArrowSwapHorizontal, ArrowUp } from 'iconsax-react';

// Accessible tab panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tab-panel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-panel-${index}`
  };
}

export default function BlockchainTransactions() {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event, newValue) => setValue(newValue);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const menuOpen = Boolean(anchorEl);

  return (
    <MainCard content={false}>
      {/* Header Section */}
      <Box sx={{ p: 3, pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="h5">Blockchain Transactions</Typography>
          <IconButton
            color="secondary"
            id="transaction-menu-button"
            aria-controls={menuOpen ? 'transaction-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleMenuClick}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="transaction-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'transaction-menu-button',
              sx: { p: 1.25, minWidth: 150 }
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <ListItemButton onClick={handleMenuClose}>Today</ListItemButton>
            <ListItemButton onClick={handleMenuClose}>Weekly</ListItemButton>
            <ListItemButton onClick={handleMenuClose}>Monthly</ListItemButton>
          </Menu>
        </Stack>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="transaction tabs" sx={{ px: 3 }}>
            <Tab label="All Transactions" {...a11yProps(0)} />
            <Tab label="Onramp" {...a11yProps(1)} />
            <Tab label="Offramp" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TransactionList transactions={mockBlockchainTransactions} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TransactionList transactions={mockBlockchainTransactions.filter((t) => t.type === 'onramp')} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TransactionList transactions={mockBlockchainTransactions.filter((t) => t.type === 'offramp')} />
        </TabPanel>
        <ActionButtons />
      </Box>
    </MainCard>
  );
}

function TransactionList({ transactions }) {
  return (
    <List disablePadding sx={{ '& .MuiListItem-root': { px: 3, py: 1.5 } }}>
      {transactions.map(({ id, hash, type, status, amount, timestamp, icon, color }) => (
        <ListItem
          key={id}
          divider
          secondaryAction={
            <Stack spacing={0.25} alignItems="flex-end">
              <Typography variant="subtitle1">{amount}</Typography>
              <Typography color={color} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {icon} {status}
              </Typography>
            </Stack>
          }
        >
          <ListItemAvatar>
            <Avatar variant="rounded" color="secondary" sx={{ fontWeight: 600 }}>
              {type === 'onramp' ? 'O' : 'F'}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1">{type === 'onramp' ? 'Onramp' : 'Offramp'} Transaction</Typography>}
            secondary={
              <>
                <Typography variant="caption" color="text.secondary">
                  Hash: {hash}
                </Typography>
                <br />
                <Typography variant="caption" color="text.secondary">
                  Timestamp: {timestamp}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

function ActionButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ p: 3 }}>
      <Button variant="outlined" fullWidth color="secondary">
        View Full History
      </Button>
      <Button variant="contained" fullWidth>
        Initiate Transaction
      </Button>
    </Stack>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.any, index: PropTypes.number };
TransactionList.propTypes = { transactions: PropTypes.array.isRequired };

// Updated Mock blockchain transaction data
const mockBlockchainTransactions = [
  {
    id: 1,
    hash: '0x12af3b4c56d789ef123456789abcdeff12345678',
    type: 'onramp',
    status: 'Completed',
    amount: '+$1,000',
    timestamp: '2024-11-29 08:45:00',
    icon: <ArrowUp />,
    color: 'success.main'
  },
  {
    id: 2,
    hash: '0x98cd3b4e56f789ab9876543210fedcba98765432',
    type: 'offramp',
    status: 'Pending',
    amount: '-$500',
    timestamp: '2024-11-29 09:15:00',
    icon: <ArrowSwapHorizontal />,
    color: 'warning.main'
  },
  {
    id: 3,
    hash: '0x12bc7f4a78d912ef654987321cba1234fedc9876',
    type: 'onramp',
    status: 'Failed',
    amount: '+$2,000',
    timestamp: '2024-11-29 07:30:00',
    icon: <ArrowDown />,
    color: 'error.main'
  },
  {
    id: 4,
    hash: '0xa1b2c3d4e5f67890123456789abcdef123456789',
    type: 'offramp',
    status: 'Completed',
    amount: '-$1,200',
    timestamp: '2024-11-29 10:00:00',
    icon: <ArrowUp />,
    color: 'success.main'
  },
  {
    id: 5,
    hash: '0xffeeddccbbaa99887766554433221100fedcba99',
    type: 'onramp',
    status: 'Completed',
    amount: '+$3,000',
    timestamp: '2024-11-29 06:00:00',
    icon: <ArrowUp />,
    color: 'success.main'
  }
];
