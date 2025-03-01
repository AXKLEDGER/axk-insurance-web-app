import axios from '../../../hooks/axios';

// Fetch all marketplace listings
export const getMarketplaceListings = async () => {
    try {
        const response = await axios.get('/marketplace/listings');
        return response.data;
    } catch (error) {
        console.error('Fetching marketplace listings failed:', error);
        throw error.response?.data || error.message;
    }
};

// Add a new listing
export const addListing = async (listingData) => {
    try {
        const response = await axios.post('/marketplace/listings', listingData);
        return response.data;
    } catch (error) {
        console.error('Adding listing failed:', error);
        throw error.response?.data || error.message;
    }
};

// Fetch a single listing
export const getListingById = async (id) => {
    try {
        const response = await axios.get(`/marketplace/listings/${id}`);
        return response.data;
    } catch (error) {
        console.error('Fetching listing failed:', error);
        throw error.response?.data || error.message;
    }
};

// Update listing
export const updateListing = async (id, updateData) => {
    try {
        const response = await axios.put(`/marketplace/listings/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error('Updating listing failed:', error);
        throw error.response?.data || error.message;
    }
};

export const searchListings = async (query) => {
    try {
        const response = await axios.get(`/marketplace/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.error('Search listings failed:', error);
        throw error.response?.data || error.message;
    }
};
