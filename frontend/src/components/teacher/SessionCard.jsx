import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const SessionCard = ({ session, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all border ${
                isSelected
                ? 'bg-blue-600 text-white shadow-md border-blue-600'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
        >
            <div className={`p-2 rounded ${isSelected ? 'bg-blue-500' : 'bg-slate-100'}`}>
                <Calendar size={18} />
            </div>
            <div>
                <p className="font-semibold text-sm">
                    {new Date(session.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-1 text-xs opacity-80 mt-1">
                    <Clock size={12} />
                    {new Date(session.createdAt).toLocaleTimeString()}
                </div>
            </div>
        </button>
    );
};

export default SessionCard;