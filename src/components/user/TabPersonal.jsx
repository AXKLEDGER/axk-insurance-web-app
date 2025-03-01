import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';

// next
import Image from 'next/image';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import MainCard from 'components/MainCard';
import countries from 'data/countries';
import { openSnackbar } from 'app/api/snackbar';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function TabPersonal() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    setUserData(user);
  }, []);

  const inputRef = useRef();

  const getCountryCode = (country) => {
    const selectedCountry = countries.find((c) => c.code === country);
    return selectedCountry ? selectedCountry.phone : '';
  };

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Formik
        initialValues={{
          firstname: userData?.profile?.full_name?.split(' ')[0] || '',
          lastname: userData?.profile?.full_name?.split(' ')[1] || '',
          email: userData?.email || '',
          contact: userData?.profile?.phone_number || '',
          address: userData?.profile?.address || '',
          country: userData?.profile?.country || '',
          state: userData?.profile?.city || '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required.'),
          lastname: Yup.string().max(255).required('Last Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          contact: Yup.string().required('Phone number is required'),
          address: Yup.string().required('Address is required'),
          country: Yup.string().required('Country is required'),
          state: Yup.string().required('State is required')
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            openSnackbar({
              open: true,
              message: 'Personal profile updated successfully.',
              variant: 'alert',
              alert: { color: 'success' }
            });
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-first-name"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                    />
                  </Stack>
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="personal-first-name-helper">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </Stack>
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="personal-last-name-helper">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Email Address"
                    />
                  </Stack>
                  {touched.email && errors.email && (
                    <FormHelperText error id="personal-email-helper">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <TextField
                        fullWidth
                        id="personal-contact"
                        value={values.contact}
                        name="contact"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        InputProps={{
                          startAdornment: <Box sx={{ mr: 1 }}>{getCountryCode(values.country)}</Box>
                        }}
                      />
                    </Stack>
                  </Stack>
                  {touched.contact && errors.contact && (
                    <FormHelperText error id="personal-contact-helper">
                      {errors.contact}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-addrees1">Address</InputLabel>
                    <TextField
                      multiline
                      rows={3}
                      fullWidth
                      id="personal-addrees1"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Address"
                    />
                  </Stack>
                  {touched.address && errors.address && (
                    <FormHelperText error id="personal-address-helper">
                      {errors.address}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-country">Country</InputLabel>
                    <Autocomplete
                      id="personal-country"
                      fullWidth
                      value={countries.find((item) => item.code === values.country) || null}
                      onBlur={handleBlur}
                      onChange={(event, newValue) => {
                        setFieldValue('country', newValue ? newValue.code : '');
                      }}
                      options={countries}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => {
                        const { key, ...rest } = props;
                        return (
                          <Box component="li" key={key} {...rest}>
                            {option.label} ({option.code})
                          </Box>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Choose a country"
                          name="country"
                          inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                        />
                      )}
                    />
                  </Stack>
                  {touched.country && errors.country && (
                    <FormHelperText error id="personal-country-helper">
                      {errors.country}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-state">State</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-state"
                      value={values.state}
                      name="state"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="State"
                    />
                  </Stack>
                  {touched.state && errors.state && (
                    <FormHelperText error id="personal-state-helper">
                      {errors.state}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                  Save
                </Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}

TabPersonal.propTypes = { key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) };
