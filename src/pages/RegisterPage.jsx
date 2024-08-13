import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormPage.css"; // Create this file for custom styles

const RegisterPage = () => {
  return (
    <div className="container mt-5">
      <nav className="nav justify-content-end">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/login">
          Log in
        </Link>
      </nav>
      <h2 className="text-center mb-4">Register</h2>
      <form className="form-signin">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
