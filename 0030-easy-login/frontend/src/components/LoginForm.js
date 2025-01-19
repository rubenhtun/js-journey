import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMesssage] = useState("");

  const navigate = useNavigate();

  // Submit required login data
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username && !password) {
      alert("Please fill both fields!");
      return; // End the program
    }

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(res.status);
        setMesssage(data.message); // Successful login message
        navigate("/user");
      } else {
        console.log(res.status);
        setMesssage(data.message); // Failed login message
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {/* Error Message */}
        <p
          className={
            message.includes("success")
              ? "success"
              : message.includes("Invalid")
              ? "error"
              : ""
          }
        >
          {message}
        </p>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
