import axios from '../../../hooks/axios';

// Fetch all countries
export const getAllCountries = async () => {
    try {
        const response = await axios.get('/country');
        return response.data;
    } catch (error) {
        console.error('Fetching countries failed:', error);
        throw error.response?.data || error.message;
    }
};
