// import React, { useState, useEffect, useContext } from 'react';
// import Navbar from '../../components/common/Navbar';
// import QRScanner from '../../components/shared/QRScanner';
// import API from '../../services/api';
// import { AuthContext } from '../../context/AuthContext';
// import { Scan, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
// import { motion } from 'framer-motion';

// const StudentDashboard = () => {
//     const { user } = useContext(AuthContext);
//     const [showScanner, setShowScanner] = useState(false);
//     const [stats, setStats] = useState({ present: 0, total: 0, percentage: 0 });
//     const [recentHistory, setRecentHistory] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [scanResult, setScanResult] = useState({ type: '', message: '' });

//     // Fetch initial data
//     useEffect(() => {
//         fetchDashboardData();
//     }, []);

//     const fetchDashboardData = async () => {
//         try {
//             // Mocking data fetching for now - replace with actual endpoints later
//             const res = await API.get('/student/attendance'); // Assumes this returns history
//             const history = res.data;
            
//             const total = history.length;
//             const present = history.filter(h => h.status === 'Present').length;
            
//             setStats({
//                 total,
//                 present,
//                 percentage: total > 0 ? Math.round((present / total) * 100) : 0
//             });
//             setRecentHistory(history.slice(0, 5)); // Top 5
//         } catch (error) {
//             console.error("Error fetching data", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleScanSuccess = async (decodedText) => {
//         setShowScanner(false);
//         try {
//             // Send scanned data to backend
//             const res = await API.post('/student/mark-attendance', { 
//                 qrResult: decodedText,
//                 location: null // Add geolocation logic here if needed
//             });
            
//             setScanResult({ type: 'success', message: 'Attendance Marked Successfully!' });
//             fetchDashboardData(); // Refresh stats
            
//             // Clear success message after 3 seconds
//             setTimeout(() => setScanResult({ type: '', message: '' }), 3000);

//         } catch (error) {
//             setScanResult({ type: 'error', message: error.response?.data?.message || 'Failed to mark attendance' });
//             setTimeout(() => setScanResult({ type: '', message: '' }), 4000);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-10">
//             <Navbar title="Student Dashboard" />

//             {/* Notification Toast */}
//             {scanResult.message && (
//                 <div className={`fixed bottom-10 right-4 md:right-10 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up ${
//                     scanResult.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
//                 }`}>
//                     {scanResult.type === 'success' ? <CheckCircle /> : <XCircle />}
//                     <span className="font-semibold">{scanResult.message}</span>
//                 </div>
//             )}

//             <div className="container mx-auto px-4 mt-8">
                
//                 {/* Welcome & Scan Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     {/* Hero Card */}
//                     <motion.div 
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
//                     >
//                         <div className="relative z-10">
//                             <h1 className="text-3xl font-bold mb-2">Hello, {user?.name?.split(' ')[0]}!</h1>
//                             <p className="text-blue-100 mb-6 max-w-md">
//                                 Ready for your next class? Scan the QR code projected by your teacher to mark your attendance instantly.
//                             </p>
//                             <button 
//                                 onClick={() => setShowScanner(true)}
//                                 className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
//                             >
//                                 <Scan size={20} />
//                                 Scan QR Code
//                             </button>
//                         </div>
//                         {/* Decorative Background */}
//                         <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
//                             <Scan size={250} />
//                         </div>
//                     </motion.div>

//                     {/* Quick Stats Card */}
//                     <motion.div 
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.1 }}
//                         className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
//                     >
//                         <div className="relative mb-4">
//                             <svg className="w-32 h-32 transform -rotate-90">
//                                 <circle
//                                     className="text-slate-200 dark:text-slate-700"
//                                     strokeWidth="10"
//                                     stroke="currentColor"
//                                     fill="transparent"
//                                     r="58"
//                                     cx="64"
//                                     cy="64"
//                                 />
//                                 <circle
//                                     className="text-blue-500"
//                                     strokeWidth="10"
//                                     strokeDasharray={365}
//                                     strokeDashoffset={365 - (365 * stats.percentage) / 100}
//                                     strokeLinecap="round"
//                                     stroke="currentColor"
//                                     fill="transparent"
//                                     r="58"
//                                     cx="64"
//                                     cy="64"
//                                 />
//                             </svg>
//                             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                                 <span className="text-2xl font-bold text-slate-800 dark:text-white">{stats.percentage}%</span>
//                             </div>
//                         </div>
//                         <h3 className="text-slate-500 font-medium">Overall Attendance</h3>
//                     </motion.div>
//                 </div>

//                 {/* Recent Activity */}
//                 <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
//                     <Clock size={20} /> Recent Activity
//                 </h2>
                
