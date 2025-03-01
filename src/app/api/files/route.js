import axios from '../../../hooks/axios';

// Upload a file to a specific category
export const uploadFile = async (category, file, email) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`/files/upload/${category}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('File upload failed:', error);
        throw error.response?.data || error.message;
    }
};

// Retrieve a file by its filename
export const retrieveFile = async (filename) => {
    try {
        const response = await axios.get(`/files/retrieve/${filename}`);
        return response.data;
    } catch (error) {
        console.error('File retrieval failed:', error);
        throw error.response?.data || error.message;
    }
};

// View a file in a specific category by its filename
export const viewFile = async (category, filename) => {
    try {
        const response = await axios.get(`/files/view/${category}/${filename}`, {
            responseType: 'blob', // Assuming it's a file download
        });

        return response.data;
    } catch (error) {
        console.error('Viewing file failed:', error);
        throw error.response?.data || error.message;
    }
};

// List all user files
export const listUserFiles = async () => {
    try {
        const response = await axios.get('/files/user-files');
        return response.data;
    } catch (error) {
        console.error('Fetching user files failed:', error);
        throw error.response?.data || error.message;
    }
};

// List files in a specific category
export const listFilesByCategory = async (category) => {
    try {
        const response = await axios.get(`/files/list/${category}`);
        return response.data;
    } catch (error) {
        console.error('Fetching files by category failed:', error);
        throw error.response?.data || error.message;
    }
};

// List all files
export const listAllFiles = async () => {
    try {
        const response = await axios.get('/files/list-all');
        return response.data;
    } catch (error) {
        console.error('Fetching all files failed:', error);
        throw error.response?.data || error.message;
    }
};