import apiClient from '../../services/api/client';

export const getWallet = () => apiClient.get('/wallet');
export const addWalletFunds = (payload) => apiClient.post('/wallet/top-up', payload);
