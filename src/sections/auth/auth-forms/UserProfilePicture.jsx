import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import {
    Box,
    Button,
    Typography,
    Snackbar,
    Alert,
    CircularProgress,
    IconButton,
    ToggleButtonGroup,
    ToggleButton,
    Paper,
} from '@mui/material';
import { AddAPhoto, UploadFile, CameraAlt, Clear, CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { uploadFile } from 'app/api/files/route';
import { uploadKycDocuments } from 'app/api/kyc/route';

export default function RefinedFaceCapture({ handleBack, onCapture, formData }) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
    const [isUsingWebcam, setIsUsingWebcam] = useState(true);
    const [faceDetected, setFaceDetected] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [lighting, setLighting] = useState({ status: 'unknown', message: '' });

    // Load Face API models
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models';
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector`),
                faceapi.nets.faceLandmark68Net.loadFromUri(`${MODEL_URL}/face_landmark_68`),
            ]);
            console.log('Face API models loaded.');
        };

        loadModels().catch((err) => console.error('Error loading models:', err));
    }, []);

    // Real-time face detection and alignment feedback
    useEffect(() => {
        const detectFace = async () => {
            if (!faceapi.nets.tinyFaceDetector.isLoaded) {
                console.error('Model not loaded yet.');
                return;
            }

            if (webcamRef.current && canvasRef.current && isUsingWebcam) {
                const video = webcamRef.current.video;

                if (video.readyState === 4) {
                    const detections = await faceapi.detectSingleFace(
                        video,
                        new faceapi.TinyFaceDetectorOptions()
                    ).withFaceLandmarks();

                    if (detections) {
                        setFaceDetected(true);

                        const box = detections.detection.box;
                        const alignmentFeedback = getAlignmentFeedback(box, {
                            width: video.videoWidth,
                            height: video.videoHeight,
                        });

                        setFeedbackMessage(alignmentFeedback);
                    } else {
                        setFaceDetected(false);
                        setFeedbackMessage('No face detected. Please adjust your position.');
                    }
                }
            }
        };

        const interval = setInterval(detectFace, 200);

        return () => clearInterval(interval);
    }, [isUsingWebcam]);

    const getAlignmentFeedback = (box, displaySize) => {
        const centerX = displaySize.width / 2;
        const centerY = displaySize.height / 2;

        if (box.x < centerX * 0.6) return 'Move right.';
        if (box.x + box.width > centerX * 1.4) return 'Move left.';
        if (box.y < centerY * 0.6) return 'Move down.';
        if (box.y + box.height > centerY * 1.4) return 'Move up.';

        return 'Face is centered!';
    };

    const handleCapture = () => {
        const capturedPhoto = webcamRef.current.getScreenshot();
        if (capturedPhoto && faceDetected) {
            setPhoto(capturedPhoto);
            triggerToast('Photo captured successfully!', 'success');
        } else if (!faceDetected) {
            triggerToast('No face detected. Please adjust your position.', 'error');
        } else {
            triggerToast('Failed to capture photo. Please try again.', 'error');
        }
    };

    const handleFileDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleFileSelect = (input) => {
        let file;

        if (input?.target?.files?.[0]) {
            file = input.target.files[0];
        } else if (input instanceof File) {
            file = input;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhoto(reader.result);
                triggerToast('Photo uploaded successfully!', 'success');
            };
            reader.readAsDataURL(file);
        } else {
            triggerToast('No file selected. Please choose an image file.', 'error');
        }
    };

    const handleUpload = async () => {
        try {
            if (!photo) {
                triggerToast('No photo to upload. Please capture or upload a photo first.', 'error');
                return;
            }

            setIsUploading(true);

            const email = formData.email;
            if (!email) {
                console.log('Email is required for KYC document upload.');
                return;
            }

            const emailRoot = email.split('@')[0];
            const sanitizedEmailRoot = emailRoot.replace(/[^a-zA-Z0-9]/g, '_');

            const mimeMatch = photo.match(/data:(.*?);base64/);
            const fileExtension = mimeMatch ? mimeMatch[1].split('/')[1] : 'jpeg';
            const fileName = `${sanitizedEmailRoot}_picture.${fileExtension}`;

            const file = base64ToFile(photo, fileName);

            const response = await uploadKycDocuments(file, email);

            console.log("Upload res", response)

            triggerToast('Photo uploaded successfully!', 'success');
            onCapture(response.data.fileUrl);
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

    const handleModeChange = (event, newMode) => {
        if (newMode !== null) {
            setIsUsingWebcam(newMode === 'webcam');
            setPhoto(null);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 500,
                margin: 'auto',
                padding: 4,
                borderRadius: 3,
                background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
                textAlign: 'center',
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Snap or Upload Your Best Shot!
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: 'text.secondary', marginBottom: 2 }}
            >
                Choose to take a selfie or upload a photo. Make sure your face is well-lit and centered for the best results!
            </Typography>

            {!formData.photo && (
                <ToggleButtonGroup
                    value={isUsingWebcam ? 'webcam' : 'upload'}
                    exclusive
                    onChange={handleModeChange}
                    sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}
                >
                    <ToggleButton value="webcam">
                        <CameraAlt /> Webcam
                    </ToggleButton>
                    <ToggleButton value="upload">
                        <UploadFile /> Upload
                    </ToggleButton>
                </ToggleButtonGroup>
            )}

            {isUsingWebcam && (
                <Typography
                    variant="body2"
                    sx={{
                        color: faceDetected ? 'green' : 'red',
                        fontWeight: 500,
                        marginBottom: 2,
                    }}
                >
                    {feedbackMessage}
                </Typography>
            )}

            <Box
                sx={{
                    height: 300,
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    border: '2px dashed',
                    borderColor: 'divider',
                    marginBottom: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f8f9fa',
                }}
                onDragOver={isUsingWebcam ? undefined : handleDragOver}
                onDrop={isUsingWebcam ? undefined : handleFileDrop}
            >
                {formData.photo ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                            padding: 3,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                            Photo Uploaded Successfully
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', marginBottom: 2 }}
                        >
                            Your photo has been submitted as part of the registration process. You may update it later in your account settings once your registration is complete.
                        </Typography>
                        {/* <Box
                            component="img"
                            src={formData.photo} 
                            alt="Uploaded Photo"
                            sx={{
                                width: 150,
                                height: 150,
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '3px solid #2aa1af', 
                                marginBottom: 2,
                            }}
                        /> */}
                    </Box>
                ) : (
                    <>
                        {!photo ? (
                            isUsingWebcam ? (
                                <>
                                    <Webcam
                                        ref={webcamRef}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            zIndex: 1, // Webcam on top
                                        }}
                                    />
                                    <canvas
                                        ref={canvasRef}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            zIndex: 2, // Canvas overlays webcam
                                        }}
                                    />
                                </>
                            ) : (
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Drag and drop an image here, or{' '}
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        Browse
                                    </Button>
                                    .
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleFileSelect(e)}
                                    />
                                </Typography>
                            )
                        ) : (
                            <Box
                                sx={{
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={photo}
                                    alt="Uploaded or Captured"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                <IconButton
                                    aria-label="clear"
                                    onClick={() => setPhoto(null)}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,1)',
                                        },
                                    }}
                                >
                                    <Clear />
                                </IconButton>
                            </Box>
                        )}
                    </>
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                {isUsingWebcam && !photo && (
                    <Button
                        variant="contained"
                        startIcon={<AddAPhoto />}
                        onClick={handleCapture}
                        disabled={!faceDetected || isUploading}
                        sx={{ flexGrow: 1 }}
                    >
                        Capture Photo
                    </Button>
                )}
                {!isUsingWebcam && !photo && (
                    <Button
                        variant="outlined"
                        startIcon={<UploadFile />}
                        component="label"
                        sx={{ flexGrow: 1 }}
                    >
                        Upload Photo
                        <input hidden accept="image/*" type="file" onChange={handleFileSelect} />
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleUpload}
                    disabled={isUploading || !photo}
                    sx={{ flexGrow: 1 }}
                >
                    Upload
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
                <Alert
                    onClose={handleToastClose}
                    severity={toast.severity}
                    sx={{
                        fontWeight: 500,
                        borderRadius: '32px',
                        padding: '8px 16px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

RefinedFaceCapture.propTypes = {
    formData: PropTypes.object.isRequired,
    handleBack: PropTypes.func.isRequired,
    onCapture: PropTypes.func.isRequired,
};