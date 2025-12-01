import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Lock, BookOpen, Hash, Building2, Phone, Briefcase, GraduationCap } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    
    // Default Role is Student
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        // Student specific
        rollNumber: '',
        department: '',
        semester: '',
        // Teacher specific
        designation: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Filter data based on role to avoid sending empty irrelevant fields
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role,
                department: formData.department,
                ...(role === 'student' && {
                    rollNumber: formData.rollNumber,
                    semester: formData.semester
                }),
                ...(role === 'teacher' && {
                    designation: formData.designation,
                    phone: formData.phone
                })
            };

            const res = await API.post('/auth/register', payload);
            login(res.data.token, res.data);
            
            // Redirect
            if (role === 'student') navigate('/student/dashboard');
            else navigate('/teacher/dashboard');
            
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative bg-[#0f172a] py-10 px-4 flex items-center justify-center">
             {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel w-full max-w-2xl p-8 rounded-2xl relative z-10 border border-white/10 bg-white/5"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join the Smart Attendance System</p>
                </div>

                {/* Role Toggle */}
                <div className="flex bg-white/5 p-1 rounded-lg mb-8 max-w-xs mx-auto border border-white/10">
                    <button
                        type="button"
                        onClick={() => setRole('student')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all text-sm font-medium ${
                            role === 'student' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <GraduationCap size={18} /> Student
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('teacher')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all text-sm font-medium ${
                            role === 'teacher' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Briefcase size={18} /> Teacher
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Common Fields */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <InputGroup icon={User} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                        <InputGroup icon={Mail} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                        <InputGroup icon={Lock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    </div>

                    <div className="col-span-1 md:col-span-2 border-t border-white/10 my-2"></div>

                    {/* Dynamic Fields */}
                    {role === 'student' ? (
                        <>
                            <InputGroup icon={Hash} type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} />
                            <InputGroup icon={Building2} type="text" name="department" placeholder="Department (e.g., CSE)" value={formData.department} onChange={handleChange} />
                            <InputGroup icon={BookOpen} type="number" name="semester" placeholder="Semester (1-8)" value={formData.semester} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <InputGroup icon={Building2} type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
                            <InputGroup icon={Briefcase} type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
                            <InputGroup icon={Phone} type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                        </>
                    )}

                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/25"
                        >
                            {loading ? 'Creating Account...' : 'Register Now'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

// Helper Component for Inputs to keep code clean
const InputGroup = ({ icon: Icon, type, name, placeholder, value, onChange }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-3 text-gray-500" size={18} />
        <input 
            type={type}
            name={name}
            placeholder={placeholder}
            required
            value={value}
            onChange={onChange}
            className="w-full bg-white/5 border border-gray-600 text-white pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 text-sm"
        />
    </div>
);

export default Register;