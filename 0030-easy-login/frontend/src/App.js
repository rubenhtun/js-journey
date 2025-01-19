import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}
export default App;
