import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../SignIn/SignIn.css";

const SignIn = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        username,
        password,
      });
      setCurrentUser(response.data);
      navigate("/");
      alert("Sign in successful");
    } catch (err) {
      setMessage("Sign in failed");
    }
  };

  return (
    <div className="auth-background">
      <div className="wrapper">
        <form id="signInForm" onSubmit={handleSignIn}>
          <h2>Sign in</h2>
          <div className="input-field">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Enter your username</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Enter your password</label>
          </div>
          <button type="submit" className="sign-in-button">Sign in</button>
          <button type="button" className="google-sign-in-button">
            <img src="google-icon.svg" alt="Google sign-in" />
            Sign in with Google
          </button>
          <div className="register">
            <p>Don't have an account? <a href="/signup">Register</a></p>
          </div>
          <div id="signInMessage">{message}</div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
