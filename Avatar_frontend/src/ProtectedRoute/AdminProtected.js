/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import useAxios from "../utils/useAxios";
import { authActions } from "../store/reducers/auth-slice";
import { Navigate } from "react-router-dom";
const AdminProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const refresh = useSelector((state) => state.auth.refresh);
  const dispatch = useDispatch();
  const api = useAxios();
  let decoded;
  if (refresh) {
    decoded = jwt_decode(refresh);
  }
  const baseUrl = useSelector((state) => state.baseUrl.url);
  const verifyUser = async () => {
    try {
      const response = await api.post(`${baseUrl}/api/verifyUser/`, {
        token: refresh,
      });
    } catch (err) {
      dispatch(authActions.logout());
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);
  if (isLoggedIn && decoded.userType === "admin") {
    return children;
  }
  return <Navigate to={"/login"}></Navigate>;
};
export default AdminProtectedRoute;
