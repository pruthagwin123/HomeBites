import apiClient from '../../services/api/client';

export const submitReview = (payload) => apiClient.post('/reviews', payload);
export const getFoodReviews = (foodId) => apiClient.get(`/reviews/food/${foodId}`);
