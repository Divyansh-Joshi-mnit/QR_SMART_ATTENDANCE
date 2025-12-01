import React from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AttendanceCard = ({ record }) => {
    const isPresent = record.status === 'Present';
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex justify-between items-center"
        >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${isPresent ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    <Calendar size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{record.course?.name || 'Unknown Course'}</h4>
                    <p className="text-sm text-slate-500">
                        {new Date(record.createdAt).toLocaleDateString()} • {new Date(record.createdAt).toLocaleTimeString()}
                    </p>
                </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                isPresent 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
                {isPresent ? <CheckCircle size={14} /> : <XCircle size={14} />}
                {record.status}
            </div>
        </motion.div>
    );
};

export default AttendanceCard;