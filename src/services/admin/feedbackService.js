import api from '../api';

export const getFeedbacks = async () => {
  try {
    const response = await api.get('/feedback');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteFeedback = async (id) => {
  try {
    const response = await api.delete(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};