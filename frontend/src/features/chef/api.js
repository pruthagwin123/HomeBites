import apiClient from '../../services/api/client';

export const getChefProfile = () => apiClient.get('/chefs/me');
export const updateChefProfile = (payload) => apiClient.patch('/chefs/me', payload);
