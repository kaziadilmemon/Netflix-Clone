import React from "react";
import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <div>
      <h1>Welcome GX Agent!</h1>
      <nav className="dashboard-container">
        <ul className="dashboard-option-container">
          <Link className="dashboard-option" to={"/view"}>
            View Buttons
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default UserHome;
