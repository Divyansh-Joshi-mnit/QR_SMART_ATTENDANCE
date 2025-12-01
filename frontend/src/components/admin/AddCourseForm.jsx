import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const AddCourseForm = ({ onSuccess }) => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        department: '',
        credits: 3,
        semester: 1,
        teacherId: ''
    });

    useEffect(() => {
        // Fetch all users to filter for teachers
        // Ideally backend should provide a /teachers endpoint, but we reused /admin/users
        const fetchTeachers = async () => {
            try {
                const res = await API.get('/admin/users');
                const teacherList = res.data.filter(u => u.role === 'teacher');
                setTeachers(teacherList);
            } catch (error) {
                console.error("Failed to load teachers");
            }
        };
        fetchTeachers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/admin/courses', formData);
            alert('Course Created Successfully!');
            onSuccess();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create course');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Course Name</label>
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="e.g. Software Engineering"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="label">Course Code</label>
                    <input 
                        type="text" 
                        className="input-field uppercase" 
                        placeholder="e.g. CS302"
                        required
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Department</label>
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="e.g. CSE"
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                    />
                </div>
                <div>
                    <label className="label">Semester</label>
                    <input 
                        type="number" 
                        className="input-field" 
                        min="1" max="8"
                        required
                        value={formData.semester}
                        onChange={(e) => setFormData({...formData, semester: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="label">Assign Teacher</label>
                <select 
                    className="input-field"
                    required
                    value={formData.teacherId}
                    onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                >
                    <option value="">Select a Professor</option>
                    {teachers.map(t => (
                        <option key={t._id} value={t._id}>
                            {t.name} ({t.email})
                        </option>
                    ))}
                </select>
                {teachers.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">No teachers found. Please register a teacher first.</p>
                )}
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary mt-4"
            >
                {loading ? 'Creating...' : 'Create Course'}
            </button>
        </form>
    );
};

export default AddCourseForm;