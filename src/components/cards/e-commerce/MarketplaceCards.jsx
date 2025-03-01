import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link';

// material-ui
import { useTheme, alpha } from '@mui/material/styles';
import {
    Box,
    Stack,
    Button,
    Chip,
    CardContent,
    Typography,
    Rating,
    LinearProgress
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// icons
import { LocationOn, VerifiedUser } from '@mui/icons-material';
import { Heart, Calendar, CopySuccess, ShoppingCart } from 'iconsax-react';

// Image error handler component
const ImageWithFallback = ({ src, alt, ...props }) => {
    const [error, setError] = useState(false);

    const handleError = () => {
        if (!error) {
            setError(true);
        }
    };

    return (
        <Box
            component="img"
            src={error ? '/assets/images/placeholder.svg' : src}
            alt={alt}
            onError={handleError}
            {...props}
        />
    );
};

// Base card component for consistent styling across all card types
const BaseMarketplaceCard = ({ children, onClick, isFilterOpen }) => {
    const theme = useTheme();

    return (
        <MainCard
            content={false}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: 'hidden',
                maxWidth: isFilterOpen ? { xs: '100%', sm: '600px', md: '700px' } : { xs: '100%', sm: '600px', md: '700px' },
                mx: 'auto', // Center the card when width is limited
                '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-4px)',
                    boxShadow: theme.customShadows.z1,
                    transition: 'all 0.3s ease-in-out'
                },
                ...(onClick && { cursor: 'pointer' })
            }}
            onClick={onClick}
        >
            {children}
        </MainCard>
    );
};

// Product Card - for agricultural produce (Grid View)
export const ProductCard = ({ data, isFilterOpen }) => {
    const theme = useTheme();
    const [wishlisted, setWishlisted] = useState(false);

    return (
        <BaseMarketplaceCard isFilterOpen={isFilterOpen}>
            <Box sx={{
                position: 'relative',
                height: 220,
                borderRadius: '8px 8px 0 0',
                overflow: 'hidden'
            }}>
                <Box
                    component={ImageWithFallback}
                    src={data.image}
                    alt={data.name}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', 
                        borderRadius: '8px 8px 0 0', 
                    }}
                />

                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))',
                    zIndex: 1
                }} />

                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'background.paper' },
                        zIndex: 2
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setWishlisted(!wishlisted);
                    }}
                    size="small"
                >
                    <Heart
                        variant={wishlisted ? "Bold" : "Linear"}
                        color={wishlisted ? theme.palette.error.main : theme.palette.text.secondary}
                    />
                </IconButton>

                {data.discount && (
                    <Chip
                        label={`${data.discount}% OFF`}
                        size="small"
                        color="error"
                        sx={{
                            position: 'absolute',
                            bottom: 12,
                            left: 12,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            zIndex: 2  // Ensure it appears above the gradient
                        }}
                    />
                )}

                {data.isNew && (
                    <Chip
                        label="NEW"
                        size="small"
                        color="primary"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            zIndex: 2  // Ensure it appears above the gradient
                        }}
                    />
                )}
            </Box>

            <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                        <Stack spacing={0.5}>
                            <Typography
                                variant="h5"
                                component={Link}
                                href={`/marketplace/product/${data.id}`}
                                sx={{
                                    textDecoration: 'none',
                                    color: 'text.primary',
                                    '&:hover': { color: 'primary.main' },
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    lineHeight: '1.2em',
                                    height: '2.4em'
                                }}
                            >
                                {data.name}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {data.origin}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Chip
                            size="small"
                            label={data.certification}
                            icon={<VerifiedUser sx={{ fontSize: 16 }} />}
                            color="success"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                        />
                    </Stack>

                    <Stack spacing={1} sx={{ mt: 'auto' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h4" color="primary">
                                ${data.price}/kg
                            </Typography>
                            {data.oldPrice && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textDecoration: 'line-through' }}
                                >
                                    ${data.oldPrice}/kg
                                </Typography>
                            )}
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Available: {data.quantity}
                            </Typography>
                            <Rating value={data.rating} readOnly precision={0.5} size="small" />
                        </Stack>
                    </Stack>

                    {/* Seller info and action buttons */}
                    <Stack spacing={2} sx={{ mt: 'auto' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Box
                                    component={ImageWithFallback}
                                    src={data.seller?.avatar}
                                    alt={data.seller?.name}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                />
                                <Stack spacing={0}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '100px'
                                        }}
                                    >
                                        {data.seller?.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {data.seller?.rating}★ Rating
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* Action buttons - Primary and secondary CTAs */}
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 1,
                                    boxShadow: theme.customShadows.z2,
                                    flexGrow: 4
                                }}
                                startIcon={<ShoppingCart size={18} />}
                            >
                                Place Order
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderRadius: 1,
                                    minWidth: 'auto',
                                    px: 1.5,
                                    flexGrow: 1
                                }}
                            >
                                Contact
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </BaseMarketplaceCard >
    );
};

