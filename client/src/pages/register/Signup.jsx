import "./signup.css";
import { Link } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        password,
        email,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };

    return (
      <div className="register-container">
        <div className="register-left">
          <section className="register-copy-left">
            <h1>Explore your creativity</h1>
            <p className="text-left">
              Publish your passions your way. Whether you'd like to share your
              knowledge, experiences or the latest news, create a unique and
              beautiful blog for free.
            </p>
          </section>
        </div>
        <div className="register-right">
          <form id="register-form" onSubmit={handleSubmit}>
            <section className="register-copy-right">
              <h2>Register</h2>
              <div className="link-container">
                <p className="text-right">
                  Already have an account?
                  <Link to="/login" className="login-link">
                    <strong> Login</strong>
                  </Link>
                </p>
              </div>
            </section>
            <div className="input-container">
              <label className="username-label">Username</label>
              <input
                type="text"
                className="signup-username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="input-container">
              <label className="email-label">Email</label>
              <input
                type="email"
                className="signup-email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-container">
              <label className="password-label">Password</label>
              <input
                type="password"
                className="signup-password"
                minLength={6}
                placeholder="Must be at least 6 characters"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
            {error && (
              <span className="error">
                Error! Username or Email already exists!
              </span>
            )}
            <div className="terms">
              <p className="text-terms">
                <span className="small">
                  By continuing, you agree to the terms and conditions of SUIIT
                  Social.
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
}
