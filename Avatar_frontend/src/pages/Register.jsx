/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notificationAction } from "../store/reducers/notification-slice";
import useAxios from "../utils/useAxios";
import "../index.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const [show, setShow] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const baseUrl = useSelector((state) => state.baseUrl.url);
  const navigate = useNavigate();
  const api = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`${baseUrl}/api/register/`, {
        username: username,
        password: password,
      });
      if (response.status === 201) {
        setShow(true);
        dispatch(
          notificationAction.notification({
            message: "User has been created successfully",
            type: "success",
            show: true,
          })
        );
        setTimeout(() => {
          navigate("/");
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

  useEffect(() => {
    if (notification) {
      setShow(true);
    }
  }, [notification]);

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
      <h1>User Registeration Form</h1>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Enter Employee ID:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Enter Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={{ marginTop: 15 }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
