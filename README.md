# Skillbridge - E-Learning Platform

Skillbridge is an e-learning platform designed to help users unlock their creative potential by providing access to online design and development courses. This project was developed as the final project for the React.js course at ITI (Information Technology Institute). It was a collaborative effort between me and my contributor, **Malak Haitham**.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

Skillbridge is a fully functional e-learning website that allows users to:
- Browse and enroll in courses.
- Search and filter courses by level (e.g., Beginner, Intermediate, Advanced).
- View course details, including modules and lessons.
- Sign up and log in as a user or admin.
- Admins can add new courses and manage content.
- Users can track their progress and save courses to a "Watch Later" list.

The project was built using **React.js** for the frontend and **Firebase** for backend services like authentication and database management. We used **Material-UI (MUI)** for styling and **Redux** for state management.

---

## Features

- **User Authentication**: Sign up, log in, and manage user profiles using Firebase Authentication.
- **Course Management**: Admins can add, update, and delete courses.
- **Course Enrollment**: Users can enroll in courses and track their progress.
- **Search and Filter**: Users can search for courses and filter them by level (Beginner, Intermediate, Advanced).
- **Watch Later List**: Users can save courses to a "Watch Later" list for future reference.
- **Responsive Design**: The website is fully responsive and works seamlessly on all devices.
- **Localization**: Supports both English and Arabic languages.
- **Dark/Light Mode**: Users can switch between dark and light themes.

---

## Technologies Used

### Frontend
- **React.js**: JavaScript library for building the user interface.
- **Material-UI (MUI)**: Component library for styling and theming.
- **Redux**: State management library.
- **React Router**: For handling client-side routing.

### Backend
- **Firebase**: Used for authentication, Firestore database, and hosting.
  - **Firestore**: NoSQL database for storing course and user data.
  - **Firebase Auth**: For user authentication.
- **Firebase Hosting**: For deploying the application.

### Tools
- **VS Code**: Primary code editor.
- **Figma**: For designing wireframes and UI/UX.
- **Trello**: For project management and task tracking.
- **Slack & Google Meet**: For communication and collaboration.

---

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/skillbridge.git
   cd skillbridge
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration in `src/utilities/firebase.js`.
   - Enable Firestore and Authentication in the Firebase Console.

4. **Run the Project**
   ```bash
   npm start
   ```
   The application will be running at `http://localhost:3000`.

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## Project Structure

```
skillbridge/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, icons, and other static files
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── utilities/           # Utility functions, Firebase config, and Redux store
│   ├── App.js               # Main application component
│   ├── index.js             # Entry point
│   └── firebase.js          # Firebase configuration
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

---

## Contributors

- **[Yousef Khalaf](https://github.com/yousefkhalaf0)**
- **[Malak Haitham](https://github.com/MalakHaitham206)** - Contributor

---

## Acknowledgements

This project was developed as part of the React.js course at **ITI (Information Technology Institute)**. Special thanks to our instructors and mentors for their guidance and support throughout the course.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
