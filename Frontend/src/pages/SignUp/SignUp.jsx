import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from 'notistack';
import "./SignUp.css";

const SignUp = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    document.body.classList.add("sign-in-page");
    return () => {
      document.body.classList.remove("sign-in-page");
    };
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/auth/signup`, {
        username,
        email,
        password,
      });
      enqueueSnackbar("Sign up successful", { variant: 'success' });
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Sign up failed");
      enqueueSnackbar("Sign up failed", { variant: 'error' });
    }
  };

  return (
    <div className="auth-background">
      <div className="wrapper">
        <h1>Welcome to the Travel!</h1>
        <form id="signUpForm" onSubmit={handleSignUp}>
          <h2>Sign up</h2>
          <div className="input-field">
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="sign-up-button">Sign up</button>
          <hr className="separator" />
          <div className="register">
            <p>
              Already have an account? <a href="/signin">Sign in</a>
            </p>
          </div>
          <div id="signUpMessage" className="error-message">{message}</div>
        </form>
      </div>
    </div>
  );
};

const App = () => (
  <SnackbarProvider maxSnack={3}>
    <SignUp />
  </SnackbarProvider>
);

export default App;
