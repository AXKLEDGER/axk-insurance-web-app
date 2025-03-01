'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTheme, styled, alpha } from '@mui/material/styles';
import {
  Grid,
  Box,
  Tab,
  Tabs,
  Typography,
  Stack,
  Fade,
  Grow,
  Chip,
  Button,
  IconButton,
  CircularProgress,
  Skeleton,
  Paper,
  Divider,
  Tooltip,
  Pagination,
  TablePagination
} from '@mui/material';

// project imports
import {
  ProductCard,
  FinanceCard,
  InvestmentCard,
  CompactProductCard,
  CompactFinanceCard,
  CompactInvestmentCard
} from 'components/cards/e-commerce/MarketplaceCards';
import useConfig from 'hooks/useConfig';
import MarketplaceFilterDrawer from 'sections/apps/e-commerce/products/ProductFilterDrawer';
import ProductsHeader from 'sections/apps/e-commerce/products/ProductsHeader';

// icons
import {
  Grid3x3,
  GridView,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { ArrowUp2, ArrowDown2, FilterSearch } from 'iconsax-react';

const drawerWidth = 320;

// Enhanced loading placeholder
const EnhancedSkeletonPlaceholder = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[10] }
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={220}
        sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08) }}
      />
      <Box sx={{ p: 2, pt: 2.5 }}>
        <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1, borderRadius: 1 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2, borderRadius: 1 }} />

        <Box sx={{ mb: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: 1.5 }} />
        </Box>

        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ width: '60%' }}>
            <Stack direction="row" spacing={1}>
              <Skeleton variant="rectangular" width="40%" height={32} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="60%" height={32} sx={{ borderRadius: 1 }} />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

// Empty state component with custom SVG icon
const EmptyState = ({ type, onClearFilters }) => {
  const theme = useTheme();

  // Custom SVG icon for no results
  const NoResultsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="180" height="180">
      {/* Background circle with subtle gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9fdfb" />
          <stop offset="100%" stopColor="#ebf7f0" />
        </linearGradient>
        <linearGradient id="magnifyingGlassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00a854" />
          <stop offset="100%" stopColor="#008c46" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Main background */}
      <circle cx="256" cy="256" r="240" fill="url(#bgGradient)" />

      {/* Magnifying glass */}
      <g filter="url(#shadow)">
        <path d="M280 175a85 85 0 1 0-170 0 85 85 0 0 0 170 0z" stroke="url(#magnifyingGlassGradient)" strokeWidth="18" fill="white" />
        <line x1="245" y1="235" x2="320" y2="310" stroke="url(#magnifyingGlassGradient)" strokeWidth="22" strokeLinecap="round" />
      </g>

      {/* No results visual elements */}
      <g>
        {/* Document outlines */}
        <rect x="220" y="140" width="50" height="70" rx="4" fill="white" stroke="#c9e9d8" strokeWidth="2" />
        <rect x="210" y="165" width="50" height="70" rx="4" fill="white" stroke="#c9e9d8" strokeWidth="2" />
        <rect x="200" y="180" width="50" height="70" rx="4" fill="white" stroke="#c9e9d8" strokeWidth="2" />

        {/* X mark on documents */}
        <line x1="215" y1="205" x2="235" y2="225" stroke="#ff6b6b" strokeWidth="3" strokeLinecap="round" />
        <line x1="235" y1="205" x2="215" y2="225" stroke="#ff6b6b" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Decorative elements */}
      <g opacity="0.7">
        <circle cx="330" cy="150" r="8" fill="#00a854" />
        <circle cx="350" cy="190" r="5" fill="#00a854" />
        <circle cx="320" cy="210" r="4" fill="#00a854" />
        <circle cx="365" cy="230" r="6" fill="#00a854" />
      </g>

      {/* Subtle empty state pattern */}
      <g opacity="0.3">
        <circle cx="150" cy="320" r="40" fill="none" stroke="#00a854" strokeWidth="2" strokeDasharray="6,4" />
        <circle cx="350" cy="300" r="30" fill="none" stroke="#00a854" strokeWidth="2" strokeDasharray="6,4" />
      </g>
    </svg>
  );

  return (
    <Box
      sx={{
        py: 5,
        px: { xs: 3, sm: 5 },
        textAlign: 'center',
        borderRadius: 2,
        border: `1px dashed ${theme.palette.divider}`,
        bgcolor: alpha(theme.palette.primary.lighter, 0.08),
        width: '100%',
        maxWidth: '100%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ mb: 3, opacity: 0.9 }}>
        <NoResultsIcon />
      </Box>
      <Typography variant="h4" gutterBottom color="primary">
        No {type} Listings Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: '600px',
          mb: 3,
          opacity: 0.8
        }}
      >
        We couldn't find any {type.toLowerCase()} listings matching your criteria.
        Try adjusting your filters or check back later for new listings.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClearFilters}
          startIcon={<FilterListIcon />}
        >
          Clear Filters
        </Button>
        <Button
          variant="outlined"
          color="primary"
        >
          Explore Other Categories
        </Button>
      </Stack>
    </Box>
  );
};

