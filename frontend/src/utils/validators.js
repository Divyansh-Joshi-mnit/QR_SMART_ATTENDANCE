export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!regex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 100) return 'Name must not exceed 100 characters';
  return null;
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  if (!phone) return null; // Phone is optional
  if (!regex.test(phone)) return 'Phone must be 10 digits';
  return null;
};

export const validateRollNo = (rollNo) => {
  if (!rollNo) return 'Roll number is required';
  if (rollNo.length < 3) return 'Roll number must be at least 3 characters';
  return null;
};

export const validateEmployeeId = (employeeId) => {
  if (!employeeId) return 'Employee ID is required';
  if (employeeId.length < 3) return 'Employee ID must be at least 3 characters';
  return null;
};

export const validateCourseCode = (code) => {
  if (!code) return 'Course code is required';
  if (code.length < 3) return 'Course code must be at least 3 characters';
  return null;
};

export const validateCourseName = (name) => {
  if (!name) return 'Course name is required';
  if (name.length < 3) return 'Course name must be at least 3 characters';
  return null;
};

export const validateSemester = (semester) => {
  const sem = parseInt(semester);
  if (!semester) return 'Semester is required';
  if (sem < 1 || sem > 8) return 'Semester must be between 1 and 8';
  return null;
};

export const validateCredits = (credits) => {
  const cred = parseInt(credits);
  if (!credits) return 'Credits are required';
  if (cred < 1 || cred > 6) return 'Credits must be between 1 and 6';
  return null;
};

export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const validator = rules[field];
    const error = validator(values[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};