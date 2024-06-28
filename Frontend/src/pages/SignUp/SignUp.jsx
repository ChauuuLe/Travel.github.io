import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; 
import googleLogo from "../../assets/google.png"; 

const SignUp = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("sign-in-page");
    return () => {
      document.body.classList.remove("sign-in-page");
    };
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        email,
        password,
      });
      navigate("/signin");
      alert("Sign up successful");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="auth-background">
      <div className="wrapper">
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
          <button type="button" className="google-sign-in-button">
            <img src={googleLogo} alt="Google sign-in" className="google-icon" />
            Sign up with Google
          </button>
          <div className="register">
            <p>
              Already have an account? <a href="/signin">Sign in</a>
            </p>
          </div>
          <div id="signUpMessage">{message}</div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
