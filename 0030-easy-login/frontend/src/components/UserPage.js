import React from "react";

const UserPage = () => {
  return (
    <div className="user-page-container">
      <div className="user-card">
        <div className="user-profile">
          <img src="logo192.png" alt="User Avatar" className="user-avatar" />
          <h1 className="user-name">Hello, [Your Name]!</h1>
          <p className="user-welcome">
            Welcome to your personalized dashboard.
          </p>
        </div>
        <div className="user-info">
          <h2>Your Activity</h2>
          <ul className="activity-list">
            <li>✔ Logged in successfully</li>
            <li>📁 Accessed recent files</li>
            <li>📅 Updated your profile</li>
          </ul>
          <button className="btn-primary">Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
