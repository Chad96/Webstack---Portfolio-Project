import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormPage.css";

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <nav className="nav justify-content-end">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </nav>
      <h2 className="text-center mb-4">Log In</h2>
      <form className="form-signin">
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
          Log In
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
