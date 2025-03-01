import PropTypes from 'prop-types';
import { TextField, Grid, Button, Typography, Box, MenuItem, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .test(
      'is-valid-phone',
      'Please enter a valid phone number including the country code',
      (value) => {
        if (!value) return false;

        try {
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber && phoneNumber.isValid();
        } catch (error) {
          console.error('Phone validation error:', error);
          return false;
        }
      }
    ),
  gender: Yup.string().required('Gender is required')
});

const StyledPhoneInput = styled(Box)(({ theme }) => ({
  '.react-tel-input .form-control': {
    width: '100%',
    height: '56px',
    paddingLeft: '60px',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '16px',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  '.react-tel-input .form-control:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 8px ${theme.palette.primary.main}80`,
  },
  '.react-tel-input .flag-dropdown': {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px 0 0 8px',
    padding: '0 8px',
  },
  '.react-tel-input .country-list': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    maxHeight: '300px',
    overflowY: 'auto',
    boxShadow: theme.shadows[4],
  },
  '.react-tel-input .country-list .country': {
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '& img': {
      borderRadius: '50%',
    },
    '& span': {
      fontWeight: 500,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '.react-tel-input .search': {
    padding: '8px 16px',
    margin: '8px auto', // Centered horizontally
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    maxWidth: '400px', // Ensures it doesn’t stretch too wide
    width: 'calc(100% - 32px)', // Dynamic width with margin on smaller screens
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
    transition: 'box-shadow 0.2s, border-color 0.2s',
    '&:hover': {
      borderColor: theme.palette.primary.light,
      boxShadow: theme.shadows[3],
    },
    '&:focus-within': {
      borderColor: theme.palette.primary.main,
      boxShadow: theme.shadows[4],
    },
    '& input': {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: '14px',
      color: theme.palette.text.primary,
      padding: '4px 0',
      fontFamily: theme.typography.fontFamily,
    },
    '& input::placeholder': {
      color: theme.palette.text.secondary,
    },
    '& input:focus': {
      outline: 'none',
    },
  },
}));

export default function PersonalInfoForm({ formData, setFormData, handleNext }) {
  const theme = useTheme();
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [detectedCountryCode, setDetectedCountryCode] = useState('us');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      gender: formData.gender || ''
    },
    validationSchema,
    onSubmit: (values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      handleNext();
    }
  });

  const getBaseUrl = () => {
    if (process.env.NODE_ENV === "production") {
      return process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
    }
    return process.env.NEXT_PUBLIC_API_BASE_URL_DEV;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      setFetchError(false);

      const baseUrl = getBaseUrl();

      try {
        const response = await fetch(`${baseUrl}/country`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const countries = result.data.map((country) => ({
          label: country.name,
          code: country.alpha2Code.toLowerCase(), // Ensure lowercase
          flag: country.flags.svg,
        }));

        setCountries(countries);
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

      const baseUrl = getBaseUrl();

      try {
        // Step 1: Fetch user's public IP
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error(`IP fetch error! status: ${ipResponse.status}`);

        const { ip } = await ipResponse.json();

        // Step 2: Fetch geolocation using the IP and the primary API
        try {
          const geoResponse = await fetch(`${baseUrl}/geo?ip=${ip}`);
          if (!geoResponse.ok) throw new Error(`Geolocation fetch error! status: ${geoResponse.status}`);

          const geoData = await geoResponse.json();
          console.log('Primary GeoData:', geoData);
          const countryCode = geoData.data?.country_code?.toLowerCase();
          if (countryCode) {
            setDetectedCountryCode(countryCode);

            const detectedCountry = countries.find(
              (country) => country.code === countryCode
            );

            if (detectedCountry) {
              formik.setFieldValue('phone', `+${detectedCountry.code}`);
              return; // Exit on successful fetch
            }
          }

          throw new Error('Country code not found in primary API response.');
        } catch (primaryError) {
          console.error('Primary API failed:', primaryError);

          // Step 3: Use fallback API
          const geoResponseFallback = await fetch(`https://reallyfreegeoip.org/json/${ip}`);
          if (!geoResponseFallback.ok) throw new Error(`Fallback API error! status: ${geoResponseFallback.status}`);

          const geoDataFallback = await geoResponseFallback.json();
          console.log('Fallback GeoData:', geoDataFallback);
          const fallbackCountryCode = geoDataFallback.country_code?.toLowerCase();
          setDetectedCountryCode(fallbackCountryCode || 'us');

          const detectedCountryFallback = countries.find(
            (country) => country.code === fallbackCountryCode
          );

          if (detectedCountryFallback) {
            formik.setFieldValue('phone', `+${detectedCountryFallback.code}`);
            return; // Exit on successful fallback fetch
          }

          throw new Error('Country code not found in fallback API response.');
        }
      } catch (finalError) {
        console.error('Both Primary and Fallback APIs failed:', finalError);

        // Step 4: Default to 'us' if both APIs fail
        setDetectedCountryCode('us');
        const defaultCountry = countries.find((country) => country.code === 'us');
        if (defaultCountry) {
          formik.setFieldValue('phone', `+${defaultCountry.code}`);
        }
      } finally {
        setIsDetectingLocation(false);
      }
    };

    if (countries.length) detectUserCountry();
  }, [countries]);

  const handlePhoneChange = (value) => {
    console.log('Phone Input Changed:', value);

    if (value) {
      try {
        const formattedValue = value.startsWith('+') ? value : `+${value}`;
        const phoneNumber = parsePhoneNumberFromString(formattedValue);

        if (phoneNumber && phoneNumber.isValid()) {
          console.log('Valid Phone Number:', phoneNumber.number);
          formik.setFieldValue('phone', phoneNumber.number);
          formik.setFieldError('phone', '');
        } else {
          console.error('Invalid Phone Number:', formattedValue);
          formik.setFieldError('phone', 'Invalid phone number. Please include the country code.');
        }
      } catch (error) {
        console.error('Error Parsing Phone Number:', error);
        formik.setFieldError('phone', 'Error validating phone number.');
      }
    } else {
      console.warn('Phone Input Cleared');
      formik.setFieldValue('phone', '');
      formik.setFieldError('phone', 'Phone number is required.');
    }
  };

  // console.log('Formik State:', {
  //   values: formik.values,
  //   errors: formik.errors,
  //   touched: formik.touched,
  //   isValid: formik.isValid,
  // });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name *"
            fullWidth
            {...formik.getFieldProps('firstName')}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name *"
            fullWidth
            {...formik.getFieldProps('lastName')}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            inputProps={{
              readOnly: formik.values.email ? true : false // Ensure the email field is read-only
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Phone Number *
          </Typography>
          <StyledPhoneInput>
            {isLoadingCountries || isDetectingLocation ? (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <PhoneInput
                country={detectedCountryCode}
                value={formik.values.phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phone',
                  required: true,
                }}
                enableSearch
              />
            )}
          </StyledPhoneInput>
          {formik.touched.phone && formik.errors.phone && (
            <Typography color="error" variant="caption">
              {formik.errors.phone}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Gender *"
            {...formik.getFieldProps('gender')}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
            fullWidth
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
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
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderRadius: '8px',
                textTransform: 'none',
                padding: '8px 24px',
                boxShadow: theme.shadows[3],
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: theme.shadows[4],
                },
              }}
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

PersonalInfoForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
