import React from 'react';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    
    return (
        <div className="glass-panel p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                    {course.code}
                </span>
            </div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{course.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{course.department} • Sem {course.semester}</p>
            
            <button 
                onClick={() => navigate(`/teacher/courses/${course._id}`)}
                className="w-full px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
                View Reports
            </button>
        </div>
    );
};

export default CourseCard;