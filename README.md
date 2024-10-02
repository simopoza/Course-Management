# Course Management API

## Description
This is a Course Management API built with NestJS and MongoDB. The API provides endpoints for managing courses, including features for user authentication, course registration, and email confirmation.

## Features
- User authentication with JWT.
- Registration and email confirmation for new users.
- Course management, including CRUD operations.
- Pagination for searching and fetching data from the database.
- Integrated with React Query for efficient data fetching and caching.
- Utilizes Axios for making HTTP requests.

## Technologies Used
- **Backend**: NestJS, Mongoose, MongoDB
- **Frontend**: React, React Query, Axios
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Node.js (version 14 or above)
- MongoDB (either locally or using a cloud service like MongoDB Atlas)
- npm or yarn (package managers)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:simopoza/Course-Management.git
   cd Course-Management.git

Install dependencies Navigate to both the backend and frontend directories to install their dependencies.

- Backend


      cd backend
      
      
      npm install

<<<<<<< HEAD
MONGODB_URI=your_mongodb_connection_string

EMAIL_HOST=smtp.gmail.com

EMAIL_PORT=587

EMAIL_USER=mohammedannahri20@gmail.com

EMAIL_PASS=rgps qfuo tvvf oqnb
=======
- Frontend
>>>>>>> a5179f8be7b6962bb3f2b1edd7f4d37821cd1f5c

      
      cd frontend
      
      
      npm install

<<<<<<< HEAD

Run the Application To run the backend server, execute:
=======
- Setup Environment Variables Create a .env file in the backend directory and populate it with the required environment variables. You may need to define:
>>>>>>> a5179f8be7b6962bb3f2b1edd7f4d37821cd1f5c

      MONGODB_URI=your_mongodb_connection_string
      
      EMAIL_HOST=smtp.gmail.com
      
      EMAIL_PORT=587
      
      EMAIL_USER=mohammedannahri20@gmail.com
      
      EMAIL_PASS=rgps qfuo tvvf oqnb
      
      JWT_SECRET=jwt-secret-poza

- Run the Application To run the backend server, execute:

   npm run start:dev

- To run the frontend application, navigate to the frontend directory and execute:

   npm start

License

This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
    NestJS - The framework used for building the backend.
    React Query - For data fetching and state management.
    Axios - For making HTTP requests.
