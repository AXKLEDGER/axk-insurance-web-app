import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
    IconButton,
    Box,
    Typography,
    Chip,
    Stack,
    styled,
    useTheme
} from '@mui/material';
import { CloseCircle } from 'iconsax-react';
import { MarketplaceDetails, TradeFinanceDetails } from './OrderDetailComponents';
import InvestmentDetails from './InvestmentDetails';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 16,
        background: '#fff',
        maxWidth: '900px',
        width: '100%',
        margin: 16
    },
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)'
    }
}));

const OrderViewModal = ({ open, onClose, order }) => {
    const theme = useTheme();

    if (!order || !open) return null;

    const getTypeInfo = (type) => {
        const types = {
            marketplace: { color: 'primary', label: 'Purchase Order' },
            investment: { color: 'success', label: 'Investment Opportunity' },
            trade_finance: { color: 'warning', label: 'Trade Finance' }
        };
        return types[type] || { color: 'default', label: type };
    };

    const typeInfo = getTypeInfo(order.type);

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <Box sx={{ position: 'relative' }}>
                {/* Header */}
                <Box sx={{
                    p: 3,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    background: theme.palette.background.default
                }}>
                    <Stack spacing={2}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Stack spacing={1}>
                                <Typography variant="h5" fontWeight={600}>
                                    Order Details
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography color="text.secondary">
                                        {order.id}
                                    </Typography>
                                    <Chip
                                        label={typeInfo.label}
                                        color={typeInfo.color}
                                        size="small"
                                        sx={{ borderRadius: 1.5 }}
                                    />
                                </Stack>
                            </Stack>
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': { color: 'error.main' }
                                }}
                            >
                                <CloseCircle size={20} />
                            </IconButton>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Date
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {new Date(order.date).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Vendor
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {order.vendor}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Location
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {order.vendorLocation}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>

                {/* Content */}
                <DialogContent sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        {order.items.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    bgcolor: 'background.paper',
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider'
                                }}
                            >
                                {order.type === 'marketplace' && (
                                    <MarketplaceDetails
                                        item={item}
                                        vendor={order.vendor}
                                        vendorLocation={order.vendorLocation}
                                        deliveryTerms={order.deliveryTerms}
                                        paymentTerms={order.paymentTerms}
                                    />
                                )}
                                {order.type === 'trade_finance' && (
                                    <TradeFinanceDetails
                                        item={item}
                                        vendor={order.vendor}
                                        vendorLocation={order.vendorLocation}
                                        financingType={order.financingType}
                                        interestRate={order.interestRate}
                                        tenor={order.financingTerm}
                                    />
                                )}
                                {order.type === 'investment' && (
                                    <InvestmentDetails
                                        item={item}
                                        vendor={order.vendor}
                                        vendorLocation={order.vendorLocation}
                                        returnRate={order.returnRate}
                                        investmentTerm={order.investmentTerm}
                                        riskLevel={order.riskLevel}
                                    />
                                )}
                            </Box>
                        ))}
                    </Stack>
                </DialogContent>
            </Box>
        </StyledDialog>
    );
};

OrderViewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['marketplace', 'investment', 'trade_finance']).isRequired,
        vendor: PropTypes.string.isRequired,
        vendorLocation: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            unit: PropTypes.string,
            price: PropTypes.number.isRequired,
            quality: PropTypes.string,
            deliveryDate: PropTypes.string,
            harvestSeason: PropTypes.string
        })).isRequired,
        deliveryTerms: PropTypes.string,
        paymentTerms: PropTypes.string,
        financingType: PropTypes.string,
        financingTerm: PropTypes.string,
        interestRate: PropTypes.string,
        returnRate: PropTypes.string,
        investmentTerm: PropTypes.string,
        riskLevel: PropTypes.string
    })
};

export default OrderViewModal;