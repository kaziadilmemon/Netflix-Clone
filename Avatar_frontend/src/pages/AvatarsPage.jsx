import React from "react";
import "./avt.css";

function Avatars() {
  return (
    <div className="home-container">
      <div className="container">
        <div className="grid-container">
          <div className={`featured grid-one`}>
            <a href="www.com">
              <div className="lil-overlay"></div>
              <img src="" alt="" />
              <p className="main-description">description</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avatars;
