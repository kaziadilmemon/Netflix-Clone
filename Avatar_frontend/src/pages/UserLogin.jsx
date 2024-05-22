/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notificationAction } from "../store/reducers/notification-slice";
import { useEffect } from "react";
import axios from "axios";
import "../index.css";
import { authActions } from "../store/reducers/auth-slice";

function UserLogin() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const baseUrl = useSelector((state) => state.baseUrl.url);
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/login/`, {
        username: username,
        password: password,
      });
      const { token } = await response.data;
      localStorage.setItem("refresh", token);
      dispatch(authActions.login({ refresh: token }));
    } catch (err) {
      dispatch(
        notificationAction.notification({
          message: err.response.data.message,
          type: "warning",
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
    }, 3000);
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
      <h1 className="special-header">Login</h1>
      <div className="login-container">
        <form className="login-form">
          <label htmlFor="username">Employee ID:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
