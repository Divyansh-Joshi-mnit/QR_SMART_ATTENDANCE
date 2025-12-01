import api from './api';

// ==================== USER MANAGEMENT ====================

export const getAllUsers = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/admin/users?${params}`);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/admin/users', userData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/admin/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

export const toggleUserStatus = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/toggle-status`);
  return response.data;
};

// ==================== COURSE MANAGEMENT ====================

export const getAllCourses = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/admin/courses?${params}`);
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await api.post('/admin/courses', courseData);
  return response.data;
};

export const updateCourse = async (courseId, courseData) => {
  const response = await api.put(`/admin/courses/${courseId}`, courseData);
  return response.data;
};

export const deleteCourse = async (courseId) => {
  const response = await api.delete(`/admin/courses/${courseId}`);
  return response.data;
};

export const enrollStudents = async (courseId, studentIds) => {
  const response = await api.post(`/admin/courses/${courseId}/enroll`, {
    studentIds,
  });
  return response.data;
};

// ==================== DEPARTMENT MANAGEMENT ====================

export const getAllDepartments = async () => {
  const response = await api.get('/admin/departments');
  return response.data;
};

export const createDepartment = async (departmentData) => {
  const response = await api.post('/admin/departments', departmentData);
  return response.data;
};

export const updateDepartment = async (departmentId, departmentData) => {
  const response = await api.put(`/admin/departments/${departmentId}`, departmentData);
  return response.data;
};

export const deleteDepartment = async (departmentId) => {
  const response = await api.delete(`/admin/departments/${departmentId}`);
  return response.data;
};

// ==================== ANALYTICS ====================

export const getAnalytics = async () => {
  const response = await api.get('/admin/analytics');
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};