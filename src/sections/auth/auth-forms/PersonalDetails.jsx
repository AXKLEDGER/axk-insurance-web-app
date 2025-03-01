import PropTypes from 'prop-types';
import { TextField, Grid, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function PersonalDetails({ formData, setFormData, handleNext, handleBack }) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    ...(formData.accountType === 'wholesale' && {
      businessName: Yup.string().required('Business Name is required'),
      registrationNumber: Yup.string().required('Registration Number is required')
    }),
    ...(formData.accountType === 'cooperative' && {
      cooperativeName: Yup.string().required('Cooperative Name is required')
    }),
    ...(formData.accountType === 'largeScale' && {
      farmName: Yup.string().required('Farm Name is required'),
      farmSize: Yup.number().positive('Must be a positive number').required('Farm Size is required'),
      cropTypes: Yup.string().required('Crop Types are required')
    })
  });

  const formik = useFormik({
    initialValues: { ...formData },
    validationSchema,
    onSubmit: (values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      handleNext();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Enter Your Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            fullWidth
            {...formik.getFieldProps('firstName')}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        {/* Dynamic fields for Wholesale */}
        {formData.accountType === 'wholesale' && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Business Name"
                fullWidth
                {...formik.getFieldProps('businessName')}
                error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                helperText={formik.touched.businessName && formik.errors.businessName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Registration Number"
                fullWidth
                {...formik.getFieldProps('registrationNumber')}
                error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
                helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
              />
            </Grid>
          </>
        )}
        {/* Cooperative Fields */}
        {formData.accountType === 'cooperative' && (
          <Grid item xs={12}>
            <TextField
              label="Cooperative Name"
              fullWidth
              {...formik.getFieldProps('cooperativeName')}
              error={formik.touched.cooperativeName && Boolean(formik.errors.cooperativeName)}
              helperText={formik.touched.cooperativeName && formik.errors.cooperativeName}
            />
          </Grid>
        )}
        {/* Large Scale Farmer Fields */}
        {formData.accountType === 'largeScale' && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Farm Name"
                fullWidth
                {...formik.getFieldProps('farmName')}
                error={formik.touched.farmName && Boolean(formik.errors.farmName)}
                helperText={formik.touched.farmName && formik.errors.farmName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Farm Size (in acres)"
                fullWidth
                {...formik.getFieldProps('farmSize')}
                error={formik.touched.farmSize && Boolean(formik.errors.farmSize)}
                helperText={formik.touched.farmSize && formik.errors.farmSize}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Crop Types"
                fullWidth
                {...formik.getFieldProps('cropTypes')}
                error={formik.touched.cropTypes && Boolean(formik.errors.cropTypes)}
                helperText={formik.touched.cropTypes && formik.errors.cropTypes}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

PersonalDetails.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};
