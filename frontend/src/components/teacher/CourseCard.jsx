import React, { useState, useEffect } from 'react';
import { BookOpen, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const [activeSession, setActiveSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTerminating, setIsTerminating] = useState(false);

    // Check for active session when component mounts
    useEffect(() => {
        const checkActiveSession = async () => {
            setIsLoading(true);
            try {
                const res = await API.get(`/teacher/courses/${course._id}/active-session`);
                if (res.data) {
                    setActiveSession(res.data);
                }
            } catch (error) {
                console.error('Error checking active session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkActiveSession();
    }, [course._id]);

    const handleTerminateSession = async () => {
        if (!activeSession?._id) return;
        
        if (!window.confirm('Are you sure you want to end this session? This cannot be undone.')) {
            return;
        }

        setIsTerminating(true);
        try {
            await API.put(`/teacher/sessions/${activeSession._id}/cancel`);
            setActiveSession(null);
            // Optionally show a success toast
        } catch (error) {
            console.error('Failed to terminate session:', error);
            // Optionally show an error toast
        } finally {
            setIsTerminating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="glass-panel p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

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
            
            {activeSession && (
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                                Active Session
                            </span>
                        </div>
                        <button
                            onClick={handleTerminateSession}
                            disabled={isTerminating}
                            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded flex items-center gap-1 disabled:opacity-50"
                        >
                            {isTerminating ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                                <X size={14} />
                            )}
                            End Session
                        </button>
                    </div>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                        Started: {new Date(activeSession.createdAt).toLocaleTimeString()}
                    </p>
                </div>
            )}
            
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