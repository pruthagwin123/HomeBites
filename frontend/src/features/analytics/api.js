import apiClient from '../../services/api/client';

export const getChefAnalytics = () => apiClient.get('/analytics/chef');
