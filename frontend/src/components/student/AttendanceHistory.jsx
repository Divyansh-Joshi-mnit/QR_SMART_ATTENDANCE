import React from 'react';
import AttendanceCard from './AttendanceCard';

const AttendanceHistory = ({ history, loading }) => {
    if (loading) return <div className="text-slate-500 text-center py-4">Loading records...</div>;
    
    if (!history || history.length === 0) {
        return (
            <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No attendance records found yet.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {history.map((record) => (
                <AttendanceCard key={record._id} record={record} />
            ))}
        </div>
    );
};

export default AttendanceHistory;