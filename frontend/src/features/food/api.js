import apiClient from '../../services/api/client';

export const getFoodListings = (params) => apiClient.get('/foods', { params });
