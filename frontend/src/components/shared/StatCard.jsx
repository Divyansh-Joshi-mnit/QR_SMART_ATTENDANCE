import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color, onClick }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            onClick={onClick}
            className={`glass-panel p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
        >
            <div className={`${color} p-4 rounded-lg text-white shadow-lg shadow-opacity-20`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{label}</p>
                <h4 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h4>
            </div>
        </motion.div>
    );
};

export default StatCard;