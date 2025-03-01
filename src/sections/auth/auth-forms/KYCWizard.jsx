'use client';

import { forwardRef, useEffect, useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Card,
    CardContent,
    Alert,
    Snackbar,
    Link,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
    Fab,
    Slide,
} from '@mui/material';
import { Replay } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import PersonalInfoForm from './PersonalInfo';
import ResidentialForm from './ResidentialForm';
import AdditionalInfoForm from './AdditionalInfo';
import DocumentUploadForm from './DocumentUpload';
import Review from './Review';
import RefinedFaceCapture from './UserProfilePicture';

// Steps
// const steps = [
//     'Personal Details',
//     'Residence Info',
//     'Extra Details',
//     'Upload Docs',
//     'Finalize Setup'
// ];
const steps = [
    'Personal Information',
    'Verify Your Identity',
    'Residence Details',
    'Additional Information',
    'Upload Documents',
    'Complete Your Setup'
];

export default function KYCWizard() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Initialize step and formData from localStorage
    const initialWizardStep = parseInt(localStorage.getItem('kycWizardStep')) || 0;
    const initialKYCData = JSON.parse(localStorage.getItem('kycWizardData')) || {
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
    };

    const [kycWizardStep, setKYCWizardStep] = useState(initialWizardStep);
    const [kycWizardData, setKYCWizardData] = useState(initialKYCData);
    const [openConfirm, setOpenConfirm] = useState(false);

    const [kycToast, setKYCToast] = useState({
        open: false,
        message: '',
        color: '',
        type: ''
    });

    useEffect(() => {
        if (kycWizardStep === 0) {
            const formData = JSON.parse(localStorage.getItem('formData')) || {};
            const accountType = formData.accountType || '';
            const email = formData.email || '';

            if (accountType) {
                setKYCWizardData((prevData) => ({
                    ...prevData,
                    accountType,
                    email
                }));
            }
        }
    }, [kycWizardStep]);

    useEffect(() => {
        console.log('Saving kycWizardStep to localStorage:', kycWizardStep);
        localStorage.setItem('kycWizardStep', kycWizardStep);
    }, [kycWizardStep]);

    useEffect(() => {
        console.log('Saving kycWizardData to localStorage:', kycWizardData);
        localStorage.setItem('kycWizardData', JSON.stringify(kycWizardData));
    }, [kycWizardData]);

    // useEffect(() => {
    //     const savedFormData = localStorage.getItem('formData');
    //     if (savedFormData) {
    //         const parsedData = JSON.parse(savedFormData);
    //         setFormData((prev) => ({ ...prev, ...parsedData }));
    //     }
    // }, []);

    useEffect(() => {
        if (kycWizardStep === 6) {
            console.log('Reached final step: scheduling toast message.');
            const timeoutId = setTimeout(() => {
                triggerKYCToast(
                    'You can now close this window. You will be notified via email once your KYC verification is complete.',
                    'info',
                    'info'
                );
            }, 30000);

            return () => {
                console.log('Clearing toast timeout.');
                clearTimeout(timeoutId);
            };
        }
    }, [kycWizardStep]);

    const triggerKYCToast = (message, color, type) => {
        setKYCToast({ open: true, message, color, type });
        setTimeout(() => {
            setKYCToast({ open: false, message: '', color: '', type: '' });
        }, 5000);
    };

    // const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    // const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
    const handleNext = () => {
        // setKYCWizardStep((prev) => prev + 1);
        setKYCWizardStep((prevStep) => {
            const nextStep = prevStep + 1;
            console.log('Moving to Next Step:', nextStep);
            localStorage.setItem('kycWizardStep', nextStep);
            return nextStep;
        });
    };

    const handleBack = () => {
        setKYCWizardStep((prevStep) => {
            const previousStep = prevStep - 1;
            console.log('Moving to Previous Step:', previousStep);
            localStorage.setItem('kycWizardStep', previousStep);
            return previousStep;
        });
    };

    const handleRestart = () => {
        localStorage.removeItem('kycWizardStep');
        localStorage.removeItem('kycWizardData');

        setKYCWizardStep(0);
        setKYCWizardData({
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

        setOpenConfirm(false);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <PersonalInfoForm
                        formData={kycWizardData}
                        setFormData={setKYCWizardData}
                        handleNext={handleNext}
                    />
                );
            case 1:
                return (
                    <RefinedFaceCapture
                        formData={kycWizardData}
                        handleBack={handleBack}
                        onCapture={(photoUrl) => {
                            setKYCWizardData((prevData) => ({ ...prevData, photo: photoUrl }));
                            handleNext();
                        }}
                    />
                );
            case 2:
                return (
                    <ResidentialForm
                        formData={kycWizardData}
                        setFormData={setKYCWizardData}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                );
            case 3:
                return (
                    <AdditionalInfoForm
                        formData={kycWizardData}
                        setFormData={setKYCWizardData}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                );
            case 4:
                return (
                    <DocumentUploadForm
                        formData={kycWizardData}
                        setFormData={setKYCWizardData}
                        handleNext={handleNext}
                        handleBack={handleBack}
                    />
                );
            case 5:
                return (
                    <Review
                        formData={kycWizardData}
                        setFormData={setKYCWizardData}
                        handleBack={handleBack}
                        handleNext={handleNext}
                    />
                );
            case 6:
                return (
                    <Box sx={{ textAlign: 'center', padding: 4 }}>
                        <Card sx={{ maxWidth: 600, mx: 'auto', p: 3, boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    KYC Submission Complete - Thank You!
                                </Typography>
                                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                    Your KYC information has been submitted successfully.
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Please allow up to 72 hours for our team to verify your information.
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Once verified, you will gain full access to the platform.
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                                    For any inquiries, please reach out to our support team via{' '}
                                    <Link href="mailto:support@afrikabal.org" underline="none">
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            sx={{ color: 'primary.main', cursor: 'pointer' }}
                                        >
                                            support@afrikabal.org
                                        </Typography>
                                    </Link>
                                    .
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                );
            default:
                throw new Error('Unknown step');
        }
    };

    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            <Stepper activeStep={kycWizardStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 5 }}>
                {getStepContent(kycWizardStep)}
            </Box>

            {kycWizardStep > 0 && kycWizardStep < steps.length && (
                <Tooltip title="Restart the KYC process" placement="left">
                    <Slide direction="up" in>
                        <Fab
                            color="primary"
                            aria-label="restart"
                            onClick={() => setOpenConfirm(true)}
                            sx={{
                                position: 'fixed',
                                bottom: 24,
                                right: 24,
                                boxShadow: theme.shadows[4],
                                background: 'linear-gradient(135deg, #2aa1af 0%, #87B855 100%)',
                                color: '#FFF',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #87B855 0%, #6CA244 100%)',
                                },
                            }}
                        >
                            <Replay />
                        </Fab>
                    </Slide>
                </Tooltip>
            )}

            <Dialog
                open={openConfirm}
                onClose={(e) => {
                    e.stopPropagation();
                    setOpenConfirm(false);
                }}
                aria-labelledby="restart-dialog-title"
                aria-describedby="restart-dialog-description"
                PaperProps={{
                    sx: {
                        padding: 0,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
                        backgroundColor: '#F8F9FA',
                        transform: openConfirm ? 'scale(1) translateY(0)' : 'scale(0.98) translateY(-8px)',
                        opacity: openConfirm ? 1 : 0,
                        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
                    },
                }}
                sx={{
                    '& .MuiBackdrop-root': {
                        transition: 'opacity 0.2s ease-out',
                        opacity: openConfirm ? 0.6 : 0,
                        backdropFilter: 'blur(2px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    }
                }}
            >
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #2aa1af 0%, #87B855 100%)',
                        padding: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: '#FFF',
                            fontWeight: 600,
                            textAlign: 'center',
                            fontSize: '1.25rem',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        Restart KYC Process
                    </Typography>
                </Box>

                <DialogContent
                    sx={{
                        textAlign: 'center',
                        padding: 3.5,
                        color: '#2D3748',
                        backgroundColor: '#FFF',
                    }}
                >
                    <Typography
                        id="restart-dialog-description"
                        variant="body1"
                        component="div"
                        sx={{
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            fontWeight: 500,
                        }}
                    >
                        Are you sure you want to restart the process?
                        <Box
                            component="p"
                            sx={{
                                color: '#87B855',
                                fontWeight: 600,
                                marginTop: 1,
                                fontSize: '0.95rem'
                            }}
                        >
                            All progress will be lost.
                        </Box>
                    </Typography>
                </DialogContent>

                <DialogActions
                    sx={{
                        backgroundColor: '#FFF',
                        padding: 2.5,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenConfirm(false);
                        }}
                        variant="outlined"
                        sx={{
                            textTransform: 'none',
                            px: 3,
                            py: 1,
                            fontWeight: 500,
                            borderRadius: '8px',
                            color: '#4A5568',
                            borderColor: '#E2E8F0',
                            backgroundColor: '#FFF',
                            '&:hover': {
                                backgroundColor: '#F7FAFC',
                                borderColor: '#CBD5E0',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleRestart}
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            px: 3,
                            py: 1,
                            fontWeight: 500,
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #2aa1af 0%, #87B855 100%)',
                            color: '#FFF',
                            boxShadow: '0 2px 8px rgba(135, 184, 85, 0.25)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #87B855 0%, #6CA244 100%)',
                                boxShadow: '0 4px 12px rgba(135, 184, 85, 0.3)',
                            },
                        }}
                    >
                        Restart
                    </Button>
                </DialogActions>
            </Dialog>

            {/* {toast.open && (
                <Toast
                    message={toast.message}
                    color={toast.color}
                    type={toast.type}
                    onClose={() =>
                        setToast({ open: false, message: '', color: '', type: '' })
                    }
                />
            )} */}

            <Snackbar
                open={kycToast.open}
                autoHideDuration={6000}
                onClose={() => setKYCToast({ ...kycToast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{
                    maxWidth: 450,
                    width: '100%',
                    '& .MuiSnackbarContent-root': {
                        borderRadius: '32px',
                        padding: '1rem',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                    },
                }}
            >
                <Alert
                    severity={kycToast.type}
                    sx={{
                        width: '100%',
                        backgroundColor:
                            kycToast.type === 'success'
                                ? '#2aa1af'
                                : kycToast.type === 'error'
                                    ? '#FF4D4F'
                                    : '#2196F3',
                        color: '#FFF',
                        fontWeight: 600,
                        borderRadius: '32px',
                        textAlign: 'left',
                        overflowWrap: 'break-word',
                    }}
                >
                    {kycToast.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}