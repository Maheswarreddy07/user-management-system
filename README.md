# User Management System

A full-stack CRUD application for managing user records. Built with a React frontend and an Express + MySQL backend — supports creating, reading, updating, and deleting users with real-time search and input validation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS 4, Axios |
| Backend | Node.js, Express 5 |
| Database | MySQL (via `mysql2`) |
| Dev Tools | `nodeman`, `oxlint`, PostCSS, Autoprefixer |

---

## Project Structure

```
user-management-system/
├── schema.sql                    # Database initialization script
├── backend/
│   ├── server.js                 # Express app entry point
│   ├── .env                      # Environment variables
│   ├── config/
│   │   └── db.js                 # MySQL connection pool
│   ├── controllers/
│   │   └── userController.js     # CRUD business logic
│   └── routes/
│       └── userRoutes.js         # REST API route definitions
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx               # Root component — state & API calls
        ├── main.jsx              # React DOM mount
        └── components/
            ├── UserForm.jsx      # Add / Edit form with validation
            ├── UserList.jsx      # User records table
            └── SearchBar.jsx     # Real-time search input
```

---

## Features

- **Create** new users with all required fields validated
- **Read** all users in a table sorted newest-first
- **Update** user details via an inline edit form
- **Delete** users with a confirmation prompt
- **Real-time search** by name or email
- **Dual-layer validation** — on both the client and server
- **Duplicate email detection** before insert and update
- **Auto-dismiss alerts** for success and error feedback (4 seconds)

---

## Database Schema

```sql
CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

CREATE TABLE IF NOT EXISTS users (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    full_name      VARCHAR(100)                    NOT NULL,
    email          VARCHAR(100)                    NOT NULL UNIQUE,
    mobile_number  VARCHAR(10)                     NOT NULL,
    gender         ENUM('Male', 'Female', 'Other') NOT NULL,
    city           VARCHAR(100)                    NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## API Reference

**Base URL:** `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users` | Fetch all users. Supports `?search=` query param |
| `GET` | `/users/:id` | Fetch a single user by ID |
| `POST` | `/users` | Create a new user |
| `PUT` | `/users/:id` | Update an existing user |
| `DELETE` | `/users/:id` | Delete a user |

### Request Body (POST / PUT)

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "mobile_number": "9876543210",
  "gender": "Male",
  "city": "Hyderabad"
}
```

### Validation Rules

- All five fields are required
- `email` must be a valid email format
- `mobile_number` must be exactly 10 digits
- `email` must be unique across all records

---

## Getting Started

### Prerequisites

- Node.js v18+
- MySQL v8+

### 1. Database Setup

```bash
mysql -u root -p < schema.sql
```

Creates the `user_management` database and the `users` table.

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=user_management
```

Start the server:

```bash
# With auto-restart on file changes
npx nodeman server.js

# Standard
node server.js
```

Server runs at `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Express server port |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_USER` | `root` | MySQL username |
| `DB_PASSWORD` | _(required)_ | MySQL password |
| `DB_NAME` | `user_management` | MySQL database name |

---

## Notes

- **Credentials in repo:** The `.env` file is currently committed with real database credentials. Add `.env` to `.gitignore` and use environment variables or a secrets manager for any deployment.
- **`node_modules` committed:** Add `node_modules/` to `.gitignore` and let `npm install` handle dependencies instead.
- **CORS:** The server only accepts requests from `http://localhost:5173`. Update the origin in `server.js` if deploying the frontend elsewhere.

---

## License

Open source — available for educational and personal use.