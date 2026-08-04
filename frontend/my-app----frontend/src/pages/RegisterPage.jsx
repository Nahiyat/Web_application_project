// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth_service";


export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await registerUser(form);
      console.log("Registration successful:", response);

      // ✅ Redirect to player dashboard on success
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>

        {error && <p className="error-text">{error}</p>}
        <div className="register-card">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        </div>
        <div className="register-card">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        </div>

        <div className="register-card"></div>
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        </div>

        <div className="register-card">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        
        </div>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
          marginTop: "8px",
          background: "none",
          border: "none",
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline"
          }}>
          Login Here
        </button>
      </div> 
  );
}