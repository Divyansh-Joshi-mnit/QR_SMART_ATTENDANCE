import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const UserTable = ({ users, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-slate-50">
                            <td className="p-4 font-medium text-slate-800">{user.name}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                                    user.role === 'student' ? 'bg-green-100 text-green-700' :
                                    user.role === 'teacher' ? 'bg-blue-100 text-blue-700' :
                                    'bg-purple-100 text-purple-700'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-4 text-slate-500 text-sm">{user.email}</td>
                            <td className="p-4 flex gap-2">
                                <button onClick={() => onEdit(user)} className="text-blue-500 hover:text-blue-700"><Edit size={16}/></button>
                                <button onClick={() => onDelete(user._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;