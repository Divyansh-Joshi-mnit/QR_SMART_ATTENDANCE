import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import API from '../../services/api';
import { Users, Search } from 'lucide-react';

const ManageUsers = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const initialType = params.get('type') === 'teachers' ? 'teachers' : 'students';

    const [viewType, setViewType] = useState(initialType); // 'students' | 'teachers'
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData(viewType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewType]);

    const fetchData = async (type) => {
        try {
            setLoading(true);
            setError('');
            const endpoint = type === 'teachers' ? '/admin/teachers' : '/admin/students';
            const res = await API.get(endpoint);
            setItems(res.data || []);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.response?.data?.message || 'Failed to load data');
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = items.filter((item) => {
        const name = item.user?.name || '';
        const email = item.user?.email || '';
        const roll = item.rollNumber || '';
        const dept = item.department || '';
        const term = searchTerm.toLowerCase();
        return (
            name.toLowerCase().includes(term) ||
            email.toLowerCase().includes(term) ||
            roll.toLowerCase().includes(term) ||
            dept.toLowerCase().includes(term)
        );
    });

    const isStudents = viewType === 'students';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-10">
            <Navbar title={isStudents ? 'All Students' : 'All Teachers'} />

            <div className="container mx-auto px-4 mt-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Users /> {isStudents ? 'Students' : 'Teachers'}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            {isStudents
                                ? 'View all registered students with their roll numbers and departments.'
                                : 'View all registered teachers.'}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors mb-2 md:mb-0"
                        >
                            Back to Dashboard
                        </button>
                        <div className="flex gap-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-1">
                        <button
                            onClick={() => setViewType('students')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isStudents
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            Students
                        </button>
                        <button
                            onClick={() => setViewType('teachers')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                !isStudents
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            Teachers
                        </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder={
                                isStudents
                                    ? 'Search by name, roll number, email, or department...'
                                    : 'Search by name or email...'
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500">
                            Loading {isStudents ? 'students' : 'teachers'}...
                        </p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500">
                            No {isStudents ? 'students' : 'teachers'} found.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    {isStudents && (
                                        <>
                                            <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Roll No
                                            </th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Name
                                            </th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Branch
                                            </th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Semester
                                            </th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Email
                                            </th>
                                        </>
                                    )}
                                    {!isStudents && (
                                        <>
                                            <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Name
                                            </th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Email
                                            </th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {filteredItems.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    >
                                        {isStudents && (
                                            <>
                                                <td className="p-4 font-medium text-slate-800 dark:text-white">
                                                    {item.rollNumber}
                                                </td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300">
                                                    {item.user?.name}
                                                </td>
                                                <td className="p-4 text-slate-600 dark:text-slate-400">
                                                    {item.department}
                                                </td>
                                                <td className="p-4 text-slate-600 dark:text-slate-400">
                                                    {item.semester}
                                                </td>
                                                <td className="p-4 text-slate-600 dark:text-slate-400">
                                                    {item.user?.email}
                                                </td>
                                            </>
                                        )}
                                        {!isStudents && (
                                            <>
                                                <td className="p-4 font-medium text-slate-800 dark:text-white">
                                                    {item.user?.name}
                                                </td>
                                                <td className="p-4 text-slate-600 dark:text-slate-400">
                                                    {item.user?.email}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;