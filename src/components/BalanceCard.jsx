'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, Select, MenuItem, Stack } from '@mui/material';

export default function BalanceCard() {
    const [currency, setCurrency] = useState('BTC');
    const currencyBalances = {
        BTC: { amount: '0.5 BTC', value: '$20,000' },
        ETH: { amount: '1.2 ETH', value: '$4,800' },
        USDC: { amount: '500 USDC', value: '$500' },
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <Card sx={{ borderRadius: 4, p: 3, boxShadow: 3, background: '#2aa1af', color: 'white' }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6">Wallet Balance</Typography>
                        <Typography variant="h4" fontWeight={700}>
                            {currencyBalances[currency].amount}
                        </Typography>
                        <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.8)">
                            {currencyBalances[currency].value}
                        </Typography>
                    </Box>
                    <Select
                        value={currency}
                        onChange={handleCurrencyChange}
                        sx={{
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            '& .MuiSelect-icon': { color: 'white' },
                        }}
                    >
                        {Object.keys(currencyBalances).map((key) => (
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            </CardContent>
        </Card>
    );
}
