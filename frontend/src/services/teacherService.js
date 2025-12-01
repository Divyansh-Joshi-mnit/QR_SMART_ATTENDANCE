import api from './api';

export const generateQR = async (courseId, location = null) => {
  const response = await api.post('/teacher/generate-qr', {
    courseId,
    location,
  });
  return response.data;
};

export const endSession = async (sessionId) => {
  const response = await api.put(`/teacher/end-session/${sessionId}`);
  return response.data;
};

export const getActiveSession = async (courseId) => {
  const response = await api.get(`/teacher/active-session/${courseId}`);
  return response.data;
};

export const getSessionAttendance = async (sessionId) => {
  const response = await api.get(`/teacher/session-attendance/${sessionId}`);
  return response.data;
};

export const getMyCourses = async () => {
  const response = await api.get('/teacher/courses');
  return response.data;
};

export const getCourseReport = async (courseId, filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/teacher/course-report/${courseId}?${params}`);
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get('/teacher/dashboard');
  return response.data;
};

export const getStudentDetails = async (courseId, studentId) => {
  const response = await api.get(`/teacher/student-details/${courseId}/${studentId}`);
  return response.data;
};