import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import {
    Box,
    Button,
    Typography,
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';
import { AddAPhoto, UploadFile } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { uploadFile } from 'app/api/files/route';

export default function RefinedFaceCapture({ handleBack, onCapture }) {
    const webcamRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    const handleCapture = () => {
        const capturedPhoto = webcamRef.current.getScreenshot();
        if (capturedPhoto) {
            setPhoto(capturedPhoto);
            triggerToast('Photo captured successfully!', 'success');
        } else {
            triggerToast('Failed to capture photo. Please try again.', 'error');
        }
    };

    const handleUpload = async () => {
        try {
            if (!photo) {
                triggerToast('No photo to upload. Please capture a photo first.', 'error');
                return;
            }

            setIsUploading(true);

            // Convert base64 to a file object for upload
            const file = base64ToFile(photo, 'kyc_photo.jpeg');
            const response = await uploadFile('pictures', file);

            triggerToast('Photo uploaded successfully!', 'success');
            onCapture(response.data.fileUrl); // Pass the uploaded photo's URL back
        } catch (error) {
            triggerToast('Photo upload failed. Please try again.', 'error');
            console.error('Error uploading photo:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const triggerToast = (message, severity) => {
        setToast({ open: true, message, severity });
    };

    const handleToastClose = () => setToast({ open: false });

    const base64ToFile = (base64, filename) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                p: 3,
                textAlign: 'center',
            }}
        >
            <Typography variant="h5">Capture Your Photo</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Please capture a clear photo of yourself. This will be used for verification purposes.
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    height: 300,
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    border: '2px dashed',
                    borderColor: 'divider',
                }}
            >
                {!photo ? (
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        style={{ width: '100%', height: '100%' }}
                    />
                ) : (
                    <img
                        src={photo}
                        alt="Captured"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddAPhoto />}
                    onClick={handleCapture}
                    disabled={isUploading}
                >
                    Capture Photo
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<UploadFile />}
                    onClick={handleUpload}
                    disabled={isUploading || !photo}
                >
                    {isUploading ? <CircularProgress size={24} /> : 'Upload Photo'}
                </Button>
                <Button variant="text" onClick={handleBack} disabled={isUploading}>
                    Back
                </Button>
            </Box>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={handleToastClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleToastClose} severity={toast.severity}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

RefinedFaceCapture.propTypes = {
    handleBack: PropTypes.func.isRequired,
    onCapture: PropTypes.func.isRequired,
};
