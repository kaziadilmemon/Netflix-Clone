/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useSelector, useDispatch } from "react-redux";
import { notificationAction } from "../store/reducers/notification-slice";

const ModifyForm = () => {
  const [buttonText, setButtonText] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const { buttonId } = useParams();
  const baseUrl = useSelector((state) => state.baseUrl.url);
  const navigate = useNavigate();
  const api = useAxios();
  const getButtonDetails = async () => {
    try {
      const response = await api.get(`${baseUrl}/api/getOneButton/${buttonId}`);
      setColor(response.data.message.color);
      setButtonText(response.data.message.name);
      setFile(response.data.message.fileUrl);
    } catch (err) {
      navigate("/modify");
    }
  };

  useEffect(() => {
    getButtonDetails();
  }, []);

  const handleReset = () => {
    setButtonText("");
    setColor("");
    setFile(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("audio_file", file);
      formData.append("name", buttonText);
      formData.append("color", color);
      const response = await api.put(
        `${baseUrl}/api/updateButton/${buttonId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setShow(true);
        dispatch(
          notificationAction.notification({
            message: "Your button has been updated successfully",
            type: "success",
            show: true,
          })
        );
        window.scrollTo(0, 0);
        setTimeout(() => {
          handleReset();
          navigate("/view");
        }, 2000);
      }
    } catch (err) {
      setShow(true);
      dispatch(
        notificationAction.notification({
          message: err.response.data.message,
          type: "danger",
          show: true,
        })
      );
      window.scrollTo(0, 0);
    }
    setTimeout(() => {
      setShow(false);
      dispatch(
        notificationAction.notification({
          message: "",
          type: "",
          show: false,
        })
      );
    }, 2000);
  };
  return (
    <div>
      {show && notification && notification.show && (
        <div
          className={`toast alert alert-${notification.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>Alert!</strong> {notification.message}
        </div>
      )}
      <Link to={"/modify"}>
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
      <div className="modi add-container" style={{ marginTop: 50 }}>
        <form className="add-form">
          <label>
            Button Text:
            <input
              type="text"
              required
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
            />
          </label>
          <br />
          <label>
            Select Color:
            <input
              type="color"
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <br />
          <label>
            Select Audio to Upload:
            <input
              type="file"
              accept="audio/*,.mp3,.wav,.ogg"
              required
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
          <br />
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyForm;
