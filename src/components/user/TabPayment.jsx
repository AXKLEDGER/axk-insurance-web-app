import PropTypes from 'prop-types';
import { useState } from 'react';

// next
import Image from 'next/image';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Collapse from '@mui/material/Collapse';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { PatternFormat } from 'react-number-format';

// project-imports
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'app/api/snackbar';

// assets
import { Add, Eye, EyeSlash, Trash, UsdCoin } from 'iconsax-react';
const masterCard = '/assets/images/icons/master-card.png';
const paypal = '/assets/images/icons/paypal.png';
const visaCard = '/assets/images/icons/visa-card.png';

// style & constant
const buttonStyle = { color: 'text.primary', fontWeight: 600 };

const balanceContainerStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  margin: '24px auto 0',
  width: '80%',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  transform: 'scale(1)',
  opacity: 1
};
const balanceContainerHiddenStyle = {
  ...balanceContainerStyle,
  transform: 'scale(0.95)',
  opacity: 0
};
const balanceTypographyStyle = {
  fontWeight: 'bold',
  color: '#333'
};
const tokenBoxStyle = {
  padding: '12px 20px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
  transition: 'transform 0.2s',
  ':hover': {
    transform: 'scale(1.02)'
  }
};

const hoverButtonStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '60px',
  '& .icon-content': {
    opacity: 1,
    transition: 'opacity 0.2s ease-in-out',
  },
  '&:hover .icon-content': {
    opacity: 0,
  },
  '& .button-content': {
    position: 'absolute',
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    padding: '4px 8px',
  },
  '&:hover .button-content': {
    opacity: 1,
    transform: 'translateX(0)',
  },
};

const blockchainWallets = [
  {
    id: 1,
    name: 'Metamask Wallet',
    address: '0x1234abcd5678efgh9012ijkl3456mnop7890qrst',
    balances: [
      { token_type: 'USDC', balance: '0' },
      { token_type: 'EURC', balance: '0' },
      { token_type: 'Tether', balance: '0' },
      { token_type: 'Bitcoin', balance: '0' },
      { token_type: 'Ethereum', balance: '3.5' }
    ],
    type: 'metamask'
  },
  {
    id: 2,
    name: 'Coinbase Wallet',
    address: '0x9876abcd5432efgh1098ijkl7654mnop3210qrst',
    balances: [
      { token_type: 'USDC', balance: '0' },
      { token_type: 'EURC', balance: '0' },
      { token_type: 'Tether', balance: '0' },
      { token_type: 'Bitcoin', balance: '2.1' },
      { token_type: 'Ethereum', balance: '0' }
    ],
    type: 'coinbase'
  }
];

// ==============================|| WALLET - BLOCKCHAIN ||============================== //

function WalletCard({ wallet, onViewBalances }) {
  const { id, name, address, type, showBalances } = wallet;

  return (
    <MainCard content={false} sx={{ cursor: 'pointer' }}>
      <Box sx={{ p: 2 }}>
        <FormControlLabel
          value={id}
          control={<Radio value={id} />}
          sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {/* <Stack spacing={0.5} sx={{ ml: 1 }}>
                  <Typography color="secondary">{name}</Typography>
                  <Typography variant="subtitle1">
                    <PatternFormat value={number.toString().substring(12)} displayType="text" type="text" format="**** **** **** ####" />
                  </Typography>
                </Stack> */}
                <Stack spacing={0.5} sx={{ ml: 1 }}>
                  <Typography color="secondary">{name}</Typography>
                  {/* <PatternFormat
                    value={address}
                    displayType="text"
                    format="###### **** **** **** **** **** ####"
                  /> */}
                  <Typography variant="subtitle1">
                    {`${address.slice(0, 6)} **** **** **** **** **** ${address.slice(-4)}`}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                  {/* <Image
                    src={type === 'master' ? masterCard : visaCard}
                    alt="payment card"
                    width={type === 'master' ? 22 : 30}
                    height={type === 'master' ? 22 : 30}
                  /> */}
                  {/* <UsdCoin size="25" /> */}
                  <Box sx={hoverButtonStyle}>
                    <IconButton className="icon-content" color="secondary">
                      <Eye />
                    </IconButton>
                    <Button
                      className="button-content"
                      variant="outlined"
                      size="small"
                      onClick={() => onViewBalances(wallet)}
                    >
                      {showBalances ? 'Hide Balances' : 'View Balances'}
                    </Button>
                  </Box>
                  <IconButton color="secondary">
                    <Trash />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          }
        />
      </Box>
    </MainCard>
  );
}

// ==============================|| USER PROFILE - WALLET ||============================== //

export default function TabWallet() {
  // const [cards] = useState(paymentCards);
  const [method, setMethod] = useState('card');
  const [wallets, setWallets] = useState(blockchainWallets.map(wallet => ({ ...wallet, showBalances: false })));
  const [value, setValue] = useState('2');
  const [expiry, setExpiry] = useState(new Date());

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleViewBalances = (wallet) => {
    setWallets(wallets.map(w => ({ ...w, showBalances: w.id === wallet.id ? !w.showBalances : false })));
  };

  return (
    <MainCard title="Wallet Balances">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RadioGroup row aria-label="blockchain-wallet" name="blockchain-wallet" value={value} onChange={handleRadioChange}>
            <Grid item xs={12} container spacing={2.5}>
              {wallets.map((wallet, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <WalletCard wallet={wallet} onViewBalances={handleViewBalances} />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </Grid>
        {wallets.map(wallet =>
          <Collapse in={wallet.showBalances} key={wallet.id} timeout={300} style={{ width: '100%' }}>
            <Grid item xs={12} style={wallet.showBalances ? balanceContainerStyle : balanceContainerHiddenStyle}>
              <Typography variant="h6" gutterBottom>
                Balances for {wallet.name}:
              </Typography>
              <Stack spacing={2}>
                {wallet.balances.map((balance, index) => (
                  <Box key={index} sx={tokenBoxStyle}>
                    <Typography style={balanceTypographyStyle}>{balance.token_type}</Typography>
                    <Typography style={balanceTypographyStyle}>{balance.balance}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Collapse>
        )}
      </Grid>
    </MainCard>
  );
}

WalletCard.propTypes = {
  wallet: PropTypes.any,
  onViewBalances: PropTypes.func
};