Project Overview

    Project Name: Feedback System

    Purpose: Collect, manage, and analyze user feedback for our products/services.

    Stack:

        Frontend: Next.js + Tailwind CSS

        Backend: NestJS with MongoDB database

🗂️ Repository Structure

/feedback-system-frontend
 https://github.com/Sleeky-Programmers/feedback-system-frontend.git

/feedback-system-backend
 https://github.com/Sleeky-Programmers/feedback-system-backend.git

⚙️ Frontend
1. Tech Stack

    Framework: Next.js (React)
    Typescript

    Styling: Tailwind CSS / Styled Components

    API Communication: Axios

2. Main Features
 
    Landing / Admin Login page

    Feedback form (modal/page)

    Admin dashboard for viewing stats: invitations, feedback

    User authentication


3. Folder Structure

/feedback-system-frontend/
└──public/ #Static assets
/src 
 ├── app/      # Next.js pages/routes
 ├── components/           # Reusable ui components
 ├── hooks/           # Custom hooks
 ├── lib/             # Type definitions, api functions, constants and helpers
 ├── utils/           # Helpers & constants
 ├── styles/          # Global styles
 └── public/          # Static assets

4. Environment Variables
Key	Description
NEXT_PUBLIC_API_BASE_URL	# Base URL for backend API

5. How to Run (Frontend)
clone the repository
cd feedback-system-frontend
npm install
npm run dev



⚙️ Backend
1. Tech Stack

    Runtime: Node.js

    Framework: NestJS

    Database: MongoDB

    ORM: Mongoose

    Authentication: JWT 

2. Main Features

    RESTful API for feedback CRUD

    Admin routes for viewing/exporting feedback

    Nodemailer gmail for feedback invitations

    Authentication & authorization

3. Folder Structure

/backend/
 ├── src/
 │   ├── common/  # decorators, helpers and utils
 │   ├── config/   # db config   
 │   ├── middlewares/      
 │   ├── modules/   
 │   ├── schemas/ # database schemas      
 │   └── seeds/   # admin.seed.ts
 |   ├── app.controller      
 │   └── app.module
 |   ├── app.service      
 │   └── main.ts  # server file
 ├── .env  # environment variables
 ├── package.json
 └── ...

4. Environment Variables
Key	Description
DATABASE_URL	Connection string
JWT_SECRET	Secret for tokens
PORT	Server port

EMAIL_USER=email@example.com
EMAIL_PASS=email_password 
FRONTEND_URL=frontend_url

5. How to Run (Backend)

cd feedback-system-backend
npm install
npm run start

🧪 Testing

    Unit & integration tests: Jest / Supertest

    Linting: ESLint / Prettier

🚀 Deployment

    Frontend: https://feedback-system-frontend-nu.vercel.app/

    Backend: https://feedback-system-backend-neon.vercel.app/api/v1

    Database: Mongodb

📝 Future Improvements

    Analytics dashboard for feedback insights

    Role-based access for admins

    Notifications or Slack integration
