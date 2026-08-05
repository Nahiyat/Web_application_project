import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./services/auth_service"; // adjust path if needed
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      // Store JWT so future requests are authenticated
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Chess Image */}
      <div
        className="login-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=1200')",
        }}
      ></div>

      {/* Right Side - Login Form */}
      <div className="login-form-section">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Welcome back, Tactician</p>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="register-section">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="create-account-btn"
              onClick={() => navigate("/register")}
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;