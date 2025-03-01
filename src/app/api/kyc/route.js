import axios from '../../../hooks/axios';

export const saveKycInformation = async (kycDetails) => {
    try {
        const response = await axios.post('/kyc-information', kycDetails);
        return response.data;
    } catch (error) {
        console.error('Failed to create KYC information:', error);
        throw error.response?.data?.message || 'Unable to create KYC information. Please try again.';
    }
};

export const getAllKycInformation = async () => {
    try {
        const response = await axios.get('/kyc-information');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch KYC information:', error);
        throw error.response?.data?.message || 'Unable to fetch KYC information.';
    }
};

export const getKycInformationById = async (id) => {
    try {
        const response = await axios.get(`/kyc-information/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch KYC information for ID: ${id}`, error);
        throw error.response?.data?.message || `Unable to fetch KYC information for ID: ${id}`;
    }
};

export const updateKycInformation = async (id, kycDetails) => {
    try {
        const response = await axios.patch(`/kyc-information/${id}`, kycDetails);
        return response.data;
    } catch (error) {
        console.error(`Failed to update KYC information for ID: ${id}`, error);
        throw error.response?.data?.message || `Unable to update KYC information for ID: ${id}`;
    }
};

export const deleteKycInformation = async (id) => {
    try {
        const response = await axios.delete(`/kyc-information/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to delete KYC information for ID: ${id}`, error);
        throw error.response?.data?.message || `Unable to delete KYC information for ID: ${id}`;
    }
};

export const uploadKycDocuments = async (file, email) => {
    try {
        // Log the received parameters
        console.log('Uploading KYC document with the following details:');
        console.log('File:', file);
        console.log('Email:', email);

        if (!email) {
            throw new Error('Email is required for KYC document upload.');
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('/kyc-information/upload-documents', formData, {
            params: { email },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to upload KYC documents:', error);
        throw error.response?.data?.message || 'Unable to upload KYC documents.';
    }
};
