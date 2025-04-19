# TREKI - Multi-interface API Testing Tool

Treki is a modern, sleek API testing application with a web interface similar to Postman but with a more intuitive UI. It allows users to organize API requests into collections, execute requests, and view responses in a clean, minimalist interface.

## Features

- **User Authentication**: Secure login and registration system
- **Collection Management**: Organize API requests into nested collections
- **Request Builder**: Create and customize API requests with headers, parameters, and body
- **Response Viewer**: View API responses with syntax highlighting
- **Dark Theme**: Modern dark UI with orange accent colors

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js (running locally on port 5000)
- **Storage**: LocalStorage for client-side persistence, Backend DB for server persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend service running on http://localhost:5000

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.comrohit-burman/treki.git
   cd treki
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing the Application

1. Make sure your backend is running on port 5000
   
2. Register a new account:
   - Navigate to http://localhost:3000/register
   - Fill in your details and create an account

3. Log in with your credentials:
   - Navigate to http://localhost:3000/login
   - Enter your email and password

4. Using the API Testing Interface:
   - Create a new collection using the "+ New Collection" button
   - Add a new request to your collection
   - Configure your request:
     - Choose HTTP method (GET, POST, etc.)
     - Enter the URL
     - Add headers if needed
     - Add query parameters if needed
     - Add a request body for POST/PUT requests
   - Click "Send" to execute the request
   - View the response in the right panel

## Available Backend Endpoints

### Authentication Endpoints

- **POST /api/auth/register**
  - Registers a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`

- **POST /api/auth/login**
  - Logs in an existing user
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: JWT token for authentication

### Request Handling Endpoints

- **POST /api/requests/send**
  - Sends an API request through the backend
  - Requires authentication
  - Body: `{ "method": "string", "url": "string", "headers": {}, "body": {} }`

- **GET /api/requests/**
  - Fetches all saved requests for the authenticated user

- **GET /api/requests/:id**
  - Fetches a specific request by ID

- **PUT /api/requests/:id**
  - Updates a request by ID

- **DELETE /api/requests/:id**
  - Deletes a request by ID

- **GET /api/requests/history**
  - Fetches the request history for the authenticated user
