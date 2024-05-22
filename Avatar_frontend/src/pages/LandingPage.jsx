import React from "react";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/reducers/auth-slice";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const refresh = useSelector((state) => state.auth.refresh);
  const dispatch = useDispatch();
  let decoded;
  if (refresh) {
    decoded = jwt_decode(refresh);
  }
  return (
    <div>
      <header className="header">
        <div className="logo">GX Telemarketing</div>
        {isLoggedIn ? (
          <button
            className="login-button"
            onClick={() => dispatch(authActions.logout())}
          >
            Logout
          </button>
        ) : (
          <div className="dropdown">
            <button className="login-button">Login</button>
            <div className="dropdown-content">
              {/* Link to User Login Route */}
              <a href="/user">Login as User</a>
            </div>
          </div>
        )}
      </header>

      <div className="hero-section">
        <div className="content">
          <h1>Welcome To GX Telemarketing</h1>
          {decoded.userType === "admin" ? (
            <div>
              <Link to={"/dashboard"} className="login-button">
                Open Dashboard
              </Link>
              <Link to={"/register"} className="login-button">
                Register Users
              </Link>
            </div>
          ) : (
            <Link to={"/view"} className="login-button">
              View Buttons
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
