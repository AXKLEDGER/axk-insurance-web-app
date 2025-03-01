import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  accountType: Yup.string().required('Account type is required.'),

  purpose: Yup.string().when('accountType', {
    is: 'flow',
    then: (schema) => schema.required('Please describe your purpose for using Afrikabal.'),
    otherwise: (schema) => schema.nullable(),
  }),

  sourceOfFunds: Yup.string().when('accountType', {
    is: 'flow',
    then: (schema) => schema.required('Please specify your source of funds.'),
    otherwise: (schema) => schema.nullable(),
  }),

  customSourceOfFunds: Yup.string().when('sourceOfFunds', {
    is: 'Other',
    then: (schema) => schema.required('Please specify your source of funds.'),
    otherwise: (schema) => schema.nullable(),
  }),

  titanType: Yup.string().when('accountType', {
    is: 'titan',
    then: (schema) => schema.required('Please specify whether you are registering as a business or an individual.'),
    otherwise: (schema) => schema.nullable(),
  }),

  businessName: Yup.string().when(['accountType', 'titanType'], {
    is: (accountType, titanType) => accountType === 'titan' && titanType === 'business',
    then: (schema) => schema.required('Business Name is required.'),
    otherwise: (schema) => schema.nullable(),
  }),

  registrationNumber: Yup.string().when(['accountType', 'titanType'], {
    is: (accountType, titanType) => accountType === 'titan' && titanType === 'business',
    then: (schema) => schema.required('Registration Number is required.'),
    otherwise: (schema) => schema.nullable(),
  }),

  taxId: Yup.string().when(['accountType', 'titanType'], {
    is: (accountType, titanType) => accountType === 'titan' && titanType === 'business',
    then: (schema) => schema.required('Tax Identification Number is required.'),
    otherwise: (schema) => schema.nullable(),
  }),

  wealthSource: Yup.string().when(['accountType', 'titanType'], {
    is: (accountType, titanType) => accountType === 'titan' && titanType === 'individual',
    then: (schema) => schema.required('Please specify your source of wealth.'),
    otherwise: (schema) => schema.nullable(),
  }),

  declarationPurpose: Yup.string().when(['accountType', 'titanType'], {
    is: (accountType, titanType) => accountType === 'titan' && titanType === 'individual',
    then: (schema) => schema.required('Please describe your purpose for engaging in bulk purchases.'),
    otherwise: (schema) => schema.nullable(),
  }),

  incomeRange: Yup.string().when('accountType', {
    is: (accountType) => accountType && !['agriAlliance', 'proHarvest'].includes(accountType),
    then: (schema) => schema.required('Please specify your income range.'),
    otherwise: (schema) => schema.nullable(),
  }),


  cooperativeName: Yup.string().when('accountType', {
    is: 'agriAlliance',
    then: (schema) => schema.required('Please enter your cooperative’s registered name.'),
    otherwise: (schema) => schema.nullable(),
  }),

  cooperativeMembers: Yup.number().when('accountType', {
    is: 'agriAlliance',
    then: (schema) =>
      schema
        .typeError('Number of Members must be a valid number.')
        .required('Please specify the number of members in your cooperative.')
        .positive('Number of Members must be greater than zero.')
        .integer('Number of Members must be an integer.'),
    otherwise: (schema) => schema.nullable(),
  }),

  cropGroups: Yup.string().when('accountType', (accountType, schema) => {
    if (['agriAlliance', 'proHarvest'].includes(accountType)) {
      return schema.required(
        accountType === 'agriAlliance'
          ? 'Please specify the crop group your cooperative focuses on.'
          : 'Please specify the crop group your farm focuses on.'
      );
    }
    return schema.nullable();
  }),

  specificCrops: Yup.string().when(['cropGroups', 'accountType'], ([cropGroups, accountType], schema) => {
    if (['flow', 'titan'].includes(accountType)) {
      return schema.nullable();
    }
    return cropGroups !== 'Other'
      ? schema.required('Please specify the crops within the selected group.')
      : schema.nullable();
  }),

  bulkPurchasePurpose: Yup.string().when('accountType', {
    is: (accountType) => accountType && !['agriAlliance', 'proHarvest', 'flow'].includes(accountType),
    then: (schema) => schema.required('Please specify your purpose for bulk purchasing.'),
    otherwise: (schema) => schema.nullable(),
  }),

  isLegalRepresentative: Yup.string().when('accountType', {
    is: 'agriAlliance',
    then: (schema) => schema.required('Please confirm if you are the legal representative.'),
    otherwise: (schema) => schema.nullable(),
  }),

  cooperativePurpose: Yup.string().when('accountType', {
    is: 'agriAlliance',
    then: (schema) => schema.required('Please describe the purpose of your cooperative’s activity on Afrikabal.'),
    otherwise: (schema) => schema.nullable(),
  }),

  farmName: Yup.string().when('accountType', {
    is: 'proHarvest',
    then: (schema) => schema.required('Farm Name is required.'),
    otherwise: (schema) => schema.nullable(),
  }),

  farmSize: Yup.number().when('accountType', {
    is: 'proHarvest',
    then: (schema) =>
      schema
        .typeError('Farm size must be a number.')
        .positive('Farm size must be greater than zero.')
        .required('Farm Size is required.'),
    otherwise: (schema) => schema.nullable(),
  }),

  farmPurpose: Yup.string().when('accountType', {
    is: 'proHarvest',
    then: (schema) => schema.required('Please describe the purpose of your farm’s activity on Afrikabal.'),
    otherwise: (schema) => schema.nullable(),
  }),
});

