import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, User, QrCode } from 'lucide-react';

const Navbar = ({ title }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-panel sticky top-4 z-50 mx-4 rounded-xl px-6 py-3 flex justify-between items-center bg-white/90 dark:bg-slate-900 backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <QrCode className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">
                    {title || 'Smart Attendance'}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-100">{user?.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-300 capitalize">{user?.role}</span>
                </div>
                
                <button 
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;