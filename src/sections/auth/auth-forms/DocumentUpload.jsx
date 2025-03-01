import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Button,
  Stack,
  Box,
  IconButton,
  Card,
  CardMedia,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
  InputLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Tooltip,
  Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { uploadKycDocuments } from 'app/api/kyc/route';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

const requiredDocs = {
  flow: [
    { name: 'ID Document', key: 'governmentId', requiresChoice: ['National ID', 'Passport'], requiresExpiry: true, requiresIssuingDate: true },
    { name: 'Bank Statement', key: 'bankStatement', requiresChoice: ['3 Months', '6 Months'], requiresIssuingDate: true },
    { name: 'Proof of Address', key: 'proofOfAddress', requiresValidityDate: true },
  ],
  titan: [
    { name: 'ID Document', key: 'governmentId', requiresChoice: ['National ID', 'Passport'], requiresExpiry: true, requiresIssuingDate: true },
    { name: 'Bank Statement', key: 'bankStatement', requiresChoice: ['3 Months', '6 Months'], requiresIssuingDate: true },
    { name: 'Business Certificate', key: 'businessRegistration', requiresIssuingDate: true },
    { name: 'Proof of Address', key: 'proofOfAddress', requiresValidityDate: true },
  ],
  agriAlliance: [
    { name: 'ID Document', key: 'governmentId', requiresChoice: ['National ID', 'Passport'], requiresExpiry: true, requiresIssuingDate: true },
    { name: 'Authorization Letter', key: 'authorizationLetter', requiresIssuingDate: true },
    { name: 'Bank Statement', key: 'bankStatement', requiresChoice: ['3 Months', '6 Months'], requiresIssuingDate: true },
    { name: 'Proof of Address', key: 'proofOfAddress', requiresValidityDate: true },
  ],
  proHarvest: [
    { name: 'ID Document', key: 'governmentId', requiresChoice: ['National ID', 'Passport'], requiresExpiry: true, requiresIssuingDate: true },
    { name: 'Bank Statement', key: 'bankStatement', requiresChoice: ['3 Months', '6 Months'], requiresIssuingDate: true },
    { name: 'Farm Ownership Proof', key: 'farmOwnershipProof', requiresIssuingDate: true },
    { name: 'Land Ownership Docs', key: 'landOwnershipDocuments', requiresIssuingDate: true },
    { name: 'Farm Proof Docs', key: 'farmProofDocuments', requiresIssuingDate: true },
  ],
};

const validationSchema = Yup.object().shape({
  documents: Yup.array().of(
    Yup.object().shape({
      // key: Yup.string().required('Document key is missing.'),
      file: Yup.mixed()
        .required('File is required.')
        .test(
          'fileType',
          'Unsupported file type. Only PNG, JPEG, and PDF files are allowed.',
          (value) => value && ALLOWED_FILE_TYPES.includes(value.type)
        )
        .test(
          'fileSize',
          'File size exceeds the maximum limit of 5MB.',
          (value) => value && value.size <= MAX_FILE_SIZE
        ),
      documentType: Yup.string()
        .nullable()
        .when('key', (key, schema) => {
          if (key === 'governmentId') {
            // Apply required validation for 'governmentId'
            return schema.required('Please select a document type.');
          }
          // For other keys, make it not required
          return schema.notRequired().nullable();
        }),
      issuingDate: Yup.date()
        .nullable()
        .required('Issuing date is required.')
        .test(
          'validDate',
          'Issuing date cannot be in the future.',
          (value) => !value || new Date(value) <= new Date()
        ),
      expiryDate: Yup.date()
        .nullable()
        .when('requiresExpiry', {
          is: true,
          then: Yup.date()
            .required('Expiry date is required.')
            .test(
              'validExpiryDate',
              'Expiry date cannot be before the issuing date.',
              function (value) {
                const { issuingDate } = this.parent;
                return !value || new Date(value) > new Date(issuingDate);
              }
            ),
        }),
    })
  ),
  consent: Yup.boolean()
    .oneOf([true], 'You must agree to continue.')
    .required('Consent is required.'),
});

const SlideTransition = (props) => <Slide {...props} direction="up" />;

