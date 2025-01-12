# Payment Management and Verification System

## Overview
This project is a secure **Payment Management and Verification System** featuring:
- User authentication with Supabase.
- Role-based access control (Admin and User).
- Payment tracking and management.
- Document upload and verification.
- Admin dashboard with analytics and filters.

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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
