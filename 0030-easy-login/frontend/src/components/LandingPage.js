import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="logo">My Website</h1>
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
      </header>
      <main className="main-content">
        <h2>Welcome to My Website</h2>
        <p>Your journey begins here. Explore and discover!</p>
      </main>
    </div>
  );
};

export default LandingPage;
