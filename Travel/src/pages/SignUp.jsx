import React, { useState } from "react";
import axios from "axios";
import "../assets/style.css"; 

const SignUp = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        username,
        email,
        password,
      });
      setCurrentUser(response.data);
      setMessage("Sign up successful");
    } catch (err) {
      setMessage("Sign up failed");
    }
  };

  return (
    <div className="wrapper">
      <form id="signUpForm" onSubmit={handleSignUp}>
        <h2>Sign up</h2>
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
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Enter your email</label>
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
        <button type="submit">Sign up</button>
        <div className="register">
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
        <div id="signUpMessage">{message}</div>
      </form>
    </div>
  );
};

export default SignUp;
