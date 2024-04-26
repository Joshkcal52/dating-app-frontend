import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.scss";
import { useAuthInfo } from "../context/AuthContext";

export default function Login() {
  const { errorMsg, login, logout } = useAuthInfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formBody = new FormData(e.target);
    const formPayload = Object.fromEntries(formBody);

    login(formPayload);
  };

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="login-page-wrapper">
      {errorMsg && <div className="error-message">Error: {errorMsg}</div>}
      <div className="login-form-container">
        <div className="login-title">Login</div>
        <form className="login-form" onSubmit={handleSubmit} method="POST">
          <div className="email-container">
            <label htmlFor="email">Email</label>
            <input
              autoComplete="current-email"
              name="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input
              autoComplete="current-password"
              name="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="button-container">
            <button
              className="login-button"
              type="submit"
              disabled={!email || !password}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Link to="/login/signup">Create an Account</Link>
    </div>
  );
}
