import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Page
import Signup from "./pageComponents/authentication/signup.tsx";
import Login from "./pageComponents/authentication/login.tsx";
import Chat from "./pageComponents/dashboard/Chat.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import Chatroom from "./pageComponents/dashboard/Chatroom.tsx";
import Message from "./pageComponents/dashboard/message.tsx";
import PrivateUser from "./pageComponents/dashboard/PrivateUser.tsx";
import PrivateMessage from "./pageComponents/dashboard/privateMessage.tsx";

import { ThemeProvider } from "./config/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/chatroom"
          element={
            <ProtectedRoute>
              <Chatroom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatroom/:room_name"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <PrivateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/startchat/:user_name"
          element={
            <ProtectedRoute>
              <PrivateMessage />
            </ProtectedRoute>
          }
        />
      </Routes> */}
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
