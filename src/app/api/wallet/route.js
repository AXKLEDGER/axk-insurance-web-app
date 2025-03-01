import axios from '../../../hooks/axios';

// Get wallet balance
export const getWalletBalance = async () => {
    try {
        const response = await axios.get('/wallet/balance');
        return response.data;
    } catch (error) {
        console.error('Fetching wallet balance failed:', error);
        throw error.response?.data || error.message;
    }
};

// Transfer funds
export const transferFunds = async (transferDetails) => {
    try {
        const response = await axios.post('/wallet/transfer', transferDetails);
        return response.data;
    } catch (error) {
        console.error('Transfer failed:', error);
        throw error.response?.data || error.message;
    }
};

// Fetch transaction history
export const getTransactionHistory = async () => {
    try {
        const response = await axios.get('/wallet/transactions');
        return response.data;
    } catch (error) {
        console.error('Fetching transactions failed:', error);
        throw error.response?.data || error.message;
    }
};

export const withdrawFunds = async (withdrawDetails) => {
    try {
        const response = await axios.post('/wallet/withdraw', withdrawDetails);
        return response.data;
    } catch (error) {
        console.error('Withdrawal failed:', error);
        throw error.response?.data || error.message;
    }
};

export const depositFunds = async (depositDetails) => {
    try {
        const response = await axios.post('/wallet/deposit', depositDetails);
        return response.data;
    } catch (error) {
        console.error('Deposit failed:', error);
        throw error.response?.data || error.message;
    }
};
