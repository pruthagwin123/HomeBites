import apiClient from '../../services/api/client';

export const placeOrder = (payload) => apiClient.post('/orders', payload);
export const getMyOrders = () => apiClient.get('/orders/me');
