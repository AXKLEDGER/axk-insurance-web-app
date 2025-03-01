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
    useTheme,
    Divider,
    Avatar,
    Container // Added Container component
} from '@mui/material';
import {
    TrendingUp as ProfitIcon,
    Shield as RiskIcon,
    CalendarMonth as DateIcon,
    LocationOn as LocationIcon,
    InfoOutlined
} from '@mui/icons-material';

const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
        case 'low': return 'success';
        case 'medium': return 'warning';
        case 'high': return 'error';
        default: return 'default';
    }
};

const InvestmentDetails = ({
    item,
    vendor,
    vendorLocation,
    returnRate,
    investmentTerm,
    riskLevel
}) => {
    const theme = useTheme();
    const riskColor = getRiskLevelColor(riskLevel);

    return (
        // Added Container with maxWidth and padding
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ width: '100%' }}>
                <Card
                    elevation={4}
                    sx={{
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: theme.shadows[6]
                        }
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        {/* Header Section */}
                        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={8}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        sx={{
                                            bgcolor: theme.palette.primary.light,
                                            width: 56,
                                            height: 56
                                        }}
                                    >
                                        <ProfitIcon color="primary" />
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            color="primary.main"
                                            sx={{
                                                fontWeight: 'bold',
                                                mb: 0.5
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            color="text.secondary"
                                        >
                                            <LocationIcon fontSize="small" />
                                            <Typography variant="body2">
                                                {vendor} • {vendorLocation}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                                <Chip
                                    icon={<RiskIcon />}
                                    label={`Risk: ${riskLevel}`}
                                    color={riskColor}
                                    variant="outlined"
                                    sx={{
                                        fontWeight: 600,
                                        borderRadius: 2
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ mb: 3 }} />

                        {/* Investment Details Grid */}
                        <Grid container spacing={3}>
                            {/* Project Details Column */}
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 3,
                                        bgcolor: theme.palette.grey[100],
                                        height: '100%'
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="primary.main"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <DateIcon color="primary" /> Project Details
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {[
                                            { label: 'Duration', value: item.projectDuration },
                                            { label: 'Land Size', value: item.landSize },
                                            { label: 'Expected Yield', value: item.expectedYield }
                                        ].map((detail, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ fontWeight: 500 }}
                                                >
                                                    {detail.label}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                                                >
                                                    {detail.value}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Grid>

                            {/* Investment Terms Column */}
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 3,
                                        bgcolor: theme.palette.grey[100],
                                        height: '100%'
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="primary.main"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <ProfitIcon color="primary" /> Investment Terms
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {[
                                            { label: 'Amount', value: `$${item.price.toFixed(2)}` },
                                            { label: 'Return Rate', value: returnRate },
                                            { label: 'Investment Term', value: investmentTerm },
                                            { label: 'Risk Level', value: riskLevel }
                                        ].map((detail, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ fontWeight: 500 }}
                                                >
                                                    {detail.label}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: theme.palette.text.primary,
                                                        ...(detail.label === 'Risk Level' && {
                                                            color: theme.palette[getRiskLevelColor(detail.value)].main
                                                        })
                                                    }}
                                                >
                                                    {detail.value}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Grid>

                            {/* Additional Information */}
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 3,
                                        bgcolor: theme.palette.grey[100]
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="primary.main"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <InfoOutlined color="primary" /> Additional Information
                                    </Typography>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <Chip
                                            label="Start: Q2 2024"
                                            sx={{
                                                borderRadius: 2,
                                                fontWeight: 500,
                                                bgcolor: theme.palette.grey[200],
                                                color: theme.palette.text.primary
                                            }}
                                        />
                                        <Chip
                                            label={`ROI: ${returnRate}`}
                                            color="success"
                                            sx={{ borderRadius: 2, fontWeight: 500 }}
                                        />
                                        <Chip
                                            label={`Exit: ${investmentTerm}`}
                                            color="warning"
                                            sx={{ borderRadius: 2, fontWeight: 500 }}
                                        />
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

InvestmentDetails.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        projectDuration: PropTypes.string.isRequired,
        landSize: PropTypes.string.isRequired,
        expectedYield: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    vendor: PropTypes.string.isRequired,
    vendorLocation: PropTypes.string.isRequired,
    returnRate: PropTypes.string.isRequired,
    investmentTerm: PropTypes.string.isRequired,
    riskLevel: PropTypes.string.isRequired,
};

export default InvestmentDetails;