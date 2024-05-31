# Care Match Web App
## [Live Demo](https://care-match.vercel.app/)

Care Match is a platform where parents can find babysitters and message them online through the app. The project is built with the latest web technologies and is organized to provide a robust, scalable, and maintainable codebase.

## Project Overview

This Care Match web app offers the following features:
- User authentication and account creation
- Real-time messaging
- Responsive design
- User status updates
- Group chat functionality

## Technologies Used

- **Frontend**: React, Next.js, TypeScript, TailwindCSS
- **Backend**: Node.js, Prisma, Pusher
- **Authentication**: NextAuth.js
- **Database**: Prisma with PostgreSQL
- **Other Libraries**: Axios, React Hook Form, React Icons, Zustand, and more.

## Usage Instructions

- **Creating an Account**: Navigate to the signup page and fill in the required details.
- **Sending Messages**: After logging in, you can start a conversation with any user by navigating to their profile and sending a message.
- **Real-time Updates**: The app uses Pusher for real-time messaging and status updates.

## Installation Instructions

To set up and run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or above)
- npm (v6 or above) or yarn
- PostgreSQL

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/DanielH987/care-match.git
    cd care-match
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up the environment variables**:
    - Create a `.env` file in the root directory.
    - Copy the content from `.env.example` and update the variables accordingly.

4. **Set up the database**:
    - Ensure PostgreSQL is running.
    - Update the database connection string in the `.env` file.
    - Run Prisma migrations:
      ```bash
      npx prisma migrate dev --name init
      ```

5. **Generate Prisma Client**:
    ```bash
    npx prisma generate
    ```

6. **Start the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```