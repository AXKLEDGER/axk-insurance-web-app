import axios from '../../../hooks/axios';

// Fetch all users
export const getAllUsers = async () => {
    try {
        const response = await axios.get('/admin/users');
        return response.data;
    } catch (error) {
        console.error('Fetching users failed:', error);
        throw error.response?.data || error.message;
    }
};

// Delete user
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Deleting user failed:', error);
        throw error.response?.data || error.message;
    }
};
