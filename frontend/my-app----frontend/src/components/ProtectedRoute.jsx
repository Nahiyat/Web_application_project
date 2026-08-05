import { Navigate, useLocation } from "react-router-dom";

// Helper to safely parse JWT payload and check expiration
function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Check if exp field exists and convert to milliseconds
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token"); // Clean up expired token
      return false;
    }
    return true;
  } catch (error) {
    return false; // Token is malformed
  }
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!isTokenValid(token)) {
    // Redirect to login, but store the current location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;