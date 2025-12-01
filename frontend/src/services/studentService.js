import api from './api';

export const markAttendance = async (qrCodeData, location = null) => {
  const response = await api.post('/student/mark-attendance', {
    qrCodeData,
    location,
    deviceInfo: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
    },
  });
  return response.data;
};

export const getMyAttendance = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/student/attendance?${params}`);
  return response.data;
};

export const getMyCourses = async () => {
  const response = await api.get('/student/courses');
  return response.data;
};

export const getAttendanceStats = async (courseId) => {
  const response = await api.get(`/student/attendance-stats/${courseId}`);
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get('/student/dashboard');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/student/profile', profileData);
  return response.data;
};