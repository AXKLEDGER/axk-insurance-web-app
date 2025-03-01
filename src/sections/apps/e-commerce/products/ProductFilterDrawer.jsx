import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// MUI Components
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Divider,
  Chip,
  Slider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  IconButton
} from '@mui/material';

// Project imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// Icons
import {
  FilterList as FilterListIcon,
  Close as CloseIcon,
  LocationOn as LocationIcon,
  VerifiedUser as VerifiedIcon,
  Landscape as LandIcon,
  Agriculture as FarmIcon,
  AccountBalance as FinanceIcon,
  LocalShipping as LogisticsIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';

const defaultFilter = {
  category: 'all',
  locations: [],
  certifications: [],
  productTypes: [],
  priceRange: [0, 1000000],
  quantityRange: [0, 10000],
  landSize: [0, 1000],
  financingType: [],
  rating: 0,
  search: '',
  sort: ''
};

const FilterSection = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" fontWeight="600" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);

FilterSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default function MarketplaceFilterDrawer({
  filter = defaultFilter,
  initialState = defaultFilter,
  handleDrawerOpen,
  openFilterDrawer = false,
  setFilter
}) {
  const theme = useTheme();
  const { container } = useConfig();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchLG = useMediaQuery(theme.breakpoints.only('lg'));
  const drawerBG = theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'white';

  const [priceRange, setPriceRange] = useState(filter.priceRange || [0, 1000000]);
  const [quantityRange, setQuantityRange] = useState(filter.quantityRange || [0, 10000]);
  const [landSize, setLandSize] = useState(filter.landSize || [0, 1000]);

  const categories = [
    { id: 'all', label: 'All Categories', icon: FilterListIcon },
    { id: 'produce', label: 'Agricultural Produce', icon: FarmIcon },
    { id: 'land', label: 'Land & Properties', icon: LandIcon },
    { id: 'finance', label: 'Trade Finance', icon: FinanceIcon },
    { id: 'logistics', label: 'Logistics', icon: LogisticsIcon },
    { id: 'equipment', label: 'Farm Equipment', icon: InventoryIcon }
  ];

  const locations = [
    'Ethiopia', 'Kenya', 'Rwanda', 'Uganda', 'Tanzania',
    'Ghana', 'Côte d\'Ivoire', 'Nigeria', 'Senegal', 'South Africa'
  ];

  const certifications = [
    'Organic', 'Fair Trade', 'ISO Certified', 'GLOBALG.A.P.',
    'Quality Assured', 'Halal', 'Food Safety Certified'
  ];

  const handleFilter = (type, value) => {
    const safeFilter = { ...defaultFilter, ...filter };

    switch (type) {
      case 'category':
        setFilter({ ...safeFilter, category: value });
        break;
      case 'locations':
        if (safeFilter.locations?.includes(value)) {
          setFilter({
            ...safeFilter,
            locations: safeFilter.locations.filter(item => item !== value)
          });
        } else {
          setFilter({
            ...safeFilter,
            locations: [...(safeFilter.locations || []), value]
          });
        }
        break;
      case 'certifications':
        if (safeFilter.certifications?.includes(value)) {
          setFilter({
            ...safeFilter,
            certifications: safeFilter.certifications.filter(item => item !== value)
          });
        } else {
          setFilter({
            ...safeFilter,
            certifications: [...(safeFilter.certifications || []), value]
          });
        }
        break;
      case 'priceRange':
        setFilter({ ...safeFilter, priceRange: value });
        setPriceRange(value);
        break;
      case 'quantityRange':
        setFilter({ ...safeFilter, quantityRange: value });
        setQuantityRange(value);
        break;
      case 'landSize':
        setFilter({ ...safeFilter, landSize: value });
        setLandSize(value);
        break;
      case 'reset':
        setFilter(initialState);
        setPriceRange([0, 1000000]);
        setQuantityRange([0, 10000]);
        setLandSize([0, 1000]);
        break;
      default:
        break;
    }
  };

  const renderCategorySpecificFilters = () => {
    switch (filter?.category) {
      case 'produce':
        return (
          <FilterSection title="Quantity Available (MT)">
            <Slider
              value={quantityRange}
              onChange={(_, value) => handleFilter('quantityRange', value)}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              marks={[
                { value: 0, label: '0' },
                { value: 5000, label: '5K' },
                { value: 10000, label: '10K' }
              ]}
            />
          </FilterSection>
        );
      case 'land':
        return (
          <FilterSection title="Land Size (Hectares)">
            <Slider
              value={landSize}
              onChange={(_, value) => handleFilter('landSize', value)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              marks={[
                { value: 0, label: '0' },
                { value: 500, label: '500' },
                { value: 1000, label: '1000' }
              ]}
            />
          </FilterSection>
        );
      case 'finance':
        return (
          <FilterSection title="Financing Type">
            <RadioGroup
              value={filter.financingType}
              onChange={(e) => handleFilter('financingType', e.target.value)}
            >
              <FormControlLabel value="loan" control={<Radio />} label="Trade Loan" />
              <FormControlLabel value="invoice" control={<Radio />} label="Invoice Financing" />
              <FormControlLabel value="warehouse" control={<Radio />} label="Warehouse Receipt" />
              <FormControlLabel value="leasing" control={<Radio />} label="Equipment Leasing" />
            </RadioGroup>
          </FilterSection>
        );
      default:
        return null;
    }
  };

  const drawerContent = (
    <Stack sx={{ p: 3 }} spacing={0.5}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon />
          <Typography variant="h6">Filters</Typography>
        </Box>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleFilter('reset')}
        >
          Reset All
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Categories */}
      <FilterSection title="Category">
        <RadioGroup
          value={filter?.category}
          onChange={(e) => handleFilter('category', e.target.value)}
        >
          {categories.map(({ id, label, icon: Icon }) => (
            <FormControlLabel
              key={id}
              value={id}
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon sx={{ fontSize: 20 }} />
                  <Typography>{label}</Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </FilterSection>

      {/* Locations */}
      <FilterSection title="Location">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {locations.map((location) => (
            <Chip
              key={location}
              label={location}
              icon={<LocationIcon sx={{ fontSize: 16 }} />}
              onClick={() => handleFilter('locations', location)}
              color={filter.locations?.includes(location) ? 'primary' : 'default'}
              variant={filter.locations?.includes(location) ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range (USD)">
        <Slider
          value={priceRange}
          onChange={(_, value) => handleFilter('priceRange', value)}
          valueLabelDisplay="auto"
          min={0}
          max={1000000}
          marks={[
            { value: 0, label: '$0' },
            { value: 500000, label: '$500K' },
            { value: 1000000, label: '$1M' }
          ]}
        />
      </FilterSection>

      {/* Certifications */}
      <FilterSection title="Certifications">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {certifications.map((cert) => (
            <Chip
              key={cert}
              label={cert}
              icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
              onClick={() => handleFilter('certifications', cert)}
              color={filter.certifications?.includes(cert) ? 'primary' : 'default'}
              variant={filter.certifications?.includes(cert) ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </FilterSection>

      {/* Category Specific Filters */}
      {renderCategorySpecificFilters()}
    </Stack>
  );

  return (
    <Drawer
      sx={{
        width: container && matchLG ? 240 : 320,
        flexShrink: 0,
        zIndex: { xs: 1200, lg: 0 },
        mr: openFilterDrawer && !matchDownLG ? 2.5 : 0,
        '& .MuiDrawer-paper': {
          height: matchDownLG ? '100%' : 'auto',
          width: container && matchLG ? 240 : 320,
          boxSizing: 'border-box',
          position: 'relative',
          boxShadow: 'none'
        }
      }}
      variant={matchDownLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openFilterDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard
        title="Filter"
        sx={{
          bgcolor: matchDownLG ? 'transparent' : drawerBG,
          borderRadius: '4px 0 0 4px',
          borderRight: 'none'
        }}
        border={!matchDownLG}
        content={false}
      >
        {matchDownLG && <SimpleBar sx={{ height: `calc(100vh - 62px)` }}>{drawerContent}</SimpleBar>}
        {!matchDownLG && drawerContent}
      </MainCard>
    </Drawer>
  );
}

MarketplaceFilterDrawer.propTypes = {
  filter: PropTypes.shape({
    category: PropTypes.string,
    locations: PropTypes.array,
    certifications: PropTypes.array,
    productTypes: PropTypes.array,
    priceRange: PropTypes.array,
    quantityRange: PropTypes.array,
    landSize: PropTypes.array,
    financingType: PropTypes.string,
    rating: PropTypes.number,
    search: PropTypes.string,
    sort: PropTypes.string
  }),
  initialState: PropTypes.object,
  handleDrawerOpen: PropTypes.func,
  openFilterDrawer: PropTypes.bool,
  setFilter: PropTypes.func
};