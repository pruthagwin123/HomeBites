import apiClient from '../../services/api/client';

export const login = (payload) => apiClient.post('/auth/login', payload);
export const signup = (payload) => apiClient.post('/auth/signup', payload);
