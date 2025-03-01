import PropTypes from 'prop-types';
import { Typography, Button, Card, CardContent, Box, Divider, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { saveKycInformation } from 'app/api/kyc/route';
import { useState } from 'react';

export default function Review({ handleBack, handleNext, formData, setFormData }) {
  const theme = useTheme();
  const [toast, setToast] = useState({
    open: false,
    message: '',
    color: '',
    severity: '',
  });

  const handleToastClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const triggerToast = (message, color, severity) => {
    setToast({
      open: true,
      message,
      color,
      severity,
    });
  };

  // Function to construct the metadata from formData
  const constructMetadata = (formData) => ({
    personalDetails: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      full_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone_number: formData.phone,
      gender: formData.gender,
    },
    residentialDetails: {
      country: formData.country,
      region: {
        province: formData.province,
        district: formData.district,
        sector: formData.sector,
        cell: formData.cell,
        village: formData.village,
      },
      address: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
      },
    },
    accountDetails: {
      accountType: formData.accountType,
      titanType: formData.titanType,
      incomeRange: formData.incomeRange,
      bulkPurchasePurpose: formData.bulkPurchasePurpose,
      declarationPurpose: formData.declarationPurpose,
      sourceOfFunds: formData.sourceOfFunds,
      customSourceOfFunds: formData.customSourceOfFunds,
      wealthSource: formData.wealthSource,
    },
    businessDetails: {
      businessName: formData.businessName,
      registrationNumber: formData.registrationNumber,
      taxId: formData.taxId,
    },
    cooperativeDetails: {
      cooperativeName: formData.cooperativeName,
      cooperativeMembers: formData.cooperativeMembers,
      cooperativePurpose: formData.cooperativePurpose,
      isLegalRepresentative: formData.isLegalRepresentative,
    },
    farmDetails: {
      farmName: formData.farmName,
      farmSize: formData.farmSize,
      farmPurpose: formData.farmPurpose,
      cropGroups: formData.cropGroups,
      specificCrops: formData.specificCrops,
      cropTypes: formData.cropTypes,
    },
    documents: formData.documents.map((doc) => ({
      name: doc.documentType || 'Unknown Document',
      issuingDate: doc.issuingDate,
      expiryDate: doc.expiryDate || null,
      fileName: doc.file?.name,
      fileSize: `${(doc.file?.size / (1024 * 1024)).toFixed(2)} MB`,
    })),
  });

  const cleanEmptyValues = (obj) => {
    if (Array.isArray(obj)) {
      return obj
        .map(cleanEmptyValues) // Recursively clean each item in the array
        .filter((item) => !(item == null || (typeof item === 'object' && Object.keys(item).length === 0))); // Remove empty or null items
    }

    if (typeof obj === 'object' && obj !== null) {
      const cleanedObject = Object.entries(obj)
        .reduce((acc, [key, value]) => {
          const cleanedValue = cleanEmptyValues(value); // Recursively clean nested values
          if (cleanedValue !== null && (typeof cleanedValue !== 'object' || Object.keys(cleanedValue).length > 0)) {
            acc[key] = cleanedValue; // Include only non-empty values
          }
          return acc;
        }, {});

      // If the object is empty after cleaning, return null to remove it
      return Object.keys(cleanedObject).length > 0 ? cleanedObject : null;
    }

    // For primitive values, return null for falsy values like empty strings
    return obj ? obj : null;
  };

  const constructPayload = (formData) => {
    const cleanedMetadata = cleanEmptyValues(constructMetadata(formData));

    const payload = {
      // email: formData.email,
      metadata: cleanedMetadata,
    };

    return payload;
  };

  const handleSubmit = async () => {
    try {

      // console.log('Cleaned Metadata:', cleanedMetadata);

      // console.log('Metadata:', cleanEmptyValues(constructMetadata(formData)));
      // handleNext();

      const payload = constructPayload(formData);
      console.log('Constructed Payload:', payload);

      await saveKycInformation(payload);
      triggerToast('KYC information submitted successfully!', '#2aa1af', 'success');

      localStorage.removeItem('formData');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        country: null,
        province: '',
        district: '',
        sector: '',
        cell: '',
        village: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        accountType: '',
        titanType: '',
        purpose: '',
        sourceOfFunds: '',
        customSourceOfFunds: '',
        businessName: '',
        registrationNumber: '',
        taxId: '',
        wealthSource: '',
        declarationPurpose: '',
        cooperativeName: '',
        cooperativeMembers: '',
        isLegalRepresentative: '',
        cooperativePurpose: '',
        farmName: '',
        farmSize: '',
        cropTypes: '',
        farmPurpose: '',
        incomeRange: '',
        cropGroups: '',
        specificCrops: '',
        bulkPurchasePurpose: '',
        documents: [],
      });

      handleNext();
    } catch (error) {
      console.error('Error submitting KYC information:', error);
      triggerToast(error, '#FF4D4F', 'error');
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
            Ready to Submit
          </Typography>

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              color: theme.palette.text.secondary,
              mt: 1,
            }}
          >
            This is your final step. Once you submit, your details will be sent for processing.
          </Typography>

          <Box
            sx={{
              my: 4,
              py: 3,
              px: 2,
              border: `1px dashed ${theme.palette.primary.main}`,
              borderRadius: 2,
              backgroundColor: theme.palette.action.hover,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 1,
                fontWeight: 500,
              }}
            >
              Thank you for taking the time to complete your details. You’re almost done!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.disabled,
              }}
            >
              If you need to make changes, click "Back" to review your details. Otherwise, click "Submit" to finish.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                textTransform: 'none',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 600,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                textTransform: 'none',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 600,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                boxShadow: theme.shadows[3],
              }}
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          sx={{
            backgroundColor: toast.color,
            color: '#FFF',
            fontWeight: 600,
            borderRadius: '32px',
            padding: '0.75rem 1.5rem',
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}

Review.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