const SlideTransition = (props) => <Slide {...props} direction="up" />;
export default function AdditionalInfoForm({ formData, setFormData, handleNext, handleBack }) {
  const [customInputs, setCustomInputs] = useState({});
  const [customValues, setCustomValues] = useState({});
  const [toast, setToast] = useState({ open: false, message: '', color: '', type: '' });

  const formik = useFormik({
    initialValues: {
      accountType: formData.accountType || '',
      titanType: formData.titanType || '',
      purpose: formData.purpose || '',
      sourceOfFunds: formData.sourceOfFunds || '',
      customSourceOfFunds: formData.customSourceOfFunds || '',
      businessName: formData.businessName || '',
      registrationNumber: formData.registrationNumber || '',
      taxId: formData.taxId || '',
      wealthSource: formData.wealthSource || '',
      declarationPurpose: formData.declarationPurpose || '',
      cooperativeName: formData.cooperativeName || '',
      cooperativeMembers: formData.cooperativeMembers || '',
      isLegalRepresentative: formData.isLegalRepresentative || '',
      cooperativePurpose: formData.cooperativePurpose || '',
      farmName: formData.farmName || '',
      farmSize: formData.farmSize || '',
      cropTypes: formData.cropTypes || '',
      farmPurpose: formData.farmPurpose || '',
      incomeRange: formData.incomeRange || '',
      cropGroups: formData.cropGroups || '',
      specificCrops: formData.specificCrops || '',
      bulkPurchasePurpose: formData.bulkPurchasePurpose || '',
    },
    validationSchema,
    validateOnMount: false,
    validateOnBlur: true,
    // validateOnChange: true,
    onSubmit: (values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      handleNext();
    },
  });

  useEffect(() => {
    console.log('Formik Values:', formik.values);
  }, [formik.values]);

  useEffect(() => {
    console.log('Formik Errors:', formik.errors);
  }, [formik.errors]);

  const handleCustomField = (field, isCustom) => {
    setCustomInputs((prev) => ({ ...prev, [field]: isCustom }));
    if (!isCustom) {
      setCustomValues((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleCustomValueChange = (field, value) => {
    setCustomValues((prev) => ({ ...prev, [field]: value }));
    formik.setFieldValue(field, value);
  };

  const triggerToast = (message, color, type) => {
    setToast({ open: true, message, color, type });
    setTimeout(() => {
      setToast({ open: false, message: '', color: '', type: '' });
    }, 5000);
  };

  const renderSelectWithOther = (field, label, options, customLabel) => (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id={`${field}-label`}>{label}</InputLabel>
          <Select
            labelId={`${field}-label`}
            name={field}
            value={customInputs[field] ? 'Other' : formik.values[field]}
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'Other') {
                handleCustomField(field, true);
                formik.setFieldValue(field, 'Other');
              } else {
                handleCustomField(field, false);
                formik.setFieldValue(field, value);
              }
            }}
            error={formik.touched[field] && Boolean(formik.errors[field])}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {customInputs[field] && (
        <Grid item xs={12}>
          <TextField
            label={customLabel || `Specify your ${label.toLowerCase()}`}
            name={field}
            fullWidth
            value={customValues[field] || ''}
            onChange={(e) => handleCustomValueChange(field, e.target.value)}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
          />
        </Grid>
      )}
    </>
  );


  const renderRoleSpecificFields = (accountType) => {
    switch (accountType) {
      case 'flow': // Simplest role
        return (
          <>
            {renderSelectWithOther(
              'purpose',
              'Why are you using Afrikabal?',
              ['Savings', 'Payments', 'Business Transactions', 'Investments'],
              'Specify your purpose for using Afrikabal'
            )}
            {renderSelectWithOther(
              'sourceOfFunds',
              'What is the source of your funds?',
              ['Salary', 'Remittance', 'Business Revenue'],
              'Specify your source of funds'
            )}
            {renderSelectWithOther(
              'incomeRange',
              'What is your income range?',
              ['Less than $10,000', '$10,000 - $50,000', '$50,000 - $100,000', 'Above $100,000'],
              'Specify your income range'
            )}
          </>
        );

      case 'titan': // Wholesale Buyer
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="body1">Are you registering as:</Typography>
              <RadioGroup
                row
                name="titanType"
                value={formik.values.titanType}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="business" control={<Radio />} label="Business" />
                <FormControlLabel value="individual" control={<Radio />} label="Individual" />
              </RadioGroup>
              {formik.touched.titanType && formik.errors.titanType && (
                <Typography color="error">{formik.errors.titanType}</Typography>
              )}
            </Grid>
            {formik.values.titanType === 'business' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Business Name"
                    name="businessName"
                    fullWidth
                    {...formik.getFieldProps('businessName')}
                    error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                    helperText={formik.touched.businessName && formik.errors.businessName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Business Registration Number"
                    name="registrationNumber"
                    fullWidth
                    {...formik.getFieldProps('registrationNumber')}
                    error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
                    helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Tax Identification Number (TIN)"
                    name="taxId"
                    fullWidth
                    {...formik.getFieldProps('taxId')}
                    error={formik.touched.taxId && Boolean(formik.errors.taxId)}
                    helperText={formik.touched.taxId && formik.errors.taxId}
                  />
                </Grid>
              </>
            )}
            {formik.values.titanType === 'individual' && (
              <>
                {renderSelectWithOther(
                  'wealthSource',
                  'Source of Wealth',
                  [
                    'Salary',
                    'Business Revenue',
                    'Investments',
                    'Inheritance',
                  ],
                  'Specify your source of wealth'
                )}
                {renderSelectWithOther(
                  'declarationPurpose',
                  'What is your primary purpose for bulk purchasing?',
                  [
                    'Resale in Local Markets',
                    'Export to International Markets',
                    'Inventory for Business Operations',
                    'Supply for Processing and Manufacturing',
                  ],
                  'Specify your primary purpose for bulk purchasing'
                )}

              </>
            )}
            {renderSelectWithOther(
              'bulkPurchasePurpose',
              'What Drives Your Bulk Purchases?',
              [
                'Resale to Local Distributors or Retailers',
                'Export to International Markets',
                'Inventory Management for Business Operations',
                'Supply Chain Fulfillment for Manufacturing',
                'Stockpiling for Strategic Business Needs',
              ],
              'Tell us the main reason behind your bulk purchasing decisions'
            )}
            {renderSelectWithOther(
              'incomeRange',
              'What is your income range?',
              ['Less than $10,000', '$10,000 - $50,000', '$50,000 - $100,000', 'Above $100,000'],
              'Specify your income range'
            )}
          </>
        );

      case 'agriAlliance': // Cooperative Representative
        return (
          <>
            <Grid item xs={12}>
              <TextField
                label="Cooperative Name"
                name="cooperativeName"
                fullWidth
                {...formik.getFieldProps('cooperativeName')}
                error={formik.touched.cooperativeName && Boolean(formik.errors.cooperativeName)}
                helperText={formik.touched.cooperativeName && formik.errors.cooperativeName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number of Members in the Cooperative"
                name="cooperativeMembers"
                type="number"
                fullWidth
                {...formik.getFieldProps('cooperativeMembers')}
                error={formik.touched.cooperativeMembers && Boolean(formik.errors.cooperativeMembers)}
                helperText={formik.touched.cooperativeMembers && formik.errors.cooperativeMembers}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <Typography variant="body1" sx={{ mb: 1 }}>
                Are you the legal representative of the cooperative?
              </Typography> */}
              <FormControl fullWidth>
                <InputLabel id="isLegalRepresentative-label">Are you the legal representative of the cooperative?</InputLabel>
                <Select
                  labelId="isLegalRepresentative-label"
                  name="isLegalRepresentative"
                  value={formik.values.isLegalRepresentative}
                  onChange={(e) => {
                    const value = e.target.value;
                    formik.setFieldValue('isLegalRepresentative', value);

                    if (value === 'No') {
                      triggerToast(
                        'Only legal representatives of cooperatives can proceed.',
                        '#f44336',
                        'error'
                      );
                      formik.setFieldValue('isLegalRepresentative', '');
                    }
                  }}
                  error={
                    formik.touched.isLegalRepresentative &&
                    Boolean(formik.errors.isLegalRepresentative)
                  }
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                {formik.touched.isLegalRepresentative && formik.errors.isLegalRepresentative && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {formik.errors.isLegalRepresentative}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {renderSelectWithOther(
              'cropGroups',
              'What crop groups does your cooperative focus on?',
              ['Cash Crops', 'Food Crops', 'Horticulture Crops', 'Industrial Crops', 'Legumes'],
              'Specify the crop group your cooperative focuses on'
            )}
            {formik.values.cropGroups && formik.values.cropGroups !== 'Other' && (
              <Grid item xs={12}>
                <TextField
                  label={`Specify crops in the ${formik.values.cropGroups} group`}
                  name="specificCrops"
                  placeholder="e.g., Coffee, Cocoa, Maize"
                  fullWidth
                  {...formik.getFieldProps('specificCrops')}
                  error={formik.touched.specificCrops && Boolean(formik.errors.specificCrops)}
                  helperText={formik.touched.specificCrops && formik.errors.specificCrops}
                />
              </Grid>
            )}
            {renderSelectWithOther(
              'cooperativePurpose',
              "What is your cooperative’s purpose for using Afrikabal?",
              ['Selling Produce', 'Finding Buyers', 'Accessing Financial Services'],
              "Specify your cooperative’s purpose for using Afrikabal"
            )}
          </>
        );

      case 'proHarvest': // Large-Scale Farmer
        return (
          <>
            <Grid item xs={12}>
              <TextField
                label="Farm Name"
                name="farmName"
                fullWidth
                {...formik.getFieldProps('farmName')}
                error={formik.touched.farmName && Boolean(formik.errors.farmName)}
                helperText={formik.touched.farmName && formik.errors.farmName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Farm Size (in hectares)"
                name="farmSize"
                type="number"
                fullWidth
                {...formik.getFieldProps('farmSize')}
                error={formik.touched.farmSize && Boolean(formik.errors.farmSize)}
                helperText={formik.touched.farmSize && formik.errors.farmSize}
              />
            </Grid>
            {renderSelectWithOther(
              'cropGroups',
              'What types of crops does your farm produce?',
              ['Cash Crops', 'Food Crops', 'Horticulture Crops', 'Industrial Crops', 'Legumes'],
              'Specify the types of crops your farm produces'
            )}
            {formik.values.cropGroups && formik.values.cropGroups !== 'Other' && (
              <Grid item xs={12}>
                <TextField
                  label={`Specify crops in the ${formik.values.cropGroups} group`}
                  name="specificCrops"
                  placeholder="e.g., Coffee, Cocoa, Maize"
                  fullWidth
                  {...formik.getFieldProps('specificCrops')}
                  error={formik.touched.specificCrops && Boolean(formik.errors.specificCrops)}
                  helperText={formik.touched.specificCrops && formik.errors.specificCrops}
                />
              </Grid>
            )}
            {renderSelectWithOther(
              'farmPurpose',
              'What is your purpose for using Afrikabal?',
              ['Selling Produce', 'Managing Operations', 'Accessing Financial Tools'],
              'Specify your purpose for using Afrikabal'
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Additional Information</Typography>
        <Typography variant="body2">
          Please provide additional details based on your selected account type to complete your KYC.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {renderRoleSpecificFields(formik.values.accountType)}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={formik.isSubmitting}
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast({ open: false, message: '', color: '', type: '' })}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast({ open: false, message: '', color: '', type: '' })}
          severity={toast.type || 'info'}
          sx={{
            width: '100%',
            backgroundColor: toast.color || '#4caf50',
            color: '#fff',
            borderRadius: 5
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </form>
  );
}

AdditionalInfoForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};

