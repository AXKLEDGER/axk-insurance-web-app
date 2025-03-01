import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { TextField, Grid, Button, MenuItem, Typography, Box, Autocomplete, CircularProgress, Backdrop } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import rwandaGeography from '../../../data/rwanda-geography.json';
import Image from 'next/image';
import { getAllCountries } from 'app/api/countries/route';

// Fallback list of countries
const fallbackCountries = [
  { label: 'Rwanda', code: 'RW', flag: 'https://flagcdn.com/rw.svg' },
  { label: 'United States', code: 'US', flag: 'https://flagcdn.com/us.svg' },
  { label: 'Canada', code: 'CA', flag: 'https://flagcdn.com/ca.svg' }
];

const validationSchema = Yup.object().shape({
  country: Yup.object().required('Country is required'),
  province: Yup.string().when('country', {
    is: (country) => country?.label === 'Rwanda',
    then: (schema) => schema.required('Province is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  district: Yup.string().when('country', {
    is: (country) => country?.label === 'Rwanda',
    then: (schema) => schema.required('District is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  sector: Yup.string().when('country', {
    is: (country) => country?.label === 'Rwanda',
    then: (schema) => schema.required('Sector is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  cell: Yup.string().when('country', {
    is: (country) => country?.label === 'Rwanda',
    then: (schema) => schema.required('Cell is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  village: Yup.string().when('country', {
    is: (country) => country?.label === 'Rwanda',
    then: (schema) => schema.required('Village is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  street: Yup.string().when('country.label', {
    is: (label) => label !== 'Rwanda',
    then: (schema) => schema.required('Street Address is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  city: Yup.string().when('country.label', {
    is: (label) => label !== 'Rwanda',
    then: (schema) => schema.required('City is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  state: Yup.string().when('country.label', {
    is: (label) => ['United States', 'Canada', 'Australia'].includes(label),
    then: (schema) => schema.required('State/Province is required'),
    otherwise: (schema) => schema.notRequired()
  }),
  postalCode: Yup.string().when('country.label', {
    is: (label) => ['United States', 'United Kingdom', 'Canada', 'Australia'].includes(label),
    then: (schema) => schema.required('Postal Code is required'),
    otherwise: (schema) => schema.notRequired()
  })
});

export default function ResidentialForm({ formData, setFormData, handleNext, handleBack }) {
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);
  const [villages, setVillages] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const formik = useFormik({
    initialValues: {
      country: formData.country || null,
      province: formData.province || '',
      district: formData.district || '',
      sector: formData.sector || '',
      cell: formData.cell || '',
      village: formData.village || '',
      street: formData.street || '',
      city: formData.city || '',
      state: formData.state || '',
      postalCode: formData.postalCode || '',
    },
    validationSchema,
    // validateOnMount: true, // Trigger form validation on mount
    onSubmit: (values) => {
      setFormData({ ...formData, ...values });
      handleNext();
    }
  });

  // Handle dependent field changes
  const handleDependentChange = (field, value, dependents) => {
    // Update the selected field's value
    formik.setFieldValue(field, value);

    // Reset all dependent fields
    dependents.forEach((dependentField) => {
      formik.setFieldValue(dependentField, '');
      switch (dependentField) {
        case 'district':
          setDistricts([]);
          break;
        case 'sector':
          setSectors([]);
          break;
        case 'cell':
          setCells([]);
          break;
        case 'village':
          setVillages([]);
          break;
        default:
          break;
      }
    });

    // Update options based on the field changed
    if (field === 'province') {
      const selectedProvince = rwandaGeography.find((prov) => prov.name === value);
      if (selectedProvince) {
        setDistricts(selectedProvince.districts.map((dist) => dist.name));
      } else {
        setDistricts([]);
      }
    } else if (field === 'district') {
      const selectedProvince = rwandaGeography.find((prov) => prov.name === formik.values.province);
      if (selectedProvince) {
        const selectedDistrict = selectedProvince.districts.find((dist) => dist.name === value);
        if (selectedDistrict) {
          setSectors(selectedDistrict.sectors.map((sec) => sec.name));
        } else {
          setSectors([]);
        }
      }
    } else if (field === 'sector') {
      const selectedProvince = rwandaGeography.find((prov) => prov.name === formik.values.province);
      if (selectedProvince) {
        const selectedDistrict = selectedProvince.districts.find((dist) => dist.name === formik.values.district);
        if (selectedDistrict) {
          const selectedSector = selectedDistrict.sectors.find((sec) => sec.name === value);
          if (selectedSector) {
            setCells(selectedSector.cells.map((cell) => cell.name));
          } else {
            setCells([]);
          }
        }
      }
    } else if (field === 'cell') {
      const selectedProvince = rwandaGeography.find((prov) => prov.name === formik.values.province);
      if (selectedProvince) {
        const selectedDistrict = selectedProvince.districts.find((dist) => dist.name === formik.values.district);
        if (selectedDistrict) {
          const selectedSector = selectedDistrict.sectors.find((sec) => sec.name === formik.values.sector);
          if (selectedSector) {
            const selectedCell = selectedSector.cells.find((cell) => cell.name === value);
            if (selectedCell) {
              setVillages(selectedCell.villages);
            } else {
              setVillages([]);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      setFetchError(false);

      try {
        const result = await getAllCountries();
        const countries = result.data;

        const countryOptions = countries
          .map((country) => ({
            label: country.name,
            code: country.alpha2Code,
            flag: country.flags.svg,
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setFetchError(true);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const detectUserCountry = async () => {
      setIsDetectingLocation(true);
      try {
        const response = await fetch('http://www.geoplugin.net/json.gp');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Extract the country code from GeoPlugin response
        const detectedCountryCode = data.geoplugin_countryCode;
        if (detectedCountryCode) {
          // Find the country in the list based on the code
          const detectedCountry = countries.find(
            (country) => country.code === detectedCountryCode
          );
          if (detectedCountry) {
            formik.setFieldValue('country', detectedCountry);
          }
        }
      } catch (error) {
        console.error('Error detecting user country:', error);
      } finally {
        setIsDetectingLocation(false);
      }
    };

    if (countries.length) detectUserCountry();
  }, [countries]);

  useEffect(() => {
    if (formik.values.country?.label === 'Rwanda') {
      setProvinces(rwandaGeography.map((province) => province.name));
      if (formik.values.province) {
        const selectedProvince = rwandaGeography.find((prov) => prov.name === formik.values.province);
        if (selectedProvince) {
          setDistricts(selectedProvince.districts.map((dist) => dist.name));

          if (formik.values.district) {
            const selectedDistrict = selectedProvince.districts.find((dist) => dist.name === formik.values.district);
            if (selectedDistrict) {
              setSectors(selectedDistrict.sectors.map((sec) => sec.name));

              if (formik.values.sector) {
                const selectedSector = selectedDistrict.sectors.find((sec) => sec.name === formik.values.sector);
                if (selectedSector) {
                  setCells(selectedSector.cells.map((cell) => cell.name));

                  if (formik.values.cell) {
                    const selectedCell = selectedSector.cells.find((cell) => cell.name === formik.values.cell);
                    if (selectedCell) {
                      setVillages(selectedCell.villages);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      setProvinces([]);
      setDistricts([]);
      setSectors([]);
      setCells([]);
      setVillages([]);
    }
  }, [formik.values.country, formik.values.province, formik.values.district, formik.values.sector, formik.values.cell]);

  return (
    <Box position="relative">
      <Backdrop
        open={isLoadingCountries || isDetectingLocation}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {isLoadingCountries
            ? 'Loading country data...'
            : 'Detecting your location. Please wait.'}
        </Typography>
      </Backdrop>

      <form onSubmit={formik.handleSubmit} style={{ filter: isLoadingCountries ? 'blur(3px)' : 'none' }}>
        <Typography variant="h5" gutterBottom>
          Residential Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option.label}
              value={formik.values.country}
              onChange={(event, value) => formik.setFieldValue('country', value)}
              onBlur={() => formik.setFieldTouched('country', true)}
              loading={isLoadingCountries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country *"
                  fullWidth
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        {formik.values.country?.flag && (
                          <Box
                            component="img"
                            src={formik.values.country.flag}
                            alt={`${formik.values.country.label} flag`}
                            sx={{
                              width: 24,
                              height: 16,
                              borderRadius: '3px',
                              marginRight: 1,
                              objectFit: 'cover'
                            }}
                          />
                        )}
                        {params.InputProps.startAdornment}
                      </>
                    )
                  }}
                />
              )}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: '8px 16px'
                  }}
                >
                  <Image
                    src={option.flag}
                    alt={`${option.label} flag`}
                    width="24"
                    height="16"
                    style={{ borderRadius: '3px', objectFit: 'cover' }}
                  />
                  <Typography variant="body1">{option.label}</Typography>
                </Box>
              )}
              isOptionEqualToValue={(option, value) => option.label === value.label}
            />
            {fetchError && (
              <Typography variant="body2" color="error">
                Something went wrong while fetching countries.
              </Typography>
            )}
          </Grid>

          {formik.values.country ? (
            <>
              {formik.values.country?.label === 'Rwanda' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Province *"
                      fullWidth
                      value={formik.values.province}
                      onChange={(e) => handleDependentChange('province', e.target.value, ['district', 'sector', 'cell', 'village'])}
                      error={formik.touched.province && Boolean(formik.errors.province)}
                      helperText={formik.touched.province && formik.errors.province}
                      disabled={isLoadingCountries}
                    >
                      {provinces.map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="District *"
                      fullWidth
                      value={formik.values.district}
                      onChange={(e) => handleDependentChange('district', e.target.value, ['sector', 'cell', 'village'])}
                      error={formik.touched.district && Boolean(formik.errors.district)}
                      helperText={formik.touched.district && formik.errors.district}
                      disabled={!districts.length}
                    >
                      {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Sector *"
                      fullWidth
                      value={formik.values.sector}
                      onChange={(e) => handleDependentChange('sector', e.target.value, ['cell', 'village'])}
                      error={formik.touched.sector && Boolean(formik.errors.sector)}
                      helperText={formik.touched.sector && formik.errors.sector}
                      disabled={!sectors.length}
                    >
                      {sectors.map((sector) => (
                        <MenuItem key={sector} value={sector}>
                          {sector}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Cell *"
                      fullWidth
                      value={formik.values.cell}
                      onChange={(e) => handleDependentChange('cell', e.target.value, ['village'])}
                      error={formik.touched.cell && Boolean(formik.errors.cell)}
                      helperText={formik.touched.cell && formik.errors.cell}
                      disabled={!cells.length}
                    >
                      {cells.map((cell) => (
                        <MenuItem key={cell} value={cell}>
                          {cell}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Village *"
                      fullWidth
                      value={formik.values.village}
                      onChange={(e) => formik.setFieldValue('village', e.target.value)}
                      error={formik.touched.village && Boolean(formik.errors.village)}
                      helperText={formik.touched.village && formik.errors.village}
                      disabled={!villages.length}
                    >
                      {villages.map((village) => (
                        <MenuItem key={village} value={village}>
                          {village}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}
              {formik.values.country?.label !== 'Rwanda' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="Street Address *"
                      fullWidth
                      {...formik.getFieldProps('street')}
                      error={formik.touched.street && Boolean(formik.errors.street)}
                      helperText={formik.touched.street && formik.errors.street}
                      disabled={isLoadingCountries}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="City *"
                      fullWidth
                      {...formik.getFieldProps('city')}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                      disabled={isLoadingCountries}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={
                        <>
                          State/Province
                          {['United States', 'Canada', 'Australia'].includes(formik.values.country?.label) && (
                            <span style={{ color: 'red' }}> *</span>
                          )}
                        </>
                      }
                      fullWidth
                      {...formik.getFieldProps('state')}
                      error={formik.touched.state && Boolean(formik.errors.state)}
                      helperText={formik.touched.state && formik.errors.state}
                      disabled={isLoadingCountries}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={
                        <>
                          Postal Code
                          {['United States', 'United Kingdom', 'Canada', 'Australia'].includes(formik.values.country?.label) && (
                            <span style={{ color: 'red' }}> *</span>
                          )}
                        </>
                      }
                      fullWidth
                      {...formik.getFieldProps('postalCode')}
                      error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                      helperText={formik.touched.postalCode && formik.errors.postalCode}
                      disabled={isLoadingCountries}
                    />
                  </Grid>
                </>
              )}
            </>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Please select your country to proceed.
            </Typography>
          )}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={isLoadingCountries}
              >
                Back
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? <CircularProgress size={24} /> : 'Next'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

ResidentialForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};
