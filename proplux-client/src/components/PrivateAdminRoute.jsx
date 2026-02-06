import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Not logged in → redirect to admin login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    // Logged in but not admin → go to homepage
    return <Navigate to="/" replace />;
  }

  // Admin authenticated → allow access
  return children;
};

export default PrivateAdminRoute;