// Compact Product Card (List View) - for agricultural produce
export const CompactProductCard = ({ data, isFilterOpen }) => {
    const theme = useTheme();
    const [wishlisted, setWishlisted] = useState(false);

    return (
        <BaseMarketplaceCard isFilterOpen={isFilterOpen}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100%' }}>
                {/* Product image section - fixed to cover full width/height */}
                <Box sx={{
                    position: 'relative',
                    width: { xs: '100%', sm: '180px', md: '220px' },
                    height: { xs: '180px', sm: 'auto' },
                    minHeight: { sm: '220px' },
                    flexShrink: 0,
                    borderRadius: { xs: '8px 8px 0 0', sm: '8px 0 0 8px' },
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'stretch'
                }}>
                    {/* Image that covers the entire container */}
                    <Box
                        component={ImageWithFallback}
                        src={data.image}
                        alt={data.name}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />

                    {/* Gradient overlay for better visibility */}
                    <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))',
                        zIndex: 1
                    }} />

                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            zIndex: 2
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setWishlisted(!wishlisted);
                        }}
                        size="small"
                    >
                        <Heart
                            variant={wishlisted ? "Bold" : "Linear"}
                            color={wishlisted ? theme.palette.error.main : theme.palette.text.secondary}
                        />
                    </IconButton>

                    {data.discount && (
                        <Chip
                            label={`${data.discount}% OFF`}
                            size="small"
                            color="error"
                            sx={{
                                position: 'absolute',
                                bottom: 12,
                                left: 12,
                                zIndex: 2
                            }}
                        />
                    )}

                    {data.isNew && (
                        <Chip
                            label="NEW"
                            size="small"
                            color="primary"
                            sx={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                zIndex: 2
                            }}
                        />
                    )}
                </Box>

                {/* Product content section */}
                <CardContent sx={{
                    p: 2.5,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <Stack spacing={1.5} sx={{
                        height: '100%',
                        maxWidth: isFilterOpen ? { sm: '100%', md: '100%' } : '100%'
                    }}>
                        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                            <Stack spacing={0.5} sx={{ maxWidth: '70%' }}>
                                <Typography
                                    variant="h5"
                                    component={Link}
                                    href={`/marketplace/product/${data.id}`}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'text.primary',
                                        '&:hover': { color: 'primary.main' },
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        lineHeight: '1.2em',
                                        minHeight: '2.4em'
                                    }}
                                >
                                    {data.name}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {data.origin}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack spacing={1} alignItems="flex-end">
                                <Chip
                                    size="small"
                                    label={data.certification}
                                    icon={<VerifiedUser sx={{ fontSize: 16 }} />}
                                    color="success"
                                    variant="outlined"
                                    sx={{ borderRadius: 1 }}
                                />
                                <Rating value={data.rating} readOnly precision={0.5} size="small" />
                            </Stack>
                        </Stack>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                display: '-webkit-box'
                            }}
                        >
                            Premium quality {data.name.toLowerCase()} sourced directly from {data.origin} farmers.
                            Available for immediate shipment with {data.certification} certification.
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />

                        <Stack
                            direction={{ xs: 'column', sm: isFilterOpen ? 'column' : 'row', md: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', md: isFilterOpen ? 'flex-start' : 'center' }}
                            spacing={{ xs: 1.5, md: 2 }}
                            sx={{ mt: 'auto' }}
                        >
                            <Stack spacing={1}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="h4" color="primary">
                                        ${data.price}/kg
                                    </Typography>
                                    {data.oldPrice && (
                                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                            ${data.oldPrice}/kg
                                        </Typography>
                                    )}
                                </Stack>
                                <Typography variant="body2" color="text.secondary">
                                    Available: {data.quantity}
                                </Typography>
                            </Stack>

                            <Stack
                                direction={{ xs: 'row', sm: 'row' }}
                                spacing={{ xs: 1.5, sm: 1.5, md: 2 }}
                                alignItems="center"
                                sx={{ display: { xs: 'flex', sm: 'flex' } }}
                            >
                                <Box
                                    component={ImageWithFallback}
                                    src={data.seller?.avatar}
                                    alt={data.seller?.name}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                />
                                <Stack spacing={0}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: { xs: '80px', sm: '120px', md: '150px' }
                                        }}
                                    >
                                        {data.seller?.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {data.seller?.rating}★ Rating
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* Action buttons */}
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: isFilterOpen ? 'flex-start' : 'center', // Center the entire box when filter is closed
                            mt: { xs: 1, sm: 1.5 }
                        }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    width: isFilterOpen ? '100%' : 'auto', // Allow stack to shrink when centered
                                    minWidth: isFilterOpen ? '100%' : { xs: '100%', sm: '300px', md: '350px' }, // Control minimum width when centered
                                    maxWidth: isFilterOpen ? '100%' : { xs: '100%', sm: '350px', md: '400px' }, // Maximum width when centered
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: 1,
                                        boxShadow: theme.customShadows.z2,
                                        flexGrow: 3
                                    }}
                                    startIcon={<ShoppingCart size={18} />}
                                >
                                    Place Order
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        borderRadius: 1,
                                        minWidth: 'auto',
                                        px: 1.5,
                                        flexGrow: 1
                                    }}
                                >
                                    Contact
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Box>
        </BaseMarketplaceCard>
    );
};

