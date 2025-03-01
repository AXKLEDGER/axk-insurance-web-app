import axios from '../../../hooks/axios';

// Fetch traceability data
export const getTraceabilityData = async (batchId) => {
    try {
        const response = await axios.get(`/traceability/${batchId}`);
        return response.data;
    } catch (error) {
        console.error('Fetching traceability data failed:', error);
        throw error.response?.data || error.message;
    }
};

// Add traceability record
export const addTraceabilityRecord = async (recordData) => {
    try {
        const response = await axios.post('/traceability', recordData);
        return response.data;
    } catch (error) {
        console.error('Adding traceability record failed:', error);
        throw error.response?.data || error.message;
    }
};

// Update traceability record
export const updateTraceabilityRecord = async (batchId, updateData) => {
    try {
        const response = await axios.put(`/traceability/${batchId}`, updateData);
        return response.data;
    } catch (error) {
        console.error('Updating traceability record failed:', error);
        throw error.response?.data || error.message;
    }
};
