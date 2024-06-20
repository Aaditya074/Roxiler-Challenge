# Roxiler-Challenge


# MERN Coding Challenge

This project demonstrates a MERN stack application with a React frontend styled using Tailwind CSS. It features a backend that interacts with a MongoDB database to manage product transactions and provides several API endpoints for transaction statistics and visualizations. 

## Table of Contents

- [Features](#features)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- Fetch and initialize the database with seed data from a third-party API.
- List all transactions with search and pagination.
- Provide statistics for total sales, sold items, and unsold items for a selected month.
- Display a bar chart of items based on price ranges.
- Display a pie chart of unique categories and item counts for a selected month.
- Frontend with a responsive UI built using Tailwind CSS.

## Setup

### Prerequisites

- Node.js v18.20.2 or higher
- MongoDB v5.0 or higher (local or Atlas)
- npm v9.6.6 or higher

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aaditya074/Roxiler-Challenge.git
   cd mern-coding-challenge
2. **Install dependencies:**
    npm install
3. **Configure environment variables:**
    MONGO_URI=mongodb://localhost:27017/transactions
    PORT=5000
4. **Run the backend server:**
    npm run dev

### Frontend Setup

1. **Navigate to the frontend directory:**
  cd ../frontend
2. **Install dependencies:**
  npm install
3. **Run the frontend development server:**
  npm start
### Usage
  **Initialize Database**
To seed the database with data, make a GET request to:
  http://localhost:5000/initialize
**Access the Frontend**
Navigate to http://localhost:3000/transactions to view the transactions table, statistics, and charts.

### Summary

This `README.md` provides a complete guide for setting up and running your MERN stack project with Tailwind CSS. It covers installation, configuration, usage, API endpoints, project structure, and licensing information, ensuring that anyone who visits your GitHub repository can understand and use your project effectively. Replace `https://github.com/Aaditya074/Roxiler-Challenge` with the actual URL of your GitHub repository before posting it on your repository's README.
