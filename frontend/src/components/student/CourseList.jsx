import React from 'react';
import { BookOpen } from 'lucide-react';

const CourseList = ({ courses }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
                <div key={course._id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded text-blue-600">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold">{course.name}</h4>
                        <p className="text-xs text-slate-500">{course.code}</p>
                        <div className="mt-2 text-xs bg-slate-100 inline-block px-2 py-1 rounded">
                            Attendance: {course.attendancePercentage || 0}%
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseList;