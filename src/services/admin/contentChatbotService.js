import api from '../api';

export const getContentChatbots = async () => {
  try {
    const response = await api.get('/documents');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createContentChatbots = async (data) => {
  try {
    const response = await api.post('/documents', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateContentChatbots = async (id, data) => {
  try {
    const response = await api.put(`/documents/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteContentChatbots = async (id) => {
  try {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};