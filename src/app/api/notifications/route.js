import apiClient from '../index';

export const sendNotification = async (notificationData) => {
    const response = await axios.post('/notifications/send', notificationData);
    return response.data;
};
