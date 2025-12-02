import React, { useState } from 'react';
import API from '../../services/api';

const AddUserForm = ({ onSuccess }) => {
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: 'password123', // Default password
        department: '',
        rollNumber: '',
        semester: '',
        designation: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Reusing the public register endpoint or a specific admin one
            // We use the auth/register one but send the role
            await API.post('/auth/register', { ...formData, role });
            alert('User Registered Successfully!');
            onSuccess();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to register user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                {['student', 'teacher', 'admin'].map((r) => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`flex-1 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                            role === r ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                        }`}
                    >
                        {r}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Full Name</label>
                    <input 
                        type="text" required className="input-field" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="label">Email</label>
                    <input 
                        type="email" required className="input-field" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="label">Password</label>
                <input 
                    type="text" required className="input-field bg-slate-100" 
                    value={formData.password}
                    // In a real app, you'd let admin set this or auto-generate email
                />
                <p className="text-xs text-slate-500 mt-1">Default password: password123</p>
            </div>

            {/* Conditional Fields */}
            {role === 'student' && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Roll Number</label>
                            <input 
                                type="text" required className="input-field" 
                                value={formData.rollNumber}
                                onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="label">Semester</label>
                            <input 
                                type="number" required className="input-field" 
                                value={formData.semester}
                                onChange={(e) => setFormData({...formData, semester: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="label">Department</label>
                        <input 
                            type="text" required className="input-field" 
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                        />
                    </div>
                </>
            )}

            {role === 'teacher' && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">Department</label>
                        <input 
                            type="text" required className="input-field" 
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="label">Designation</label>
                        <input 
                            type="text" required className="input-field" 
                            placeholder="e.g. Asst. Professor"
                            value={formData.designation}
                            onChange={(e) => setFormData({...formData, designation: e.target.value})}
                        />
                    </div>
                </div>
            )}

            <button type="submit" disabled={loading} className="w-full btn-primary mt-6">
                {loading ? 'Processing...' : `Register ${role}`}
            </button>
        </form>
    );
};

export default AddUserForm;