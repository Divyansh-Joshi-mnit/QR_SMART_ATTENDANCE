# QR-Based Smart Attendance System

A modern web application for automated attendance tracking using QR codes, built with React, Node.js, Express, and MongoDB.

## Features

### For Students
- Scan QR codes to mark attendance
- View personal attendance history
- Track attendance percentage by course
- Real-time attendance confirmation

### For Teachers
- Generate time-limited QR codes for class sessions
- View real-time attendance for ongoing sessions
- Generate attendance reports (Excel/CSV)

### For Admins
- Manage users (students, teachers, admins)
- Manage courses and departments
- View institution-wide analytics
- Assign teachers/students to courses

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- html5-qrcode for QR scanning

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- qrcodejs for QR generation

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier)
- npm

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Divyansh-Joshi-mnit/QR_SMART_ATTENDANCE.git
cd QR_SMART_ATTENDANCE
```

### 2. Backend Setup
```bash
cd backend
npm install
mkdir .env
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
MONGO_URI=
JWT_SECRET=
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
QR_CODE_EXPIRY_MINUTES=
QR_SECRET_KEY=
```

## Usage

1. **Admin** creates users and courses
2. **Teacher** starts a class session and generates QR code
3. **Students** scan the QR code to mark attendance
4. System validates and records attendance
5. **Teacher** can generate reports

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Time-limited QR codes
- Duplicate attendance prevention
- CORS protection

## Database Schema

- Users (Student, Teacher, Admin)
- Courses
- Sessions
- Attendance
- Departments
- Enrollments

## Deployment

### Backend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

## Useful Links
- The project is deployed live at https://qrsmartattendance.vercel.app/
- Demo Link 

## Contributors

- Pritam Barman(2023UCP1608) 
- Harshvardhan(2023UCP1618)
- Divyansh Joshi(2023UCP1622)

## License

This project is licensed under the MIT License.
