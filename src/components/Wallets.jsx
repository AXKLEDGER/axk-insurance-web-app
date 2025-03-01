'use client';

import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    Modal,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { styled } from '@mui/system';
import { Eye, CloseCircle, TickCircle } from 'iconsax-react';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const generateDummyWallets = () => {
    const wallets = [];
    for (let i = 1; i <= 50; i++) {
        wallets.push({
            wallet_id: `wallet${i}`,
            wallet_address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
            status: i % 2 === 0 ? 'active' : 'inactive',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user: {
                username: `user${i}`,
                email: `user${i}@example.com`,
            },
            balances: [
                { balance_id: `balance${i}1`, token_type: 'USDC', balance: (Math.random() * 10000).toFixed(2) },
                { balance_id: `balance${i}2`, token_type: 'BTC', balance: (Math.random() * 10).toFixed(4) },
                { balance_id: `balance${i}3`, token_type: 'ETH', balance: (Math.random() * 50).toFixed(3) },
            ],
        });
    }
    return wallets;
};

const dummyWallets = generateDummyWallets();

function WalletManagement() {
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState({ open: false, action: null, wallet: null });

    const handleDeactivate = (wallet) => {
        console.log(`Deactivating wallet: ${wallet.wallet_id}`);
        // Call API to deactivate wallet
    };

    const handleReactivate = (wallet) => {
        console.log(`Reactivating wallet: ${wallet.wallet_id}`);
        // Call API to reactivate wallet
    };

    const handleAction = () => {
        const { action, wallet } = confirmationDialog;
        if (action === 'deactivate') handleDeactivate(wallet);
        if (action === 'reactivate') handleReactivate(wallet);
        setConfirmationDialog({ open: false, action: null, wallet: null });
    };

    return (
        <Grid item xs={12} sx={{ mt: 3 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h4">Wallet Management</Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Wallet Address</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Balances</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyWallets.map((wallet) => (
                            <TableRow key={wallet.wallet_id}>
                                <TableCell>{wallet.wallet_address}</TableCell>
                                <TableCell>{wallet.user.username} ({wallet.user.email})</TableCell>
                                <TableCell>
                                    {wallet.balances.map((balance) => (
                                        <Stack key={balance.balance_id} direction="row" spacing={1}>
                                            <Typography variant="body2">
                                                {balance.token_type}: {balance.balance}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={wallet.status}
                                        color={wallet.status === 'active' ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            onClick={() => {
                                                setSelectedWallet(wallet);
                                                setShowDetailsModal(true);
                                            }}
                                        >
                                            <Eye />
                                        </IconButton>
                                        {wallet.status === 'active' ? (
                                            <IconButton
                                                onClick={() =>
                                                    setConfirmationDialog({ open: true, action: 'deactivate', wallet })
                                                }
                                                color="error"
                                            >
                                                <CloseCircle />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() =>
                                                    setConfirmationDialog({ open: true, action: 'reactivate', wallet })
                                                }
                                                color="success"
                                            >
                                                <TickCircle />
                                            </IconButton>
                                        )}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Wallet Details Modal */}
            <Modal open={showDetailsModal} onClose={() => setShowDetailsModal(false)}>
                <Box sx={modalStyle}>
                    {selectedWallet && (
                        <Stack spacing={2}>
                            <Typography variant="h6">Wallet Details</Typography>
                            <Typography variant="body2">
                                <strong>Wallet ID:</strong> {selectedWallet.wallet_id}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Address:</strong> {selectedWallet.wallet_address}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Owner:</strong> {selectedWallet.user.username} ({selectedWallet.user.email})
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
                            <Divider />
                            <Typography variant="h6">Balances</Typography>
                            {selectedWallet.balances.map((balance) => (
                                <Typography key={balance.balance_id} variant="body2">
                                    {balance.token_type}: {balance.balance}
                                </Typography>
                            ))}
                        </Stack>
                    )}
                </Box>
            </Modal>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmationDialog.open}
                onClose={() => setConfirmationDialog({ open: false, action: null, wallet: null })}
            >
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {confirmationDialog.action} this wallet?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmationDialog({ open: false, action: null, wallet: null })} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAction} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

WalletManagement.propTypes = {
    wallets: PropTypes.arrayOf(
        PropTypes.shape({
            wallet_id: PropTypes.string.isRequired,
            wallet_address: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
            user: PropTypes.shape({
                username: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
            }).isRequired,
            balances: PropTypes.arrayOf(
                PropTypes.shape({
                    balance_id: PropTypes.string.isRequired,
                    token_type: PropTypes.string.isRequired,
                    balance: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
};

export default WalletManagement;
