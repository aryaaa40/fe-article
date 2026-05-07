import api from './axios';

export const articleService = {
  getAll: (limit = 100, offset = 0) => api.get(`/article/${limit}/${offset}`),
  getById: (id) => api.get(`/article/${id}`),
  create: (data) => api.post('/article/', data),
  update: (id, data) => api.put(`/article/${id}`, data),
  delete: (id) => api.delete(`/article/${id}`),
};
