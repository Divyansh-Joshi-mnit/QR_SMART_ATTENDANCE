# QR-Based Smart Attendance System

A modern web application for automated attendance tracking using QR codes, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### For Students
- Scan QR codes to mark attendance
- View personal attendance history
- Track attendance percentage by course
- Real-time attendance confirmation

### For Teachers
- Generate time-limited QR codes for class sessions
- View real-time attendance for ongoing sessions
- Generate attendance reports (PDF/Excel)
- Manage courses and view analytics

### For Admins
- Manage users (students, teachers, admins)
- Manage courses and departments
- Bulk upload users via CSV
- View institution-wide analytics
- Assign teachers to courses

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- html5-qrcode for QR scanning
- recharts for data visualization

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- qrcode for QR generation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/qr-attendance-system.git
cd qr-attendance-system
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

## 📱 Usage

1. **Admin** creates users and courses
2. **Teacher** starts a class session and generates QR code
3. **Students** scan the QR code to mark attendance
4. System validates and records attendance
5. **Teacher/Admin** can generate reports

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Time-limited QR codes (10 minutes)
- Duplicate attendance prevention
- CORS protection

## 📊 Database Schema

- Users (Student, Teacher, Admin)
- Courses
- Sessions
- Attendance
- Departments
- Enrollments

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

## 📄 API Documentation

See [API_Documentation.md](docs/API_Documentation.md) for detailed API endpoints.

## 👥 Contributors

- [Your Name] - Developer

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Software Engineering Principles Course
- [Your Institution Name]