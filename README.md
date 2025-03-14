# Mobile Banking

## Overview
Mobile Banking is a full-stack app that provides essential banking functionalities. It consists of a backend built with Express and TypeScript, and a frontend developed using React with React Router.

## Technologies Used
### Backend:
- **Node.js** with **Express.js** for server-side logic
- **TypeScript** for type safety
- **ESLint & Prettier** for code quality and formatting
- **Webpack** for module bundling
- **SASS** for styling
- **Morgan** for HTTP request logging
- **dotenv** for environment variable management
- **Nodemon & ts-node** for development workflow

### Frontend:
- **React** for UI development
- **React Router** for client-side routing
- **TypeScript** for static type checking
- **ESLint & Prettier** for linting and formatting
- **Jest & Testing Library** for unit testing
- **Web Vitals** for performance measurement

## Project Structure
```
/mobile-banking
│── backend/              # Backend service
│   ├── src/              # TypeScript source files
│   ├── dist/             # Compiled JavaScript files
│   ├── package.json      # Dependencies and scripts
│   ├── tsconfig.json     # TypeScript configuration
│
│── frontend/             # Frontend application
│   ├── src/              # React application source files
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies and scripts
│   ├── tsconfig.json     # TypeScript configuration
```

## Installation
### Prerequisites:
- Node.js (>=16.x)
- npm or yarn

### Clone the repository:
```sh
git clone https://github.com/your-username/mobile-banking.git
cd mobile-banking
```

### Backend Setup:
```sh
cd backend
npm install
npm run dev  # Starts the development server
```

### Frontend Setup:
```sh
cd frontend
npm install
npm start  # Runs the frontend application
```

## Available Scripts
### Backend:
- `npm run build` - Compiles TypeScript to JavaScript
- `npm run dev` - Runs the server in development mode with Nodemon
- `npm run start` - Runs the compiled server

### Frontend:
- `npm start` - Runs the development server
- `npm run build` - Builds the app for production
- `npm run test` - Runs tests
- `npm run eject` - Ejects the app configuration (use with caution)

## Deployment
1. Build the backend:
   ```sh
   cd backend
   npm run build
   ```
2. Build the frontend:
   ```sh
   cd frontend
   npm run build
   ```
3. Deploy both parts using your preferred cloud service or a containerization tool like Docker.

## Contribution
Feel free to fork the repository, submit issues, and contribute via pull requests!

## License
This project is licensed under the MIT License.

