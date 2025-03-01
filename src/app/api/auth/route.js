import axios from '../../../hooks/axios';

// Login API
export const login = async (payload) => {
    try {
        const response = await axios.post('/auth/login', payload);

        if (response.data?.data) {
            const { accessToken, refreshToken, expiresIn, user } = response.data.data;

            console.log("Login successful:", response.data);

            // Save tokens and user details in localStorage
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));

            // Calculate and store token expiration time (current time + expiresIn in milliseconds)
            const expirationTime = new Date().getTime() + expiresIn * 1000;
            localStorage.setItem('token_expiration', expirationTime);

            return response.data;
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Login failed:', error);
        const errorMessage = error.response?.data?.message || 'Unable to log in. Please try again.';
        throw new Error(errorMessage);
    }
};

// Register API
export const register = async (userDetails) => {
    try {
        const response = await axios.post('/auth/register', userDetails);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error.response?.data?.message || 'Unable to register. Please try again.';
    }
};


// Logout
export const logout = async () => {
    try {
        const response = await axios.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error);
        throw error.response?.data || error.message;
    }
};

// Request password reset
export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post('/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error('Password reset request failed:', error);
        throw error.response?.data || error.message;
    }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post('/auth/reset-password', { token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Password reset failed:', error);
        throw error.response?.data || error.message;
    }
};

// Check username availability
export const checkUsername = async (username) => {
    try {
        const response = await axios.post('/user/check-username', { username });
        return response.data;
    } catch (error) {
        console.error('Username check failed:', error);
        throw error.response?.data?.message || 'Unable to check username availability. Please try again.';
    }
};

// Validate OTP
export const validateOtp = async (email, otp) => {
    try {
        const response = await axios.post('/otp-verification/validate', { email, otp });
        return response.data;
    } catch (error) {
        console.error('OTP validation failed:', error);
        throw error.response?.data?.message || 'Invalid OTP. Please try again.';
    }
};

// Resend OTP
export const resendOtp = async (payload) => {
    try {
        const response = await axios.post('/otp-verification/resend-otp', payload);
        console.log('OTP Resent Successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to resend OTP:', error);
        throw error.response?.data?.message || 'Unable to resend OTP. Please try again.';
    }
};

// Get clients details
export const getClientDetails = async () => {
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        const locationResponse = await fetch(`https://ipwhois.app/json/${ip}`);
        const locationData = await locationResponse.json();

        return {
            ipAddress: ip,
            userAgent: navigator.userAgent,
            location: `${locationData.city}, ${locationData.region}, ${locationData.country}`,
        };
    } catch (error) {
        console.error('Error fetching client details:', error);
        return {
            ipAddress: 'Unknown',
            userAgent: navigator.userAgent,
            location: 'Unknown',
        };
    }
};  