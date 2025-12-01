import React from 'react';

const DepartmentTable = ({ departments }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="font-bold text-lg mb-4">Departments</h3>
            <div className="grid gap-3">
                {departments.map((dept, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-800">{dept.name}</span>
                        <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">{dept.code || 'N/A'}</span>
                    </div>
                ))}
                {departments.length === 0 && <p className="text-slate-400">No departments added.</p>}
            </div>
        </div>
    );
};

export default DepartmentTable;
