# Payment Management and Verification System

## Overview
This project is a secure **Payment Management and Verification System** featuring:
- User authentication with Supabase.
- Role-based access control (Admin and User).
- Payment tracking and management.
- Document upload and verification.
- Admin dashboard with analytics and filters.

---
## Sample Test Credentials:
#### Admin Login:
 - Email: khadizasamiha7@gmail.com
 - Password: samiha17
#### User Login:
 - Email: samihadev7@gmail.com
 - Password: samiha17

---

## Features

### **User Authentication**
- **Signup, Login, Logout**: Handled via Supabase Auth using email/password.
- **Role-Based Access Control**: Admin and User roles.

### **Payment Management**
- **User Features**:
  - Create a payment request with Title, Amount, and Status.
  - View and track payment statuses: `Pending`, `Approved`, `Rejected`.
- **Admin Features**:
  - View all payments submitted by users.
  - Approve or reject payment requests and update their statuses.

### **Document Upload and Verification**
- Users can upload identity verification documents (PDF/JPG/PNG, max size: 5 MB).
- Admin reviews documents and updates their verification statuses: `Pending`, `Approved`, `Rejected`.

### **Admin Dashboard**
- Summary of total payments with status breakdowns.
- Filters by date and status for easy management.

---

## Technical Stack
- **Frontend**: React.js, Tailwind CSS.
- **Backend**: Next.js API Routes.
- **Database**: MongoDB.
- **Storage**: ImgBB for documents.
- **Deployment**: Hosted on Vercel.

---

## API Endpoints

### Authentication
- **POST** `/api/auth/signup`: User signup.
- **POST** `/api/auth/login`: User login.

### Payments
- **POST** `/api/payments`: Create a new payment request.
- **GET** `/api/payments`: Retrieve payments for logged-in users or all (Admin).
- **PUT** `/api/payments/:id`: Update payment status.

### Documents
- **POST** `/api/documents`: Upload verification documents.
- **GET** `/api/documents`: Retrieve uploaded documents for review.

---

## Environment Variables
Add the following environment variables to your `.env` file:

```env
VITE_SUPABASE_URL = https://fbreoonkhaqatovmaorj.supabase.co
VITE_SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicmVvb25raGFxYXRvdm1hb3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0ODg5MDEsImV4cCI6MjA1MjA2NDkwMX0.XiaLdYmmNNTJnk-vTxNqG6IzwQMLAMmB65Mq3kRVBGs
VITE_STRIPE_PUBLIC_KEY = pk_test_51NHu7HJ1paocsSu8e9uKzhOoYIwHtSotmrhrX1WDFtSMbCQnTEaladuwP3k3OVUrCwAkJ9rjETv79YDZEe0NApFm00nwj4EKxA
VITE_IMGBB_API_KEY = 72be915eb228835d7dac0ba94c7f2304