// Finance Card - for trade finance opportunities (Grid View)
export const FinanceCard = ({ data, isFilterOpen }) => {
    const theme = useTheme();

    return (
        <BaseMarketplaceCard isFilterOpen={isFilterOpen}>
            <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={2.5} sx={{ height: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                            <Typography
                                variant="h5"
                                component={Link}
                                href={`/marketplace/finance/${data.id}`}
                                sx={{
                                    textDecoration: 'none',
                                    color: 'text.primary',
                                    '&:hover': { color: 'primary.main' },
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    lineHeight: '1.2em',
                                    height: '2.4em'
                                }}
                            >
                                {data.title}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <CopySuccess size={16} />
                                <Typography variant="body2" color="text.secondary">
                                    {data.risk} Risk
                                </Typography>
                                <Typography variant="caption" color="text.secondary">•</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {data.collateral}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Chip
                            label={data.status}
                            color={data.status === 'Open' ? 'success' : 'default'}
                            size="small"
                            sx={{ borderRadius: 1 }}
                        />
                    </Stack>

                    <Box sx={{
                        bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
                        borderRadius: 2,
                        p: 2
                    }}>
                        <Stack spacing={2}>
                            <Typography variant="h3" color="primary">
                                ${data.amount.toLocaleString()}
                            </Typography>
                            <Stack direction="row" spacing={3}>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" color="text.secondary">Duration</Typography>
                                    <Typography variant="subtitle1">{data.duration}</Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" color="text.secondary">Interest Rate</Typography>
                                    <Typography variant="subtitle1">{data.interestRate}</Typography>
                                </Stack>
                            </Stack>
                            {data.funded && (
                                <Box sx={{ width: '100%', mt: 1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                                        <Typography variant="caption" color="text.secondary">Funded</Typography>
                                        <Typography variant="caption" color="success.main">{data.funded}</Typography>
                                    </Stack>
                                    <LinearProgress
                                        variant="determinate"
                                        value={parseInt(data.funded, 10)}
                                        color="success"
                                        sx={{ height: 6, borderRadius: 1 }}
                                    />
                                </Box>
                            )}
                        </Stack>
                    </Box>

                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">Purpose:</Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                lineHeight: '1.5em',
                                height: '4.5em'
                            }}
                        >
                            {data.details.purpose}
                        </Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ borderRadius: 1, mt: 'auto' }}
                    >
                        View Details
                    </Button>
                </Stack>
            </CardContent>
        </BaseMarketplaceCard>
    );
};

