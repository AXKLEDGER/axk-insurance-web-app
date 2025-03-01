import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import Link from 'next/link';

// material-ui
import { useTheme, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

// project imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// icons
import { LocationOn, VerifiedUser, ShoppingCart, Info } from '@mui/icons-material';
import { Heart, ArrowRight, Bookmark } from 'iconsax-react';

const prodImage = '/assets/images/marketplace';

// Enhanced card styles
const enhancedCardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 2,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 6px 16px -8px rgba(0,0,0,0.08), 0 9px 28px 0 rgba(0,0,0,0.05), 0 12px 48px 16px rgba(0,0,0,0.03)',
  maxHeight: { xs: 'none', sm: 550 }, // Control max height on tablets and up
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1), 0 18px 40px 0 rgba(0,0,0,0.07), 0 24px 60px 20px rgba(0,0,0,0.05)',
    '& .card-media': {
      transform: 'scale(1.05)',
    },
    '& .quick-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  }
};

const cardContentStyle = {
  p: { xs: 2, sm: 2.5 },
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'hidden',
};

// Badge component for labels and sales
const StatusBadge = ({ children, color = 'primary', sx = {} }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
        px: 1.5,
        py: 0.75,
        borderRadius: '20px',
        backgroundColor: alpha(theme.palette[color].main, 0.9),
        color: theme.palette[color].contrastText,
        fontWeight: 600,
        fontSize: '0.75rem',
        boxShadow: `0 4px 8px ${alpha(theme.palette[color].main, 0.25)}`,
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

StatusBadge.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  sx: PropTypes.object
};

// Enhanced Product Card
// Enhanced Product Card with improvements
export const ProductCard = ({ data, open }) => {
  const theme = useTheme();
  const [wishlisted, setWishlisted] = useState(false);
  const cardRef = useRef(null);

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
  };

  return (
    <MainCard
      content={false}
      sx={{
        ...enhancedCardStyle,
        maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
        height: '100%',
      }}
      ref={cardRef}
    >
      {data.isNew && <StatusBadge color="success">NEW</StatusBadge>}
      {data.discount && <StatusBadge color="error" sx={{ right: 16, left: 'auto' }}>{data.discount}% OFF</StatusBadge>}

      <Box sx={{ position: 'relative', height: { xs: 200, sm: 220, md: 250 }, overflow: 'hidden' }}>
        <Box
          component={Link}
          href={`/marketplace/product/${data.id}`}
          sx={{
            display: 'block',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            sx={{
              height: '100%',
              transition: 'transform 0.6s ease',
              objectFit: 'cover'
            }}
            className="card-media"
            image={data.image || `${prodImage}/default.png`}
            title={data.name}
          />
        </Box>
        <Box
          className="quick-actions"
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            display: 'flex',
            gap: 1,
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease',
          }}
        >
          <Tooltip title="Quick view">
            <IconButton
              color="primary"
              variant="contained"
              size="small"
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
            <IconButton
              color="primary"
              onClick={handleWishlist}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <Heart
                variant={wishlisted ? "Bold" : "Linear"}
                size={20}
                style={{ color: wishlisted ? theme.palette.error.main : undefined }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <CardContent sx={cardContentStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                component={Link}
                href={`/marketplace/product/${data.id}`}
                variant="h5"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  lineHeight: 1.3,
                  color: theme.palette.text.primary,
                  transition: 'color 0.2s ease',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }}
              >
                {data.name}
              </Typography>
              <Chip
                size="small"
                label={data.certification}
                icon={<VerifiedUser sx={{ fontSize: 16 }} />}
                color="success"
                variant="outlined"
                sx={{
                  borderRadius: '16px',
                  '& .MuiChip-label': {
                    px: 1,
                    fontWeight: 500
                  }
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                textAlign: 'center'
              }}
            >
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Price Per Kilogram
              </Typography>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{
                  fontWeight: 700,
                  my: 0.5
                }}
              >
                ${data.price}
              </Typography>
              {data.oldPrice && (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    textDecoration: 'line-through',
                    opacity: 0.7,
                    display: 'inline-block',
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: theme.palette.error.dark
                  }}
                >
                  ${data.oldPrice}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Origin
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <LocationOn sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {data.origin}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Type
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {data.type}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Rating
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Rating value={data.rating} readOnly precision={0.5} size="small" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ({data.rating})
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: data.quantity > 100
                      ? alpha(theme.palette.success.main, 0.1)
                      : data.quantity > 10
                        ? alpha(theme.palette.warning.main, 0.1)
                        : alpha(theme.palette.error.main, 0.1)
                  }}
                >
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Available
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: data.quantity > 100
                        ? theme.palette.success.main
                        : data.quantity > 10
                          ? theme.palette.warning.main
                          : theme.palette.error.main
                    }}
                  >
                    {data.quantity} kg
                    {data.quantity <= 10 && data.quantity > 0 && " (Low stock)"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 'auto' }}>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src={data.seller?.avatar}
                  alt={data.seller?.name}
                  sx={{
                    width: 36,
                    height: 36,
                    border: `2px solid ${theme.palette.background.paper}`,
                    boxShadow: theme.shadows[2]
                  }}
                />
                <Stack spacing={0}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    {data.seller?.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        color: theme.palette.warning.main,
                        fontSize: '1rem',
                        lineHeight: 1
                      }}
                    >
                      ★
                    </Box>
                    {data.seller?.rating} Rating
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 0,
                    p: '4px 8px',
                    borderRadius: '8px',
                    borderWidth: '1.5px',
                    '&:hover': {
                      borderWidth: '1.5px',
                    }
                  }}
                >
                  Contact
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCart sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: '8px',
                    boxShadow: theme.shadows[3],
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  Order
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