export default function DocumentUploadForm({ formData, setFormData, handleNext, handleBack }) {
  const accountType = formData.accountType || 'flow';
  const documents = requiredDocs[accountType] || [];
  const [openModal, setOpenModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
    color: '',
  });

  const triggerToast = (message, color, severity) => {
    setToast({
      open: true,
      message,
      color,
      severity
    });

    // setTimeout(() => {
    //   setToast({
    //     open: false,
    //     message: '',
    //     color: '',
    //     type: ''
    //   });
    // }, 5000);
  };

  const formik = useFormik({
    initialValues: {
      documents: formData.documents || documents.map((doc) => ({
        key: doc.key || '',
        file: null,
        documentType: '',
        issuingDate: '',
        expiryDate: '',
      })),
      consent: formData.consent || false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsUploading(true);
      try {
        console.log('Formdata:', formData);
        await handleFileUploads(values.documents, formData.email);

        setFormData((prevData) => ({
          ...prevData,
          documents: values.documents,
          consent: values.consent,
        }));

        setIsUploading(false);
        handleNext();
      } catch (error) {
        setIsUploading(false);
        triggerToast('File upload failed. Please try again.', '#f44336', 'error');
      }
    },
  });

  const handleFileUploads = async (documents, email) => {
    setIsUploading(true);
    const statuses = {};
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      if (!document.file) continue;

      console.log('====================================');
      console.log('Document:', document);
      console.log('====================================');

      statuses[document.key] = 'uploading';
      setUploadStatus({ ...statuses });

      try {
        await uploadKycDocuments(document.file, email);
        statuses[document.key] = 'success';
        successCount++;
        // triggerToast(`${document.name} uploaded successfully!`, '#4caf50', 'success');
        triggerToast(`All documents uploaded successfully!`, '#4caf50', 'success');
      } catch (error) {
        statuses[document.key] = 'failed';
        failureCount++;
        triggerToast(`Failed to upload ${document.name}`, '#f44336', 'error');
      }

      setUploadStatus({ ...statuses });
    }

    setIsUploading(false);
    setOpenModal(false);

    // setTimeout(() => {
    //   setOpenModal(false);
    //   if (Object.values(statuses).every((status) => status === 'success')) {
    //     handleNext();
    //   }
    // }, 2000);
  };

  // const handleFileUploads = async (documents, email) => {
  //   setIsUploading(true);
  //   const statuses = {};
  //   let successCount = 0;
  //   let failureCount = 0;

  //   try {
  //     for (let i = 0; i < documents.length; i++) {
  //       const document = documents[i];
  //       if (!document.file) continue;

  //       statuses[document.key] = 'uploading';
  //       setUploadStatus({ ...statuses });

  //       try {
  //         console.log('Uploading KYC document:', document);
  //         await uploadKycDocument(document.file, email);
  //         statuses[document.key] = 'success';
  //         successCount++;
  //       } catch (error) {
  //         console.error('Failed to upload document:', error);
  //         statuses[document.key] = 'failed';
  //         failureCount++;
  //       }

  //       setUploadStatus({ ...statuses });
  //     }

  //     // Delay the toast slightly to ensure state updates are complete
  //     setTimeout(() => {
  //       if (successCount > 0 && failureCount === 0) {
  //         setToast({
  //           open: true,
  //           message: 'All documents uploaded successfully!',
  //           severity: 'success',
  //           color: '#4caf50'
  //         });
  //       } else if (failureCount > 0 && successCount > 0) {
  //         setToast({
  //           open: true,
  //           message: `${successCount} documents uploaded successfully, ${failureCount} failed. Please retry failed uploads.`,
  //           severity: 'warning',
  //           color: '#ffc107'
  //         });
  //       } else if (failureCount > 0) {
  //         setToast({
  //           open: true,
  //           message: 'All documents failed to upload. Please check your files and try again.',
  //           severity: 'error',
  //           color: '#f44336'
  //         });
  //       }
  //     }, 100);

  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  useEffect(() => {
    formik.setValues({
      documents: formData.documents || formik.initialValues.documents,
      consent: formData.consent || formik.initialValues.consent,
    });
  }, []);

  useEffect(() => {
    console.log('Formik Errors:', formik.errors);
  }, [formik.errors]);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      triggerToast('Unsupported file format. Only PNG, JPEG, and PDF allowed.', '#f44336', 'error');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      triggerToast('File size exceeds 5MB.', '#f44336', 'error');
      return;
    }

    const updatedDocuments = [...formik.values.documents];
    updatedDocuments[index] = { ...updatedDocuments[index], file };
    formik.setFieldValue('documents', updatedDocuments);
  };

  const handleFileRemoval = (index) => {
    // Ensure the document at the specified index exists
    const document = formik.values.documents[index];

    if (document) {
      // Clear file and related fields
      formik.setFieldValue(`documents[${index}].file`, null);
      formik.setFieldValue(`documents[${index}].issuingDate`, '');
      formik.setFieldValue(`documents[${index}].expiryDate`, '');

      triggerToast('File removed successfully', '#2196f3', 'info');

      // Revoke the object URL if the file is an image
      if (document.file && document.file.type.startsWith('image')) {
        URL.revokeObjectURL(URL.createObjectURL(document.file));
      }
    } else {
      console.error(`Invalid index: ${index}`);
    }
  };

  const handleDateChange = (e, index, field) => {
    formik.setFieldValue(`documents[${index}].${field}`, e.target.value);
  };

  const handleUpload = async () => {
    if (isUploading) {
      triggerToast('Upload in progress. Please wait...', '#ffc107', 'warning');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setOpenModal(false);
      formik.handleSubmit();
    }, 2000);
  };

  const renderFilePreview = (file, index) => {
    if (!file) return null;
    const isImage = file.type.startsWith('image');

    return (
      <Card sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        mb: 2,
        mt: 2,
        position: 'relative',
        '&:hover .remove-button': {
          opacity: 1
        }
      }}>
        <Box>
          {isImage ? (
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100, objectFit: 'contain' }}
              image={URL.createObjectURL(file)}
              alt={`document-preview-${index}`}
            />
          ) : (
            <InsertDriveFileIcon sx={{ fontSize: 40 }} />
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
            {file.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </Typography>
          <Tooltip title="Remove file">
            <IconButton
              onClick={() => handleFileRemoval(index)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
    );
  };

  const renderDateFields = (doc, index) => (
    <Accordion
      sx={{
        mt: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        '&:hover': { boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)' },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f5f5' }}>
        <Typography variant="subtitle2" fontWeight="bold">
          Date Details
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Issuing Date"
          type="date"
          name={`documents[${index}].issuingDate`}
          onChange={(e) => formik.setFieldValue(`documents[${index}].issuingDate`, e.target.value)}
          value={formik.values.documents[index]?.issuingDate || ''}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mt: 2 }}
          error={Boolean(formik.errors.documents?.[index]?.issuingDate)}
          helperText={formik.errors.documents?.[index]?.issuingDate}
        />
        {formik.values.documents?.[index]?.documentType === 'Passport' && (
          <TextField
            label="Expiry Date"
            type="date"
            name={`documents[${index}].expiryDate`}
            onChange={(e) => formik.setFieldValue(`documents[${index}].expiryDate`, e.target.value)}
            value={formik.values.documents?.[index]?.expiryDate || ''}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mt: 2 }}
            error={
              Boolean(
                formik.touched.documents?.[index]?.expiryDate &&
                formik.errors.documents?.[index]?.expiryDate
              )
            }
            helperText={
              formik.touched.documents?.[index]?.expiryDate &&
              formik.errors.documents?.[index]?.expiryDate
            }
          />
        )}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Upload Documents
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Please upload the required documents to proceed.
      </Typography>

      <Grid container spacing={3}>
        {documents.map((doc, index) => (
          <Grid item xs={12} key={doc.key}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {doc.name}
            </Typography>
            {doc.key === 'governmentId' && (
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="documentType-label">Select Document Type</InputLabel>
                <Select
                  value={formik.values.documents[index]?.documentType || ''}
                  onChange={(e) => formik.setFieldValue(`documents[${index}].documentType`, e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="National ID">National ID</MenuItem>
                  <MenuItem value="Passport">Passport</MenuItem>
                </Select>
                {formik.errors.documents?.[index]?.documentType && (
                  <FormHelperText error>{formik.errors.documents[index]?.documentType}</FormHelperText>
                )}
              </FormControl>
            )}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel shrink>Upload {doc.name}</InputLabel>
              <Button
                variant="contained"
                component="label"
                startIcon={<FileUploadIcon />}
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': { backgroundColor: '#45a049' },
                  textTransform: 'none',
                  mt: 1,
                }}
              >
                {formik.values.documents[index]?.file ? 'Change File' : 'Upload File'}
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e, index)}
                  accept="image/*,application/pdf"
                />
              </Button>
              {formik.errors.documents?.[index]?.file && (
                <FormHelperText error>
                  {formik.errors.documents[index].file}
                </FormHelperText>
              )}
            </FormControl>
            {renderFilePreview(formik.values.documents[index]?.file, index)}

            {renderDateFields(doc, index)}
          </Grid>
        ))}

        <Grid item xs={12}>
          <FormControl error={Boolean(formik.errors.consent)} sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Checkbox
                checked={formik.values.consent}
                onChange={() => formik.setFieldValue('consent', !formik.values.consent)}
              />
              <Typography variant="body2" display="inline">
                I agree to upload my documents for verification.
              </Typography>
            </Box>
            {formik.errors.consent && (
              <FormHelperText>{formik.errors.consent}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <Button variant="outlined" onClick={handleBack} sx={{ mr: 2 }}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              disabled={!formik.isValid}
              sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
            >
              Next
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        open={openModal}
        onClose={!isUploading ? () => setOpenModal(false) : null}
        PaperProps={{
          sx: {
            padding: '2rem',
            borderRadius: '20px',
            width: '500px',
            maxWidth: '95%',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(135deg, #FFFFFF, #F4F9F4)',
            overflow: 'hidden',
            position: 'relative',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '1.85rem',
            fontWeight: 700,
            color: isUploading ? '#2aa1af' : '#333',
            textAlign: 'center',
            marginBottom: '1rem',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          {isUploading ? 'Uploading Documents...' : 'Confirm Your Upload'}
        </DialogTitle>

        <DialogContent
          sx={{
            textAlign: 'center',
            marginTop: '1rem',
            animation: 'slideIn 0.3s ease-in-out',
          }}
        >
          {isUploading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <CircularProgress
                size={70}
                thickness={5}
                sx={{
                  color: '#2aa1af',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: '#555',
                  fontWeight: 500,
                  textAlign: 'center',
                  fontSize: '1rem',
                }}
              >
                Please wait while your documents are being uploaded. This might take a few seconds.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  marginBottom: '1.5rem',
                  color: '#666',
                  fontSize: '1rem',
                }}
              >
                You are about to upload the following documents:
              </Typography>
              <List
                sx={{
                  textAlign: 'left',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  marginBottom: '1.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '16px',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #F9F9F9, #FFFFFF)',
                }}
              >
                {documents.map((doc) => (
                  <ListItem key={doc.key} sx={{ padding: '0.5rem 0' }}>
                    <ListItemIcon>
                      <InsertDriveFileIcon sx={{ color: '#2aa1af', fontSize: '1.5rem' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      sx={{
                        color: '#333',
                        fontWeight: 500,
                        fontSize: '1rem',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography
                variant="body2"
                sx={{
                  color: '#999',
                  fontSize: '0.9rem',
                }}
              >
                Review the above and confirm to proceed.
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
            animation: 'fadeIn 0.4s ease-in-out',
          }}
        >
          {!isUploading && (
            <>
              <Button
                variant="outlined"
                onClick={() => setOpenModal(false)}
                sx={{
                  textTransform: 'none',
                  padding: '0.75rem 2rem',
                  fontWeight: 500,
                  borderRadius: '12px',
                  borderColor: '#2aa1af',
                  color: '#2aa1af',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#85BA58',
                    backgroundColor: '#F0FFF4',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUpload}
                sx={{
                  textTransform: 'none',
                  padding: '0.75rem 2rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #2aa1af, #85BA58)',
                  color: '#FFF',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #85BA58, #2aa1af)',
                  },
                }}
              >
                Confirm & Upload
              </Button>
            </>
          )}
        </DialogActions>

        {isUploading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '5px',
              background: 'linear-gradient(90deg, #2aa1af, #85BA58)',
              animation: 'loadingBar 1.5s linear infinite',
            }}
          />
        )}
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast(prev => ({ ...prev, open: false }))}
          // severity={toast.severity || 'info'}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: toast.color || '#4caf50',
            color: '#fff',
            borderRadius: 5,
            '& .MuiAlert-icon': {
              marginRight: 1
            }
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </form>
  );
}

DocumentUploadForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};
