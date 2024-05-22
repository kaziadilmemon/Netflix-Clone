/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ModifyButton = () => {
  const baseUrl = useSelector((state) => state.baseUrl.url);
  const [buttons, setButtons] = useState([]);
  const api = useAxios();
  const getAllButtons = async () => {
    try {
      const response = await api.get(`${baseUrl}/api/getallButtons`);
      setButtons(response.data.message);
    } catch (err) {
      setButtons([]);
    }
  };
  useEffect(() => {
    getAllButtons();
  }, []);
  return (
    <div>
      <Link to={"/dashboard"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 512.001"
        >
          <path
            fillRule="nonzero"
            d="M512 256c0 70.685-28.658 134.696-74.981 181.019-46.324 46.324-110.327 74.982-181.019 74.982-70.692 0-134.695-28.658-181.019-74.982C28.658 390.696 0 326.692 0 256c0-70.691 28.658-134.695 74.981-181.019C121.305 28.658 185.308 0 256 0c70.692 0 134.695 28.658 181.019 74.981C483.342 121.305 512 185.309 512 256zm-200.641-79.002c17.861-30.984-6.963-46.317-25.063-29.013L185.25 236.726c-16.136 16.13-16.136 22.427 0 38.563l101.046 88.742c18.187 17.18 42.867 2.202 25.063-29.021l-46.932-79.002 46.932-79.01z"
          />
        </svg>
        <span className="goback">Go Back</span>
      </Link>
      <h1 className="modify-heading">Modify Button</h1>
      <div className="modify-container">
        <div className="modify-btns">
          {buttons.map((button) => {
            return (
              <div className="modify-parent" key={button._id}>
                <div
                  className="view-btn"
                  style={{ backgroundColor: button.color }}
                >
                  {button.name}
                </div>
                <Link className="btn" to={`/update/${button._id}`}>
                  Modify
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModifyButton;
