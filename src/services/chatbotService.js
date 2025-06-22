import api from './api';

export const sendMessage = async (data) => {
  try {
    const response = await api.post('/query', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};