// Compact Finance Card (List View) - for trade finance opportunities
export const CompactFinanceCard = ({ data, isFilterOpen }) => {
    const theme = useTheme();

    return (
        <BaseMarketplaceCard isFilterOpen={isFilterOpen}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100%' }}>
                {/* Finance Info Block */}
                <Box sx={{
                    width: { xs: '100%', sm: '180px', md: '220px' },
                    p: 2.5,
                    bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    borderRadius: { xs: '8px 8px 0 0', sm: '8px 0 0 8px' }
                }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                        ${data.amount.toLocaleString()}
                    </Typography>

                    <Chip
                        label={data.status}
                        color={data.status === 'Open' ? 'success' : 'default'}
                        size="small"
                        sx={{ borderRadius: 1, mb: 2 }}
                    />

                    {data.funded && (
                        <Box sx={{ width: '100%', mt: 1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                                <Typography variant="caption" color="text.secondary">Funded</Typography>
                                <Typography variant="caption" color="success.main">{data.funded}</Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={parseInt(data.funded, 10)}
                                color="success"
                                sx={{ height: 8, borderRadius: 1 }}
                            />
                        </Box>
                    )}
                </Box>

                {/* Finance content section */}
                <CardContent sx={{
                    p: 2.5,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <Stack spacing={2} sx={{
                        height: '100%',
                        maxWidth: isFilterOpen ? { sm: '100%', md: '100%' } : '100%'
                    }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Typography
                                variant="h5"
                                component={Link}
                                href={`/marketplace/finance/${data.id}`}
                                sx={{
                                    textDecoration: 'none',
                                    color: 'text.primary',
                                    '&:hover': { color: 'primary.main' },
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    lineHeight: '1.2em',
                                    minHeight: '2.4em'
                                }}
                            >
                                {data.title}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <CopySuccess size={16} />
                                <Typography variant="body2" color="text.secondary">
                                    {data.risk} Risk
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            direction={{ xs: 'column', md: isFilterOpen ? 'column' : 'row' }}
                            spacing={3}
                            sx={{ mb: 2 }}
                        >
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Duration</Typography>
                                <Typography variant="subtitle1">{data.duration}</Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Interest Rate</Typography>
                                <Typography variant="subtitle1">{data.interestRate}</Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Collateral</Typography>
                                <Typography variant="subtitle1">{data.collateral}</Typography>
                            </Stack>
                        </Stack>

                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2">Purpose:</Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    lineHeight: '1.5em',
                                }}
                            >
                                {data.details.purpose}
                            </Typography>
                        </Stack>

                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={2}
                            justifyContent="flex-end"
                            sx={{ mt: 'auto' }}
                        >
                            <Button
                                variant="outlined"
                                sx={{ borderRadius: 1 }}
                            >
                                Learn More
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 1 }}
                            >
                                View Details
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Box>
        </BaseMarketplaceCard>
    );
};

// Investment Card - for farm investments (Grid View)
export const InvestmentCard = ({ data, isFilterOpen }) => {
    const theme = useTheme();

    return (
        <BaseMarketplaceCard isFilterOpen={isFilterOpen}>
            <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={2.5} sx={{ height: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                            <Typography
                                variant="h5"
                                component={Link}
                                href={`/marketplace/investment/${data.id}`}
                                sx={{
                                    textDecoration: 'none',
                                    color: 'text.primary',
                                    '&:hover': { color: 'primary.main' },
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    lineHeight: '1.2em',
                                    height: '2.4em'
                                }}
                            >
                                {data.title}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {data.location}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Chip
                            label={data.status}
                            color="primary"
                            size="small"
                            sx={{ borderRadius: 1 }}
                        />
                    </Stack>

                    <Box sx={{
                        bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
                        borderRadius: 2,
                        p: 2
                    }}>
                        <Stack spacing={2}>
                            <Typography variant="h3" color="primary">
                                ${data.investmentAmount.toLocaleString()}
                            </Typography>
                            <Stack direction="row" spacing={3}>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" color="text.secondary">Farm Size</Typography>
                                    <Typography variant="subtitle1">{data.size}</Typography>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="caption" color="text.secondary">Expected Return</Typography>
                                    <Typography variant="subtitle1" color="success.main">
                                        {data.expectedReturn}
                                    </Typography>
                                </Stack>
                            </Stack>
                            {data.fundingProgress && (
                                <Box sx={{ width: '100%', mt: 1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                                        <Typography variant="caption" color="text.secondary">Funding Progress</Typography>
                                        <Typography variant="caption" color="primary">{data.fundingProgress}%</Typography>
                                    </Stack>
                                    <LinearProgress
                                        variant="determinate"
                                        value={data.fundingProgress}
                                        color="primary"
                                        sx={{ height: 6, borderRadius: 1 }}
                                    />
                                </Box>
                            )}
                        </Stack>
                    </Box>

                    <Box sx={{
                        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.100',
                        borderRadius: 2,
                        p: 2
                    }}>
                        <Stack direction="row" spacing={3}>
                            <Stack spacing={0.5}>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <Calendar size={16} />
                                    <Typography variant="caption" color="text.secondary">Term</Typography>
                                </Stack>
                                <Typography variant="subtitle2">{data.term}</Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Current Production</Typography>
                                <Typography variant="subtitle2">{data.details.currentProduction}</Typography>
                            </Stack>
                        </Stack>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ borderRadius: 1 }}
                        >
                            Invest Now
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 1 }}
                        >
                            Details
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </BaseMarketplaceCard>
    );
};

// Compact Investment Card (List View) - for farm investments
export const CompactInvestmentCard = ({ data, isFilterOpen }) => {
    const theme = useTheme();

    return (
        <BaseMarketplaceCard isFilterOpen={isFilterOpen}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100%' }}>
                {/* Investment Info Block */}
                <Box sx={{
                    width: { xs: '100%', sm: '180px', md: '220px' },
                    p: 2.5,
                    bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    borderRadius: { xs: '8px 8px 0 0', sm: '8px 0 0 8px' }
                }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                        ${data.investmentAmount.toLocaleString()}
                    </Typography>

                    <Typography variant="subtitle1" color="success.main" sx={{ mb: 2 }}>
                        {data.expectedReturn}
                    </Typography>

                    {data.fundingProgress && (
                        <Box sx={{ width: '100%', mt: 1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                                <Typography variant="caption" color="text.secondary">Funding Progress</Typography>
                                <Typography variant="caption" color="primary">{data.fundingProgress}%</Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={data.fundingProgress}
                                color="primary"
                                sx={{ height: 8, borderRadius: 1 }}
                            />
                        </Box>
                    )}
                </Box>

                {/* Investment content section */}
                <CardContent sx={{
                    p: 2.5,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <Stack spacing={2} sx={{
                        height: '100%',
                        maxWidth: isFilterOpen ? { sm: '100%', md: '100%' } : '100%'
                    }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Stack spacing={0.5}>
                                <Typography
                                    variant="h5"
                                    component={Link}
                                    href={`/marketplace/investment/${data.id}`}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'text.primary',
                                        '&:hover': { color: 'primary.main' },
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        lineHeight: '1.2em',
                                        minHeight: '2.4em'
                                    }}
                                >
                                    {data.title}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {data.location}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Chip
                                label={data.status}
                                color="primary"
                                size="small"
                                sx={{ borderRadius: 1 }}
                            />
                        </Stack>

                        <Stack
                            direction={{ xs: 'column', md: isFilterOpen ? 'column' : 'row' }}
                            spacing={3}
                            sx={{ mb: 2 }}
                        >
                            <Stack spacing={0.5}>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <Calendar size={16} />
                                    <Typography variant="caption" color="text.secondary">Term</Typography>
                                </Stack>
                                <Typography variant="subtitle2">{data.term}</Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Farm Size</Typography>
                                <Typography variant="subtitle2">{data.size}</Typography>
                            </Stack>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" color="text.secondary">Current Production</Typography>
                                <Typography variant="subtitle2">{data.details.currentProduction}</Typography>
                            </Stack>
                        </Stack>

                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2">Farm Details:</Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    lineHeight: '1.5em',
                                }}
                            >
                                This {data.details.farmType} in {data.location} currently produces {data.details.currentProduction}
                                and is projected to reach {data.details.projectedProduction} after investment.
                            </Typography>
                        </Stack>

                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={2}
                            justifyContent="flex-end"
                            sx={{ mt: 'auto' }}
                        >
                            <Button
                                variant="outlined"
                                sx={{ borderRadius: 1 }}
                            >
                                Details
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 1 }}
                            >
                                Invest Now
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Box>
        </BaseMarketplaceCard>
    );
};

// PropTypes
BaseMarketplaceCard.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    isFilterOpen: PropTypes.bool
};

ImageWithFallback.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

ProductCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        origin: PropTypes.string,
        quantity: PropTypes.string,
        price: PropTypes.number,
        oldPrice: PropTypes.number,
        discount: PropTypes.string,
        isNew: PropTypes.bool,
        rating: PropTypes.number,
        certification: PropTypes.string,
        image: PropTypes.string,
        seller: PropTypes.shape({
            name: PropTypes.string,
            rating: PropTypes.number,
            avatar: PropTypes.string
        })
    }).isRequired,
    isFilterOpen: PropTypes.bool
};

CompactProductCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        origin: PropTypes.string,
        quantity: PropTypes.string,
        price: PropTypes.number,
        oldPrice: PropTypes.number,
        discount: PropTypes.string,
        isNew: PropTypes.bool,
        rating: PropTypes.number,
        certification: PropTypes.string,
        image: PropTypes.string,
        seller: PropTypes.shape({
            name: PropTypes.string,
            rating: PropTypes.number,
            avatar: PropTypes.string
        })
    }).isRequired,
    isFilterOpen: PropTypes.bool
};

FinanceCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        amount: PropTypes.number,
        duration: PropTypes.string,
        interestRate: PropTypes.string,
        collateral: PropTypes.string,
        status: PropTypes.string,
        risk: PropTypes.string,
        funded: PropTypes.string,
        details: PropTypes.shape({
            purpose: PropTypes.string
        })
    }).isRequired,
    isFilterOpen: PropTypes.bool
};

CompactFinanceCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        amount: PropTypes.number,
        duration: PropTypes.string,
        interestRate: PropTypes.string,
        collateral: PropTypes.string,
        status: PropTypes.string,
        risk: PropTypes.string,
        funded: PropTypes.string,
        details: PropTypes.shape({
            purpose: PropTypes.string
        })
    }).isRequired,
    isFilterOpen: PropTypes.bool
};

InvestmentCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        location: PropTypes.string,
        size: PropTypes.string,
        investmentAmount: PropTypes.number,
        expectedReturn: PropTypes.string,
        term: PropTypes.string,
        status: PropTypes.string,
        fundingProgress: PropTypes.number,
        details: PropTypes.shape({
            currentProduction: PropTypes.string,
            farmType: PropTypes.string,
            projectedProduction: PropTypes.string
        })
    }).isRequired,
    isFilterOpen: PropTypes.bool
};

CompactInvestmentCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        location: PropTypes.string,
        size: PropTypes.string,
        investmentAmount: PropTypes.number,
        expectedReturn: PropTypes.string,
        term: PropTypes.string,
        status: PropTypes.string,
        fundingProgress: PropTypes.number,
        details: PropTypes.shape({
            currentProduction: PropTypes.string,
            farmType: PropTypes.string,
            projectedProduction: PropTypes.string
        })
    }).isRequired,
    isFilterOpen: PropTypes.bool
};