//                 <div className="grid gap-4">
//                     {loading ? (
//                         <p className="text-slate-500">Loading history...</p>
//                     ) : recentHistory.length > 0 ? (
//                         recentHistory.map((record) => (
//                             <motion.div 
//                                 key={record._id}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex justify-between items-center"
//                             >
//                                 <div className="flex items-center gap-4">
//                                     <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
//                                         <Calendar size={20} />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-bold text-slate-800 dark:text-white">{record.course?.name || 'Unknown Course'}</h4>
//                                         <p className="text-sm text-slate-500">
//                                             {new Date(record.createdAt).toLocaleDateString()} • {new Date(record.createdAt).toLocaleTimeString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className={`px-3 py-1 rounded-full text-sm font-medium ${
//                                     record.status === 'Present' 
//                                     ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
//                                     : 'bg-red-100 text-red-700'
//                                 }`}>
//                                     {record.status}
//                                 </div>
//                             </motion.div>
//                         ))
//                     ) : (
//                         <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300">
//                             <p className="text-slate-500">No attendance records found yet.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Render Scanner Modal */}
//             {showScanner && (
//                 <QRScanner 
//                     onScanSuccess={handleScanSuccess}
//                     onScanError={(err) => console.log(err)}
//                     onClose={() => setShowScanner(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default StudentDashboard;

import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/common/Navbar';
import QRScanner from '../../components/shared/QRScanner';
import AttendanceHistory from '../../components/student/AttendanceHistory';
import StatCard from '../../components/shared/StatCard';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { Scan, CheckCircle, XCircle, Clock, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [showScanner, setShowScanner] = useState(false);
    const [stats, setStats] = useState({ present: 0, total: 0, percentage: 0 });
    const [recentHistory, setRecentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scanResult, setScanResult] = useState({ type: '', message: '' });

    // Fetch initial data
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Mocking data fetching for now - replace with actual endpoints later
            const res = await API.get('/student/attendance');
            const history = res.data;
            
            const total = history.length;
            const present = history.filter(h => h.status === 'Present').length;
            
            setStats({
                total,
                present,
                percentage: total > 0 ? Math.round((present / total) * 100) : 0
            });
            setRecentHistory(history.slice(0, 5)); // Top 5
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScanSuccess = async (decodedText) => {
        setShowScanner(false);
        try {
            const res = await API.post('/student/mark-attendance', { 
                qrResult: decodedText,
                location: null 
            });
            
            setScanResult({ type: 'success', message: 'Attendance Marked Successfully!' });
            fetchDashboardData();
            
            setTimeout(() => setScanResult({ type: '', message: '' }), 3000);

        } catch (error) {
            setScanResult({ type: 'error', message: error.response?.data?.message || 'Failed to mark attendance' });
            setTimeout(() => setScanResult({ type: '', message: '' }), 4000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-10">
            <Navbar title="Student Dashboard" />

            {/* Notification Toast */}
            {scanResult.message && (
                <div className={`fixed bottom-10 right-4 md:right-10 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up ${
                    scanResult.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                    {scanResult.type === 'success' ? <CheckCircle /> : <XCircle />}
                    <span className="font-semibold">{scanResult.message}</span>
                </div>
            )}

            <div className="container mx-auto px-4 mt-8">
                
                {/* Welcome & Scan Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Hero Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Hello, {user?.name?.split(' ')[0]}!</h1>
                            <p className="text-blue-100 mb-6 max-w-md">
                                Ready for your next class? Scan the QR code projected by your teacher to mark your attendance instantly.
                            </p>
                            <button 
                                onClick={() => setShowScanner(true)}
                                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                            >
                                <Scan size={20} />
                                Scan QR Code
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                            <Scan size={250} />
                        </div>
                    </motion.div>

                    {/* Stats using Shared Component */}
                    <div className="grid gap-4">
                        <StatCard 
                            icon={Percent} 
                            label="Attendance %" 
                            value={`${stats.percentage}%`} 
                            color="bg-emerald-500" 
                        />
                         <StatCard 
                            icon={CheckCircle} 
                            label="Classes Attended" 
                            value={stats.present} 
                            color="bg-blue-500" 
                        />
                    </div>
                </div>

                {/* Recent Activity */}
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Clock size={20} /> Recent Activity
                </h2>
                
                {/* Uses the new Component */}
                <AttendanceHistory history={recentHistory} loading={loading} />
            </div>

            {/* Render Scanner Modal */}
            {showScanner && (
                <QRScanner 
                    onScanSuccess={handleScanSuccess}
                    onScanError={(err) => console.log(err)}
                    onClose={() => setShowScanner(false)}
                />
            )}
        </div>
    );
};

export default StudentDashboard;