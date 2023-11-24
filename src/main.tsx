import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

//Page

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
