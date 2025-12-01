import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Footer from '../../components/common/Footer';
import Loading from '../../components/common/Loading';
import { getMyAttendance, getMyCourses } from '../../services/studentService';
import { formatDateTime, formatDate } from '../../utils/helpers';
import { Calendar, Filter, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const MyAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    courseId: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [attendanceRes, coursesRes] = await Promise.all([
        getMyAttendance(),
        getMyCourses(),
      ]);

      setAttendance(attendanceRes.data.attendance || []);
      setCourses(coursesRes.data || []);
    } catch (error) {
      toast.error('Failed to load attendance data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const response = await getMyAttendance(filters);
      setAttendance(response.data.attendance || []);
      toast.success('Filters applied');
    } catch (error) {
      toast.error('Failed to apply filters');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      courseId: '',
      startDate: '',
      endDate: '',
    });
    fetchData();
  };

  const exportToCSV = () => {
    if (attendance.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['Date', 'Course Code', 'Course Name', 'Status', 'Time'];
    const rows = attendance.map((record) => [
      formatDate(record.session?.sessionDate),
      record.course?.courseCode,
      record.course?.courseName,
      record.status,
      formatDateTime(record.markedAt),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('Attendance exported successfully');
  };

  if (loading) {
    return <Loading fullScreen text="Loading attendance..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
            <p className="text-gray-600 mt-1">
              View your attendance history and statistics
            </p>
          </div>

          {/* Filters */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter size={20} className="mr-2" />
                Filters
              </h2>
              <button onClick={exportToCSV} className="btn-secondary flex items-center space-x-2">
                <Download size={18} />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>
                <select
                  name="courseId"
                  value={filters.courseId}
                  onChange={handleFilterChange}
                  className="input-field"
                >
                  <option value="">All Courses</option>
                  {courses.map((enrollment) => (
                    <option key={enrollment._id} value={enrollment.course?._id}>
                      {enrollment.course?.courseCode} -{' '}
                      {enrollment.course?.courseName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="input-field"
                />
              </div>

              <div className="flex items-end space-x-2">
                <button onClick={applyFilters} className="btn-primary flex-1">
                  Apply
                </button>
                <button onClick={clearFilters} className="btn-secondary flex-1">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Attendance Records ({attendance.length})
            </h2>

            {attendance.length > 0 ? (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th>Marked At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((record) => (
                      <tr key={record._id}>
                        <td>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span>{formatDate(record.session?.sessionDate)}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p className="font-semibold">
                              {record.course?.courseCode}
                            </p>
                            <p className="text-sm text-gray-600">
                              {record.course?.courseName}
                            </p>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              record.status === 'present'
                                ? 'badge-success'
                                : record.status === 'late'
                                ? 'badge-warning'
                                : 'badge-danger'
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="text-gray-600">
                          {formatDateTime(record.markedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No attendance records found</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyAttendance;