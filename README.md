# Treki
*API Request Manager*

Treki is an all-in-one tool designed to help developers manage and send API requests efficiently. The project is split into three main parts:
- *Frontend:* A clean and modern UI that provides a user-friendly experience for sending requests and managing collections of requests.
- *Backend:* A RESTful API service that handles user authentication, request management, and data storage.
- *CLI:* A command-line tool for developers to interact with the API and perform request operations directly from the terminal.

This repository serves as the Frontend of the Treki project. You can find the other *repositories* of the project in the respective sections below.

## Frontend Features
- *Clean and Modern UI:* A user-friendly interface designed to make API request management simple and intuitive.
- *User Authentication:* Login and register functionality to keep your requests secure.
- *Send Requests:* Easily send API requests with customizable bodies and headers.
- *Request Collections:* Group related requests together for better organization.
- *Prettified JSON Responses:* View responses in a beautifully formatted, colored JSON layout for easy reading and debugging.

### ⚒️ Frontend Tech Stack
- Framework: Next.js
- Routing: React Router DOM
- UI/UX: Tailwind CSS
- State Management: Local Storage + internal component state
- HTTP Client: Axios
- Deployment: Vercel
- Theme: Minimal, intuitive interface for testing APIs

## CLI Overview
The Treki CLI (Command Line Interface) allows developers to interact with the backend API directly from their terminal. It's designed to make it easy to send API requests, retrieve responses, and manage your request history without needing to use the web interface.

### CLI Features
- *Run Without Login:* You can use Treki CLI without logging in. Send basic API requests without any setup.
- *Optional Login Support:* If you log in, you can access stored requests and run them by ID.
- *Rust-Powered Performance:* Built with Rust, ensuring blazing-fast execution.
- *Custom Requests:* Send GET, POST, PUT, PATCH, DELETE requests with custom bodies and headers. Example:
bash
treki get https://jsonplaceholder.typicode.com/posts

- *Stored Request Execution:* Logged-in users can execute previously saved requests using:
bash
treki run <request_id>

- *Prettified JSON Response:* View colored and well-formatted JSON responses.

For more details on the usage of CLI, refer to [this repository](https://github.com/aether-flux/treki-cli).

### 🔧 CLI Tech Stack
- Language: Rust
- HTTP Client: reqwest
- JSON Formatting: colored_json
- CLI Parsing: clap
- File Handling: dirs, serde, fs
- Performance: Native speed, minimal memory usage

## Backend Overview
The backend of Treki is built with Node.js and Express. It provides authentication and request handling functionalities. The service uses Prisma as an ORM to interact with a PostgreSQL (NeonDB) database.

### Backend Features
- User authentication (register and login)
- Request handling with CRUD operations
- Request history tracking
- Acts as the brain of the frontend as well as the CLI

For more details on the backend, refer to [this repository](https://github.com/swarupgoswami/Treki-backend/).

### 📦 Backend Tech Stack
- Runtime: Node.js
- Framework: Express.js
- Database ORM: Prisma
- Database: PostgreSQL (NeonDB recommended for cloud)
- Authentication: JWT
- Environment Config: dotenv
- Deployment: Fly.io / Railway / Render (any free-tier provider)

## Installation

### Frontend (this repository)
This website is deployed on [https://treki-web.vercel.app/](https://treki-web.vercel.app/).

To deploy this frontend locally, run the following commands:
bash
git clone https://github.com/rohit-burman/treki-web.git
cd treki-frontend
npm install
npm start

This will start the frontend server on http://localhost:3000/

### Backend
To set up the backend locally, run these commands:
sh
git clone https://github.com/swarupgoswami/Treki-backend/
cd Treki-backend


Install dependencies:
sh
npm install
cd backend
npm install


Set up Prisma:
(Run this in the root directory, not inside backend/)
sh
cd ..
npx prisma generate


Have a .env file in the root directory:
env
DATABASE_URL="postgres_db_url"


And a .env in the backend/ directory:
env
PORT=5000
JWT_SECRET="your_secret_key"


And now, you are ready to run the server:
sh
node backend/app.js


This will now start the server on http://localhost:5000/.

### CLI
To install the CLI:

For Linux users (Recommended):
bash
curl -sSL https://raw.githubusercontent.com/aether-flux/treki-cli/main/scripts/linux/install.sh | bash


For Windows users (Experimental):
powershell
iwr -useb https://raw.githubusercontent.com/aether-flux/treki-cli/main/scripts/windows/install.bat | iex


For MacOS users:
Not officially supported. Users can build from source.

#### Manual Build
If automated scripts fail, you can build manually:
bash
git clone https://github.com/aether-flux/treki-cli.git
cd treki-cli

Then, 'cargo run -- <args>' would let you run the CLI.

Build the executable using:
bash
cargo build --release


You'll find the final binary at:
- Linux: target/release/treki-cli
- Windows: target/x86_64-pc-windows-gnu/release/treki-cli.exe
