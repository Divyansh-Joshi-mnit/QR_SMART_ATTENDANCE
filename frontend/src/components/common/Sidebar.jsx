import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  QrCode,
  ScanLine,
  BookOpen,
  FileText,
  Users,
  GraduationCap,
  Building2,
  BarChart3,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          {
            path: '/student/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
          },
          {
            path: '/student/scan-qr',
            icon: ScanLine,
            label: 'Scan QR Code',
          },
          {
            path: '/student/attendance',
            icon: FileText,
            label: 'My Attendance',
          },
          {
            path: '/student/courses',
            icon: BookOpen,
            label: 'My Courses',
          },
        ];

      case 'teacher':
        return [
          {
            path: '/teacher/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
          },
          {
            path: '/teacher/generate-qr',
            icon: QrCode,
            label: 'Generate QR',
          },
          {
            path: '/teacher/attendance',
            icon: FileText,
            label: 'View Attendance',
          },
          {
            path: '/teacher/courses',
            icon: BookOpen,
            label: 'My Courses',
          },
          {
            path: '/teacher/reports',
            icon: BarChart3,
            label: 'Reports',
          },
        ];

      case 'admin':
        return [
          {
            path: '/admin/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
          },
          {
            path: '/admin/users',
            icon: Users,
            label: 'Manage Users',
          },
          {
            path: '/admin/courses',
            icon: GraduationCap,
            label: 'Manage Courses',
          },
          {
            path: '/admin/departments',
            icon: Building2,
            label: 'Departments',
          },
          {
            path: '/admin/analytics',
            icon: BarChart3,
            label: 'Analytics',
          },
          {
            path: '/admin/settings',
            icon: Settings,
            label: 'Settings',
          },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;