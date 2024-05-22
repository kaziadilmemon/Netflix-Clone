// Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      <h1>Welcome GX!</h1>
      <nav className="dashboard-container">
        <div className="dashboard-option-container">
          <Link className="dashboard-option" to="/add">
            Add Buttons
          </Link>
          <Link className="dashboard-option" to="/modify">
            Modify Buttons
          </Link>
          <Link className="dashboard-option" to="/delete">
            Delete Buttons
          </Link>
          <Link className="dashboard-option" to="/view">
            View Buttons
          </Link>
          <Link className="dashboard-option" to="/">
            Go Back Home
          </Link>
        </div>
      </nav>

      <div>
        {/* Add Outlet to render nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
