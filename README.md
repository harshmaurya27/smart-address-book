# 📒 Smart Address Book

A web application for managing addresses efficiently. It allows users to store, edit, and delete addresses, with an auto-fill feature for city and state based on the PIN code.

## 🛠 Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

---

## 📌 Project Structure

Smart-Address-Book/ │── frontend/ # React Frontend │── backend/ # Node.js & Express Backend │── README.md

# Project Documentation

---

## 🚀 Features

- Auto-fill city and state based on PIN code
- Responsive address table for easy navigation
- Edit and delete functionality for addresses

## ⚡ Running the Application Locally

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v16+)
- **MongoDB** (local or cloud instance like MongoDB Atlas)

### **1. Clone the Repository**

```sh
git clone https://github.com/harshmaurya27/smart-address-book
cd smart-address-book
```

# 🏗 Backend Setup (Node.js & Express)

```sh
1. Move into the backend folder
   cd backend

2.install all dependecies
npm install

3.Create a .env file in the backend folder and add:
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.eaics.mongodb.net/addresses

4.Start the backend server
npm run dev

```

# 🎨 Frontend Setup (React.js)

```sh
1. Move into the frontend folder
   cd ../frontend

2. Install dependencies
   npm install

3. Start the frontend
   npm run dev or npm start
```

# 🌍 API Used for PIN Code Auto-Fill

```sh
PostPincode API (India):`https://api.postalpincode.in/pincode/${pincode}`




```

# live link

```sh
frontend: https://smartaddressbook1.netlify.app/
backend:https://smart-address-book-2q7z.onrender.com
```
