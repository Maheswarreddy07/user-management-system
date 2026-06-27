
User Management System

A full-stack CRUD web application for managing user records. Built with a React frontend and an Express + MySQL backend, it supports creating, reading, updating, and deleting users with real-time search and form validation.


Tech Stack

LayerTechnologyFrontendReact 19, Vite 8, Tailwind CSS 4, AxiosBackendNode.js, Express 5DatabaseMySQL (via mysql2)Dev Toolsnodeman, oxlint, PostCSS, Autoprefixer

'''
Project Structure

user-management-system/
├── schema.sql              # Database schema
├── backend/
│   ├── server.js           # Express app entry point
│   ├── .env                # Environment variables (not for production)
│   ├── config/
│   │   └── db.js           # MySQL connection pool
│   ├── controllers/
│   │   └── userController.js  # Business logic for all CRUD operations
│   └── routes/
│       └── userRoutes.js   # REST route definitions
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx             # Root component, state management, API calls
        └── components/
            ├── UserForm.jsx    # Add / Edit user form with validation
            ├── UserList.jsx    # Tabular display of all users
            └── SearchBar.jsx   # Real-time search input


Features


Create new user records with all required fields
Read and display all users in a sortable table (newest first)
Update existing user details via inline edit form
Delete users with a confirmation prompt
Real-time search by name or email (debounced via useEffect)
Input validation on both client and server sides
Duplicate email detection before insert and update
Success/error alerts with auto-dismiss after 4 seconds



Database Schema

sqlCREATE TABLE users (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    full_name      VARCHAR(100) NOT NULL,
    email          VARCHAR(100) NOT NULL UNIQUE,
    mobile_number  VARCHAR(10)  NOT NULL,
    gender         ENUM('Male', 'Female', 'Other') NOT NULL,
    city           VARCHAR(100) NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


API Endpoints

Base URL: http://localhost:5000

MethodEndpointDescriptionGET/usersFetch all users (supports ?search= query param)GET/users/:idFetch a single user by IDPOST/usersCreate a new userPUT/users/:idUpdate an existing userDELETE/users/:idDelete a user

Request Body (POST / PUT)

json{
  "full_name": "Maheswar Reddy",
  "email": "maheswar@example.com",
  "mobile_number": "9876543210",
  "gender": "Male",
  "city": "Visakhapatnam"
}

Validation Rules


All five fields are required
email must match a valid email format
mobile_number must be exactly 10 digits
email must be unique across all users



Getting Started

Prerequisites


Node.js (v18+)
MySQL (v8+)


1. Database Setup

bashmysql -u root -p < schema.sql

This creates the user_management database and the users table.

2. Backend Setup

bashcd backend
npm install

Create a .env file (or edit the existing one) with your MySQL credentials:

envPORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=user_management


Note: The .env file is committed to this repo with example credentials. Replace DB_PASSWORD with your actual MySQL password before running.



Start the backend:

bash# Development (with auto-restart via nodeman)
npx nodeman server.js

# Or plain Node
node server.js

The server runs at http://localhost:5000.

3. Frontend Setup

bashcd frontend
npm install
npm run dev

The frontend runs at http://localhost:5173 and communicates with the backend at http://localhost:5000.


Environment Variables

VariableDefaultDescriptionPORT5000Port for the Express serverDB_HOSTlocalhostMySQL hostDB_USERrootMySQL usernameDB_PASSWORD(required)MySQL passwordDB_NAMEuser_managementMySQL database name


Known Issues / Notes


The .env file with database credentials is committed to the repository. For any deployment beyond local development, move secrets to a proper secrets manager or CI/CD environment variables and add .env to .gitignore.
The node_modules directory is committed to the repository. It is recommended to add node_modules/ to .gitignore and rely on npm install instead.
CORS is configured to allow only http://localhost:5173. Update server.js if the frontend is served from a different origin.



License

This project is open source and available for educational and personal use.