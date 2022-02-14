import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login-container">
      <div className="login-left">
        <section className="login-copy-left">
          <h1>Welcome</h1>
          <p className="text-left">
            Log in to continue to your account.
          </p>
        </section>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <section className="login-copy-right">
            <h2>Login</h2>
            <div className="link-container">
              <p className="text-right">
                New here?
                <Link to="/register" className="register-link">
                  <strong> Register</strong>
                </Link>
              </p>
            </div>
          </section>
          <div className="login-input-container">
            <label className="login-username">Username</label>
            <input type="text" className="input-username" ref={userRef} />
          </div>
          <div className="login-input-container">
            <label className="login-password">Password</label>
            <input
              type="password"
              className="input-password"
              minLength={6}
              placeholder="Must be at least 6 characters"
              ref={passwordRef}
            />
          </div>
          <button type="submit" className="login-btn" disabled={isFetching}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