// Enhanced Main component with smoother transitions
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'container' })(
  ({ theme, open, container }) => ({
    flexGrow: 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard
    }),
    marginLeft: -drawerWidth,
    width: `calc(100% + ${drawerWidth}px)`,
    ...(container && {
      [theme.breakpoints.only('lg')]: {
        marginLeft: !open ? -240 : 0,
        width: !open ? `calc(100% + 240px)` : '100%'
      }
    }),
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0,
      width: '100%'
    },
    ...(open && {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard
      }),
      marginLeft: 0,
      width: '100%',
      paddingLeft: { xs: 0, sm: 1, md: 2 } // Add padding when drawer is open
    })
  })
);

// Styled Tabs component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  position: 'relative',
  '& .MuiTabs-flexContainer': {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: theme.palette.primary.main
  }
}));

// Styled Tab component
const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  marginRight: theme.spacing(4),
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 600
  },
  '&.Mui-focusVisible': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2)
  }
}));

const MarketplacePage = () => {
  const theme = useTheme();
  const { container } = useConfig();
  const [tab, setTab] = useState(0);
  const [gridView, setGridView] = useState('grid'); // 'grid' or 'compact'

  // States for loading and data
  const [isLoading, setIsLoading] = useState(true);
  const [produceListings, setProduceListings] = useState([]);
  const [financeListings, setFinanceListings] = useState([]);
  const [investmentListings, setInvestmentListings] = useState([]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // Filter drawer state
  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // Initial filter state
  const initialState = {
    search: '',
    sort: 'newest',
    category: 'all',
    locations: [],
    certifications: [],
    priceRange: [0, 1000000],
    quantityRange: [0, 10000],
    landSize: [0, 1000],
    financingType: [],
    rating: 0
  };
  const [filter, setFilter] = useState(initialState);

  // Toggle grid view
  const toggleGridView = () => {
    setGridView(gridView === 'grid' ? 'compact' : 'grid');
    // Reset to first page when changing view
    setPage(0);
  };

  // Reset filters
  const handleClearFilters = () => {
    setFilter(initialState);
    setPage(0);
  };

  useEffect(() => {
    // Simulate API calls
    setIsLoading(true);
    setTimeout(() => {
      setProduceListings([
        {
          id: 'P1',
          name: 'Premium Arabica Coffee',
          type: 'Coffee',
          origin: 'Ethiopia',
          quantity: '5000 kg',
          price: 4.8,
          oldPrice: 5.2,
          discount: '8',
          isNew: true,
          rating: 4.5,
          certification: 'Organic',
          image: '/assets/images/e-commerce/arabica-coffee.png',
          seller: {
            name: 'Ethiopian Coffee Co.',
            rating: 4.8,
            verified: true,
            avatar: '/assets/images/users/avatar-1.png'
          }
        },
        {
          id: 'P2',
          name: 'Green Tea Leaves',
          type: 'Tea',
          origin: 'Sri Lanka',
          quantity: '3000 kg',
          price: 6.2,
          rating: 4.7,
          certification: 'Fair Trade',
          image: '/assets/images/e-commerce/green-tea.png',
          seller: {
            name: 'Ceylon Tea Exports',
            rating: 4.9,
            verified: true,
            avatar: '/assets/images/users/avatar-2.png'
          }
        },
        {
          id: 'P3',
          name: 'Robusta Coffee Beans',
          type: 'Coffee',
          origin: 'Vietnam',
          quantity: '8000 kg',
          price: 3.5,
          oldPrice: 4.2,
          discount: '17',
          rating: 4.3,
          certification: 'Rainforest Alliance',
          image: '/assets/images/e-commerce/robusta-coffee.png',
          seller: {
            name: 'Vietnam Coffee Corp',
            rating: 4.6,
            verified: true,
            avatar: '/assets/images/users/avatar-3.png'
          }
        }
      ]);

      setFinanceListings([
        {
          id: 'F1',
          type: 'Trade Finance',
          title: 'Coffee Export Pre-financing',
          amount: 500000,
          duration: '6 months',
          interestRate: '8%',
          collateral: 'Warehouse Receipt',
          status: 'Open',
          risk: 'Low',
          funded: '45%',
          details: {
            borrower: 'Kenya Premium Exports Ltd',
            purpose: 'Pre-export financing for premium coffee shipments to Europe. Funds will be used for sourcing, processing and logistics before shipment.',
            repaymentSource: 'Export Contracts'
          }
        },
        {
          id: 'F2',
          type: 'Trade Finance',
          title: 'Tea Processing Equipment Financing',
          amount: 750000,
          duration: '12 months',
          interestRate: '7.5%',
          collateral: 'Equipment Lien',
          status: 'Open',
          risk: 'Medium',
          funded: '62%',
          details: {
            borrower: 'Sri Lanka Tea Processors',
            purpose: 'Purchase and installation of new processing equipment to increase production capacity and quality standards for export markets.',
            repaymentSource: 'Processing Contracts'
          }
        },
        {
          id: 'F3',
          type: 'Trade Finance',
          title: 'Organic Certification Working Capital',
          amount: 250000,
          duration: '4 months',
          interestRate: '8.5%',
          collateral: 'Purchase Orders',
          status: 'Open',
          risk: 'Low',
          funded: '78%',
          details: {
            borrower: 'Organic Farms Cooperative',
            purpose: 'Working capital for organic certification process including inspection fees, documentation, and transitional period support for member farmers.',
            repaymentSource: 'Forward Contracts'
          }
        }
      ]);

      setInvestmentListings([
        {
          id: 'I1',
          type: 'Farm Investment',
          title: 'Coffee Farm Expansion',
          location: 'Rwanda',
          size: '200 hectares',
          investmentAmount: 750000,
          expectedReturn: '15% ARR',
          term: '5 years',
          status: 'Open for Investment',
          fundingProgress: 35,
          details: {
            farmType: 'Coffee Plantation',
            currentProduction: '300 MT/year',
            projectedProduction: '500 MT/year'
          }
        },
        {
          id: 'I2',
          type: 'Farm Investment',
          title: 'Sustainable Tea Estate',
          location: 'India',
          size: '350 hectares',
          investmentAmount: 1200000,
          expectedReturn: '12% ARR',
          term: '7 years',
          status: 'Open for Investment',
          fundingProgress: 68,
          details: {
            farmType: 'Tea Estate',
            currentProduction: '450 MT/year',
            projectedProduction: '700 MT/year'
          }
        },
        {
          id: 'I3',
          type: 'Farm Investment',
          title: 'Organic Spice Farm Development',
          location: 'Indonesia',
          size: '150 hectares',
          investmentAmount: 500000,
          expectedReturn: '18% ARR',
          term: '4 years',
          status: 'Open for Investment',
          fundingProgress: 82,
          details: {
            farmType: 'Mixed Spice Plantation',
            currentProduction: '100 MT/year',
            projectedProduction: '250 MT/year'
          }
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterData = () => {
    if (filter.search) {
      // Simulate search filtering
      setTimeout(() => {
        // For demonstration, show empty results if search has "xyz"
        if (filter.search.includes('xyz')) {
          switch (tab) {
            case 0:
              setProduceListings([]);
              break;
            case 1:
              setFinanceListings([]);
              break;
            case 2:
              setInvestmentListings([]);
              break;
            default:
              break;
          }
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      filterData();
    }
  }, [filter, isLoading, tab]);

  // Helper function to determine grid sizing based on filter drawer state and view mode
  const getGridSizes = () => {
    if (gridView === 'compact') {
      return {
        xs: 12, // Always one card per row in compact view
        sm: 12,
        md: 12,
        lg: 12
      };
    }

    // Grid view with filter drawer open/closed logic
    if (openFilterDrawer) {
      return {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6
      };
    }
    return {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3
    };
  };

  // Render loading placeholders with animation
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: { xs: 2, md: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
        </Box>

        <Skeleton variant="rectangular" width={300} height={48} sx={{ borderRadius: 1, mb: 3 }} />

        <Grid container spacing={gridView === 'compact' ? 2 : 3}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Grow
              key={item}
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={(index + 1) * 200}
            >
              <Grid item xs={12} sm={6} md={gridView === 'compact' ? 12 : 4}>
                <EnhancedSkeletonPlaceholder />
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Box>
    );
  }

  // Get current listings based on selected tab
  const getCurrentListings = () => {
    switch (tab) {
      case 0:
        return produceListings;
      case 1:
        return financeListings;
      case 2:
        return investmentListings;
      default:
        return [];
    }
  };

  // Get listing type name based on selected tab
  const getListingType = () => {
    switch (tab) {
      case 0:
        return 'Agricultural Produce';
      case 1:
        return 'Trade Finance';
      case 2:
        return 'Farm Investment';
      default:
        return '';
    }
  };

  // Render marketplace content with animations
  const renderListings = () => {
    const currentListings = getCurrentListings();
    const gridSizes = getGridSizes();

    if (currentListings.length === 0) {
      return <EmptyState type={getListingType()} onClearFilters={handleClearFilters} />;
    }

    // Apply pagination to the data
    const paginatedListings = currentListings.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const cardComponents = {
      grid: {
        0: ProductCard,
        1: FinanceCard,
        2: InvestmentCard
      },
      compact: {
        0: CompactProductCard,
        1: CompactFinanceCard,
        2: CompactInvestmentCard
      }
    };

    const CardComponent = cardComponents[gridView][tab];

    return (
      <>
        <Grid container spacing={gridView === 'compact' ? 2 : 3}>
          {paginatedListings.map((item, index) => (
            <Grow
              key={item.id}
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={(index + 1) * 150}
            >
              <Grid item xs={gridSizes.xs} sm={gridSizes.sm} md={gridSizes.md} lg={gridSizes.lg}>
                <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
                  <CardComponent
                    data={item}
                    isFilterOpen={openFilterDrawer}
                  />
                </Box>
              </Grid>
            </Grow>
          ))}
        </Grid>

        {/* Pagination controls */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <TablePagination
            component="div"
            count={currentListings.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[6, 12, 24, 36]}
            labelRowsPerPage="Items per page:"
            sx={{
              '.MuiTablePagination-toolbar': { pl: 0 },
              '.MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon': {
                display: { xs: 'none', sm: 'block' }
              }
            }}
          />

          <Pagination
            count={Math.ceil(currentListings.length / rowsPerPage)}
            page={page + 1}
            onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
            color="primary"
            showFirstButton
            showLastButton
            shape="rounded"
          />
        </Box>
      </>
    );
  };

  // Toggle filter drawer with view adjustment
  const handleToggleFilterDrawer = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // Sort options
  const sortOptions = [
    { label: 'Newest', value: 'newest', icon: <ArrowDown2 size={16} /> },
    { label: 'Price: Low to High', value: 'price_asc', icon: <ArrowUp2 size={16} /> },
    { label: 'Price: High to Low', value: 'price_desc', icon: <ArrowDown2 size={16} /> },
    { label: 'Most Popular', value: 'popular', icon: null },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <MarketplaceFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleToggleFilterDrawer}
        initialState={initialState}
      />
      <Main theme={theme} open={openFilterDrawer} container={container}>
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Stack spacing={2.5}>
                <ProductsHeader
                  filter={filter}
                  handleDrawerOpen={handleToggleFilterDrawer}
                  setFilter={setFilter}
                />

                {/* Enhanced tabs and filters row */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: 2,
                  pb: 1
                }}>
                  <StyledTabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    TabIndicatorProps={{
                      children: <span className="MuiTabs-indicatorSpan" />,
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <StyledTab label="Agricultural Produce" />
                    <StyledTab label="Trade Finance" />
                    <StyledTab label="Farm Investment" />
                  </StyledTabs>

                  {/* Grid view toggle */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title={gridView === 'grid' ? 'List View' : 'Grid View'}>
                      <IconButton
                        onClick={toggleGridView}
                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100' }}
                      >
                        {gridView === 'grid' ? <Grid3x3 /> : <GridView />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Stack>
            </Grid>

            {/* Results Summary */}
            <Grid item xs={12}>
              <Fade in={true} timeout={500}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1.5
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Showing <strong>{getCurrentListings().length}</strong> results for <strong>{getListingType()}</strong>
                  </Typography>

                  {filter.search && (
                    <Chip
                      label={`Search: "${filter.search}"`}
                      size="small"
                      onDelete={() => setFilter({ ...filter, search: '' })}
                      sx={{ height: 24 }}
                    />
                  )}
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12}>
              {renderListings()}
            </Grid>
          </Grid>
        </Box>
      </Main>
    </Box>
  );
};

EmptyState.propTypes = {
  type: PropTypes.string.isRequired,
  onClearFilters: PropTypes.func
};

export default MarketplacePage;