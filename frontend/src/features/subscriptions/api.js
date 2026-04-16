import apiClient from '../../services/api/client';

export const getSubscriptions = () => apiClient.get('/subscriptions');
export const createSubscription = (payload) => apiClient.post('/subscriptions', payload);