// Enhanced Finance Card
export const FinanceCard = ({ data, open }) => {
  const theme = useTheme();
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <MainCard
      content={false}
      sx={enhancedCardStyle}
    >
      <CardContent sx={cardContentStyle}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                component={Link}
                href={`/marketplace/finance/${data.id}`}
                variant="h5"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  lineHeight: 1.3,
                  color: theme.palette.text.primary,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }}
              >
                {data.title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={data.status}
                  color={data.status === 'Open' ? 'success' : 'default'}
                  size="small"
                  sx={{
                    borderRadius: '16px',
                    fontWeight: 600,
                    px: 0.5
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleBookmark}
                  size="small"
                >
                  <Bookmark
                    variant={bookmarked ? "Bold" : "Linear"}
                    size={20}
                    style={{ color: bookmarked ? theme.palette.primary.main : undefined }}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                textAlign: 'center'
              }}
            >
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Funding Amount
              </Typography>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{
                  fontWeight: 700,
                  my: 0.5
                }}
              >
                ${data.amount.toLocaleString()}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{
                  display: 'inline-block',
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.dark
                }}
              >
                {data.funded || '0%'} Funded
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Duration
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {data.duration}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Interest Rate
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                    {data.interestRate}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Risk Level
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color:
                        data.risk === 'Low' ? theme.palette.success.main :
                          data.risk === 'Medium' ? theme.palette.warning.main :
                            theme.palette.error.main
                    }}
                  >
                    {data.risk}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Collateral
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {data.collateral}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 'auto' }}>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}
              >
                Opportunity Details:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {data.details.purpose}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                endIcon={<ArrowRight size={20} />}
                sx={{
                  borderRadius: '10px',
                  boxShadow: theme.shadows[3],
                  fontWeight: 600,
                  textTransform: 'none',
                  py: 1,
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                View Details
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

// Enhanced Investment Card
export const InvestmentCard = ({ data, open }) => {
  const theme = useTheme();
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const progressValue = data.fundingProgress || 65;

  return (
    <MainCard
      content={false}
      sx={enhancedCardStyle}
    >
      <CardContent sx={cardContentStyle}>
        <Grid container spacing={2.5} sx={{ height: '100%' }}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                component={Link}
                href={`/marketplace/investment/${data.id}`}
                variant="h5"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  lineHeight: 1.3,
                  color: theme.palette.text.primary,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }}
              >
                {data.title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={data.status}
                  color="primary"
                  size="small"
                  sx={{
                    borderRadius: '16px',
                    fontWeight: 600,
                    px: 0.5
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleBookmark}
                  size="small"
                >
                  <Bookmark
                    variant={bookmarked ? "Bold" : "Linear"}
                    size={20}
                    style={{ color: bookmarked ? theme.palette.primary.main : undefined }}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOn
                  sx={{
                    fontSize: 20,
                    color: theme.palette.primary.main
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500
                  }}
                >
                  {data.location}
                </Typography>
              </Stack>

              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  textAlign: 'center'
                }}
              >
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Investment Amount
                </Typography>
                <Typography
                  variant="h3"
                  color="primary.main"
                  sx={{
                    fontWeight: 700,
                    my: 0.5
                  }}
                >
                  ${data.investmentAmount.toLocaleString()}
                </Typography>

                {/* Progress bar */}
                <Box sx={{ mt: 1, mb: 0.5, px: 1 }}>
                  <Box sx={{ width: '100%', bgcolor: alpha(theme.palette.primary.main, 0.2), borderRadius: 5, height: 8 }}>
                    <Box
                      sx={{
                        width: `${progressValue}%`,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: 5,
                        height: 8,
                        transition: 'width 1s ease-in-out'
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      mt: 0.5,
                      color: theme.palette.primary.main,
                      fontWeight: 600
                    }}
                  >
                    {progressValue}% Funded
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={6}>
                <Box sx={{ p: { xs: 1, sm: 1.5 }, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Farm Size
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: 'inherit' } }}>
                    {data.size}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: { xs: 1, sm: 1.5 }, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Expected Return
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main, fontSize: { xs: '0.8rem', sm: 'inherit' } }}>
                    {data.expectedReturn}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: { xs: 1, sm: 1.5 }, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Term
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: 'inherit' } }}>
                    {data.term}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: { xs: 1, sm: 1.5 }, borderRadius: 1, bgcolor: theme.palette.background.neutral }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
                    Production
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: 'inherit' } }}>
                    {data.details.currentProduction}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 'auto' }}>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}
              >
                Investment Details:
              </Typography>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  bgcolor: alpha(theme.palette.success.main, 0.08),
                  border: `1px dashed ${alpha(theme.palette.success.main, 0.3)}`
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500
                  }}
                >
                  <Box component="span" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                    {data.details.farmType}
                  </Box>
                  {' '}- Projected: {' '}
                  <Box component="span" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                    {data.details.projectedProduction}
                  </Box>
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: '10px',
                    boxShadow: theme.shadows[3],
                    fontWeight: 600,
                    textTransform: 'none',
                    py: 1,
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  Invest Now
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    borderRadius: '10px',
                    borderWidth: '1.5px',
                    fontWeight: 600,
                    textTransform: 'none',
                    py: 1,
                    '&:hover': {
                      borderWidth: '1.5px',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool
};

FinanceCard.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool
};

InvestmentCard.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool
};