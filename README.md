# Todo Monorepo - MEAN Stack Todo App with Nx

![Todo Monorepo Logo](./todo-monorepo-logo.png)

## Overview

Todo Monorepo is a full-stack todo application built using the MEAN stack (MongoDB, Express.js, Angular, and Node.js) and organized as a monorepo using Nx. This project provides a scalable and maintainable architecture for developing modern web applications.

## Features

- **Monorepo Structure:** Manage frontend (Angular) and backend (Express.js) code in a single repository for better code organization and sharing of common code.

- **Nx Workspace:** Utilizes Nx for improved project structuring, code sharing, and enhanced development experience.

- **MEAN Stack:** Incorporates MongoDB as the database, Express.js for the server, Angular for the frontend, and Node.js as the runtime environment.

- **CRUD Operations:** Enables users to perform CRUD (Create, Read, Update, Delete) operations on their todo items.

- **Responsive Design:** Built with responsiveness in mind, ensuring a seamless user experience on various devices.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- Angular CLI: Install globally using `npm install -g @angular/cli`
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

### 1. Clone the Repository

For SSH users,
```bash
git clone git@github.com:carlylechia/todo-monorepo.git
cd todo-monorepo
```

and for HTTPS,
```bash
git clone https://github.com/carlylechia/todo-monorepo.git
cd todo-monorepo
```

### 2. Install Dependencies

Run the following commands to install the project dependencies:

```bash
# Install global Nx CLI
npm install -g nx

# Install project dependencies
npm install
```

### VS Code Integration

For a seamless development experience, it is recommended to use the default Nx extension for Visual Studio Code. This extension provides enhanced features for working with Nx workspaces and makes it easier to execute commands.

### Installation

1. Open Visual Studio Code.
2. Navigate to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or using the keyboard shortcut `Ctrl+Shift+X`.
3. Search for "Nx" in the Extensions view search box.
4. Install the "Nx Console" extension provided by Nrwl.

### Usage

Once the Nx Console extension is installed, you can use it to run Nx commands directly from Visual Studio Code. Follow these steps:

1. Open the Command Palette by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac).
2. Type `Nx Console` and select the "Nx Console: Open Workspace Console" option.
3. In the Nx Console, you can execute various Nx commands by typing them directly or selecting from the available options.

Using the Nx Console extension can streamline your development workflow, providing a more interactive and visual way to execute Nx commands without leaving the VS Code environment.

```bash
# Example Nx command execution in the Nx Console
nx serve frontend
```

This extension simplifies the process of running Nx commands, improving productivity and making it easier to manage your monorepo.

### 3. Set Up MongoDB

Make sure MongoDB is running locally on its default port (27017). You can configure the MongoDB connection in the `apps/api/src/environments/environment.ts` file.

Create a database called todo_app, before running the server.

### 4. Build and Run the Application

#### Frontend (Angular)

```bash
# Serve the Angular application
nx run todo-frontend:serve
```

Visit `http://localhost:4200` in your web browser to view the Angular app.

#### Backend (Express.js)

```bash
# Serve the Express.js application
nx run todo-backend:serve
```

The backend will be available at `http://localhost:3333/api`.

## Usage

1. Open your web browser and go to `http://localhost:4200` to access the Todo app.
2. Sign up for a new account or log in if you already have one.
3. Start managing your todos by adding, updating, and deleting tasks.

## Contributing

Feel free to contribute to the development of Todo Monorepo. Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Nx - Extensible Dev Tools for Monorepos](https://nx.dev/)
- MEAN Stack: MongoDB, Express.js, Angular, Node.js

Thank you for using Todo Monorepo! If you encounter any issues or have suggestions for improvements, please [create an issue](https://github.com/your-username/todo-monorepo/issues).