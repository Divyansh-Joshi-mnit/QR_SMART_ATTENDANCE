import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import Footer from '../../components/common/Footer';
import Loading from '../../components/common/Loading';
import { getMyCourses, getAttendanceStats } from '../../services/studentService';
import { BookOpen, User, TrendingUp, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseStats, setCourseStats] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getMyCourses();
      setCourses(response.data || []);
    } catch (error) {
      toast.error('Failed to load courses');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const viewCourseDetails = async (courseId) => {
    try {
      const response = await getAttendanceStats(courseId);
      setCourseStats(response.data);
      setSelectedCourse(courseId);
    } catch (error) {
      toast.error('Failed to load course statistics');
      console.error(error);
    }
  };

  if (loading) {
    return <Loading fullScreen text="Loading courses..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-1">
              View your enrolled courses and attendance statistics
            </p>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((enrollment) => (
                <div
                  key={enrollment._id}
                  className="card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => viewCourseDetails(enrollment.course?._id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {enrollment.course?.courseCode}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {enrollment.course?.semester} Semester
                        </p>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3">
                    {enrollment.course?.courseName}
                  </h4>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User size={16} className="mr-2" />
                      <span>{enrollment.course?.teacher?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>
                        {enrollment.classesAttended}/{enrollment.totalClassesHeld}{' '}
                        classes
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Attendance
                      </span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp
                          size={16}
                          className={
                            enrollment.attendancePercentage >= 75
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        />
                        <span
                          className={`text-xl font-bold ${
                            enrollment.attendancePercentage >= 75
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {enrollment.attendancePercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
enrollment.attendancePercentage >= 75
? 'bg-green-600'
: 'bg-red-600'
} style= width: ${enrollment.attendancePercentage}%`
}></div>
</div>
</div>
<span
                className={`badge mt-4 ${
                  enrollment.attendancePercentage >= 75
                    ? 'badge-success'
                    : 'badge-danger'
                }`}
              >
                {enrollment.attendancePercentage >= 75
                  ? 'Good Standing'
                  : 'Low Attendance'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Courses Enrolled
          </h3>
          <p className="text-gray-600">
            You are not enrolled in any courses yet.
          </p>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && courseStats && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div
            className="modal-content max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {courseStats.courseDetails?.courseName}
              </h2>
              <p className="text-gray-600 mt-1">
                {courseStats.courseDetails?.courseCode}
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {courseStats.totalClasses}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Attended</p>
                  <p className="text-2xl font-bold text-green-600">
                    {courseStats.classesAttended}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Absent</p>
                  <p className="text-2xl font-bold text-red-600">
                    {courseStats.classesAbsent}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Percentage</p>
                  <p
                    className={`text-2xl font-bold ${
                      courseStats.attendancePercentage >= 75
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {courseStats.attendancePercentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Recent Attendance
                </h3>
                {courseStats.recentAttendance &&
                courseStats.recentAttendance.length > 0 ? (
                  <div className="space-y-2">
                    {courseStats.recentAttendance.map((record) => (
                      <div
                        key={record._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">
                          {new Date(
                            record.session?.sessionDate
                          ).toLocaleDateString()}
                        </span>
                        <span className="badge badge-success">Present</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No recent attendance
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedCourse(null)}
                className="btn-secondary w-full mt-6"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  </div>
  <Footer />
</div>
);
};
export default MyCourses;