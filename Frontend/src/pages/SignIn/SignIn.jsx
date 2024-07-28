import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignIn.css";
import googleLogo from "../../assets/google.png";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("sign-in-page");
    return () => {
      document.body.classList.remove("sign-in-page");
    };
  }, []);

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/users/current`, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current user', error);
      throw error;
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/auth/signin`, {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      localStorage.setItem('expiresIn', Date.now() + 7200000); // Save expiration time (2 hours)
      const user = await getCurrentUser(); // Fetch current user after setting the token
      localStorage.setItem('currentUser', JSON.stringify(user)); // Save user to localStorage
      navigate("/");
      //window.location.reload();
      alert("Sign in successful");
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : err.message;
      setMessage(`Sign in failed: ${errorMessage}`);
    }
    setLoading(false);
  };

  return (
    <div className="auth-background">x
      <div className="wrapper">
        <form id="signInForm" onSubmit={handleSignIn}>
          <h2>Sign in</h2>
          <p>For security reasons, please log in to access the information</p>
          <div className="input-field">
            <input
              type="text"
              id="username"
              placeholder="username"
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
