import React from 'react';
import { Trash2 } from 'lucide-react';

const CourseTable = ({ courses, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                    <tr>
                        <th className="p-4">Code</th>
                        <th className="p-4">Course Name</th>
                        <th className="p-4">Department</th>
                        <th className="p-4">Credits</th>
                        <th className="p-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {courses.map((course) => (
                        <tr key={course._id} className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-700">{course.code}</td>
                            <td className="p-4 text-slate-800">{course.name}</td>
                            <td className="p-4 text-slate-500">{course.department}</td>
                            <td className="p-4">{course.credits}</td>
                            <td className="p-4">
                                <button onClick={() => onDelete(course._id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;