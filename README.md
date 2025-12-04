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

## Some preview of the website : 
 # Sign Up page
<img width="1909" height="960" alt="image" src="https://github.com/user-attachments/assets/f3f33021-e3bf-4b21-8bf6-1d186280b84a" />

 # Admin Portal(Dashboard)
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/c985f5e5-f0a6-44ad-aa15-355ba943ff0e" />

# Course Details Page (Visible to Admin)
<img width="1919" height="643" alt="image" src="https://github.com/user-attachments/assets/b9936a43-9774-442d-9ff6-271d070c7e5b" />

# Teacher Portal (Dashboard)
<img width="1919" height="859" alt="image" src="https://github.com/user-attachments/assets/b6e4f6a7-415a-4558-a8e7-187798cf7ea9" />

# Starting a new Session
<img width="1908" height="853" alt="image" src="https://github.com/user-attachments/assets/a3ef1cb0-f49f-42f5-9e4c-63b5494f74d9" />

# Live Session Preview
<img width="1906" height="971" alt="image" src="https://github.com/user-attachments/assets/e29e31b2-c928-45bf-9a58-661c5d45edb5" />

# Sessions Analytics
<img width="1918" height="914" alt="image" src="https://github.com/user-attachments/assets/dc165a25-b31e-435b-bd77-8f4de1135d83" />

# Student Dashboard and Responsive Design 
<img width="1017" height="906" alt="image" src="https://github.com/user-attachments/assets/1fed5ea7-758b-4559-833a-e2898c6ab54d" />

# Student Attendance Record (Visible to Student) 
<img width="1919" height="916" alt="image" src="https://github.com/user-attachments/assets/34a6d292-5641-4145-9584-0aa4661e18dd" />

# QR Scanner Interface of Student
<img width="1870" height="878" alt="image" src="https://github.com/user-attachments/assets/247e8b1a-7d39-4940-a77d-ac23d2278193" />








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
- Demo Link https://www.youtube.com/watch?v=5ECPnH13tYw

## Contributors

- Pritam Barman(2023UCP1608) 
- Harshvardhan(2023UCP1618)
- Divyansh Joshi(2023UCP1622)

## License

This project is licensed under the MIT License.
