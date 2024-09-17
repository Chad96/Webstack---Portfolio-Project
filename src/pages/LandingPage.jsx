import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="d-flex h-100 text-center text-bg-dark">
      {/* SVG icons and theme toggler omitted for brevity */}

      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">Recipe Master</h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link className="nav-link active" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/login">
                Log in
              </Link>
            </nav>
          </div>
        </header>

        <main className="px-3">
          <h1>Welcome to Recipe Master</h1>
          <p className="lead">
            This Online Recipe App allows users to register, log in, manage
            their profile, and create, view, edit, and delete recipes.
          </p>
          <p className="lead">
            <Link
              to="/register"
              className="btn btn-lg btn-secondary fw-bold border-white bg-white"
              style={{ color: "black" }}
            >
              Get started
            </Link>
          </p>
        </main>

        <footer className="mt-auto text-white-50">
          <p>
            Recipe{" "}
            <a
              href="https://www.linkedin.com/in/chadrack-ndalamba-442139137/"
              className="text-white"
            >
              Master
            </a>
            , by{" "}
            <a href="https://github.com/Chad96" className="text-white">
              Chad_codes
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
