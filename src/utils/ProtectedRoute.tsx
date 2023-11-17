import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const authToken = localStorage.getItem("auth-token");
  if (!authToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
