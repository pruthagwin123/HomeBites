import apiClient from '../../services/api/client';

export const getOrderTracking = (orderId) => apiClient.get(`/tracking/${orderId}`);
