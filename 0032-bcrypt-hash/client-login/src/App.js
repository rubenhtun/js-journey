import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}
export default App;
