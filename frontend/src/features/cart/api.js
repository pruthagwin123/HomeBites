import apiClient from '../../services/api/client';

export const getCart = () => apiClient.get('/cart');
export const addCartItem = (payload) => apiClient.post('/cart/items', payload);
