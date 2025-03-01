'use client';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
    Box,
    Chip,
    Divider,
    Grid,
    Modal,
    Stack,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Breadcrumbs,
} from '@mui/material';
import { Eye } from 'iconsax-react';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

const cardStyle = {
    background: 'linear-gradient(135deg, #2aa1af 0%, white 100%)',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    textAlign: 'left',
    position: 'relative',
    overflow: 'hidden',
    color: '#1a237e',
};

const ownerNameStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
};

const hiddenAddressStyle = {
    fontSize: '16px',
    fontWeight: '500',
    background: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '8px',
    padding: '5px 15px',
    display: 'inline-block',
    marginBottom: '15px',
    letterSpacing: '0.1em',
};

const dummyWallets = [
    {
        wallet_id: 'wallet1',
        wallet_address: '0x1234...abcd',
        owner_name: 'John Doe',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        balances: [
            { balance_id: 'balance1', token_type: 'USDC', balance: '1500.50' },
            { balance_id: 'balance2', token_type: 'BTC', balance: '0.045' },
            { balance_id: 'balance3', token_type: 'ETH', balance: '2.75' },
        ],
    },
    {
        wallet_id: 'wallet2',
        wallet_address: '0x5678...efgh',
        owner_name: 'Jane Smith',
        status: 'inactive',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        balances: [
            { balance_id: 'balance4', token_type: 'USDC', balance: '500.00' },
            { balance_id: 'balance5', token_type: 'BTC', balance: '0.010' },
        ],
    },
];

function WalletControl() {
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleViewDetails = (wallet) => {
        setSelectedWallet(wallet);
        setShowDetailsModal(true);
    };

    return (
        <>
            <Breadcrumbs
                custom
                heading="Transaction List"
                links={[{ title: 'Home', to: '/' }, { title: 'Transactions' }]}
            />
            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12}>

                    <Divider sx={{ borderColor: '#2aa1af' }} />
                </Grid>

                {dummyWallets.length > 0 ? (
                    dummyWallets.map((wallet) => (
                        <Grid item xs={12} sm={6} md={4} key={wallet.wallet_id}>
                            <Card sx={cardStyle}>
                                <CardContent>
                                    <Typography sx={ownerNameStyle}>{wallet.owner_name}</Typography>
                                    <Typography sx={hiddenAddressStyle}>{wallet.wallet_address}</Typography>
                                    <Chip
                                        label={wallet.status}
                                        color={wallet.status === 'active' ? 'success' : 'error'}
                                        size="small"
                                        sx={{ position: 'absolute', top: '10px', right: '10px' }}
                                    />
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: '#2aa1af', color: 'white', textTransform: 'none', borderRadius: '8px' }}
                                        onClick={() => handleViewDetails(wallet)}
                                    >
                                        View Balances
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 5 }}>
                        <Typography variant="h6" sx={{ color: '#757575' }}>
                            No wallets available.
                        </Typography>
                    </Grid>
                )}

                {/* Wallet Details Modal */}
                <Modal open={showDetailsModal} onClose={() => setShowDetailsModal(false)}>
                    <Box sx={modalStyle}>
                        {selectedWallet && (
                            <Stack spacing={2}>
                                <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold' }}>Wallet Details</Typography>
                                <Typography variant="body2">
                                    <strong>Wallet ID:</strong> {selectedWallet.wallet_id}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Owner:</strong> {selectedWallet.owner_name}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Address:</strong> {selectedWallet.wallet_address}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Status:</strong> {selectedWallet.status}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Created At:</strong> {new Date(selectedWallet.created_at).toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Updated At:</strong> {new Date(selectedWallet.updated_at).toLocaleString()}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold' }}>Balances</Typography>
                                {selectedWallet.balances.map((balance) => (
                                    <Typography key={balance.balance_id} variant="body2" sx={{ color: '#4caf50' }}>
                                        {balance.token_type}: {balance.balance}
                                    </Typography>
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Modal>
            </Grid>
        </>
    );
}

export default WalletControl;
