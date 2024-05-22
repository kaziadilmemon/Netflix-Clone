/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewButtons = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
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

  const playAudio = (audioFile) => {
    if (currentAudio) {
      currentAudio.stop();
    }

    const sound = new Howl({
      src: [audioFile],
      preload: true, // Add this line
    });

    sound.play();
    setCurrentAudio(sound);
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.stop();
      setCurrentAudio(null);
    }
  };

  useEffect(() => {
    getAllButtons();
  }, []);

  const handleBeforeUnload = () => {
    // Stop the audio before the page unloads
    stopAudio();
  };

  window.addEventListener("popstate", handleBeforeUnload);

  return (
    <>
      <Link to={"/dashboard"} onClick={stopAudio}>
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
      <h1>View Buttons</h1>
      <div className="view-main-container">
        <button className="view-stop-btn" onClick={stopAudio}>
          STOP
        </button>
        <div className="view-container">
          {buttons.map((button) => {
            return (
              <div key={button._id}>
                <div
                  className="view-btn"
                  style={{ backgroundColor: button.color }}
                  onClick={() => playAudio(`${baseUrl}/${button.fileUrl}`)}
                >
                  <p>{button.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="view-stop-btn" onClick={stopAudio}>
          STOP
        </button>
      </div>
    </>
  );
};

export default ViewButtons;
