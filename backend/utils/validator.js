const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    // Minimum 6 characters, at least one letter and one number
    return password.length >= 6;
};

const validateSessionTime = (startTime, durationMinutes) => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = (now - start) / 1000 / 60; // difference in minutes
    return diff <= durationMinutes;
};

module.exports = {
    validateEmail,
    validatePassword,
    validateSessionTime
};