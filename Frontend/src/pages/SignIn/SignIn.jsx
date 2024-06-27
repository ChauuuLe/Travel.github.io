import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; 
import googleLogo from "../../assets/google.png"; 

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("sign-in-page");
    return () => {
      document.body.classList.remove("sign-in-page");
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        username,
        password,
      });
      const user = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles,
        token: response.data.token
      };
      window.gon = window.gon || {};
      window.gon.currentUser = user;
      localStorage.setItem('token', user.token); // Save token to localStorage
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
          <p>For security reasons, please log in to access the information</p>
          <div className="input-field">
            <input
              type="text"
              id="username"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="actions">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="sign-in-button">Sign in</button>
          <hr className="separator" />
          <button type="button" className="google-sign-in-button">
            <img src={googleLogo} alt="Google sign-in" className="google-icon" />
            Sign in with Google
          </button>
          <div className="register">
            <p>Create Account <a href="/signup">Register</a></p>
          </div>
          <div id="signInMessage">{message}</div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
