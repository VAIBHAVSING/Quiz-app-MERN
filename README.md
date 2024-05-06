# Quiz App

## Description
The Quiz App is a web application designed to conduct online quizzes or tests. It allows users to create quizzes, take tests, and view results. This application is built using React for the frontend and Node.js with Express for the backend.

## Features
- User authentication: Users can sign up, log in, and log out securely.
- Create quizzes: Admin users can create quizzes by adding questions and multiple-choice options.
- Take tests: Users can take quizzes created by admins and submit their answers.
- View results: Users can view their test results, including marks obtained and correct/incorrect answers.
- Responsive design: The application is responsive and works seamlessly on desktop and mobile devices.

## Technologies Used
- Frontend: React, React Router
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- HTTP client: Axios
- State Management: Recoil

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/vaibhavsing24/Quiz-app-MERN
   ```
2. Navigate to the project directory:
   ```
   cd quiz-app
   ```
3. Install dependencies for the frontend and backend:
   ```
   cd client && npm install
   cd ../server && npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Define the following environment variables in the `.env` file:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```
5. Run the development server:
   - For the frontend:
     ```
     cd client && npm run dev
     ```
   - For the backend:
     ```
     cd server && node index.js
     ```

## Usage
1. Sign up or log in to access the dashboard.
2. Create quizzes or take tests available in the dashboard.
3. Submit your answers and view your results.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any feature enhancements, bug fixes, or suggestions.

## License
This project is licensed under the [MIT License](LICENSE).
