import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Stack,
    Typography,
    Avatar,
    Container,
    Divider
} from '@mui/material';
import {
    ShoppingCart as MarketplaceIcon,
    LocalShipping as DeliveryIcon,
    Inventory as QualityIcon,
    AccountBalance as FinanceIcon,
    Percent as InterestIcon
} from '@mui/icons-material';

const MarketplaceDetails = ({
    item,
    vendor,
    vendorLocation,
    deliveryTerms,
    paymentTerms
}) => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ width: '100%' }}>
                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 1
                    }}
                >
                    <CardContent>
                        {/* Header Section */}
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                                <MarketplaceIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {vendor} • {vendorLocation}
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Quality Chip */}
                        <Chip
                            icon={<QualityIcon />}
                            label={`Quality: ${item.quality}`}
                            color="success"
                            variant="outlined"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                borderRadius: 2
                            }}
                        />

                        <Divider sx={{ mb: 2 }} />

                        {/* Product and Delivery Info */}
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Price
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    ${item.price.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Quantity
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {item.quantity} {item.unit}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Delivery Date
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {item.deliveryDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Delivery Terms
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {deliveryTerms}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        {/* Payment Terms */}
                        <Typography variant="body2" color="text.secondary">
                            Payment Terms
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {paymentTerms}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

const TradeFinanceDetails = ({
    item,
    vendor,
    vendorLocation,
    financingType,
    interestRate,
    tenor
}) => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ width: '100%' }}>
                <Card
                    elevation={3}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 1
                    }}
                >
                    <CardContent>
                        {/* Header Section */}
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40 }}>
                                <FinanceIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {vendor} • {vendorLocation}
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Financing Chip */}
                        <Chip
                            icon={<InterestIcon />}
                            label={`Rate: ${interestRate}`}
                            color="info"
                            variant="outlined"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                borderRadius: 2
                            }}
                        />

                        <Divider sx={{ mb: 2 }} />

                        {/* Financing & Terms Info */}
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Financing Type
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {financingType}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Amount
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    ${item.quantity * item.price}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Tenor
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {tenor}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        {/* Harvest Season */}
                        <Typography variant="body2" color="text.secondary">
                            Harvest Season
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {item.harvestSeason}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

// PropTypes for validation
MarketplaceDetails.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quality: PropTypes.string.isRequired,
        deliveryDate: PropTypes.string.isRequired,
    }).isRequired,
    vendor: PropTypes.string.isRequired,
    vendorLocation: PropTypes.string.isRequired,
    deliveryTerms: PropTypes.string.isRequired,
    paymentTerms: PropTypes.string.isRequired,
};

TradeFinanceDetails.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        harvestSeason: PropTypes.string.isRequired,
    }).isRequired,
    vendor: PropTypes.string.isRequired,
    vendorLocation: PropTypes.string.isRequired,
    financingType: PropTypes.string.isRequired,
    interestRate: PropTypes.string.isRequired,
    tenor: PropTypes.string.isRequired,
};

export { MarketplaceDetails, TradeFinanceDetails };