/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/reducers/auth-slice";
import useAxios from "../utils/useAxios";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const refresh = useSelector((state) => state.auth.refresh);
  const baseUrl = useSelector((state) => state.baseUrl.url);
  const dispatch = useDispatch();
  const api = useAxios();
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
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to={"/login"}></Navigate>;
};
export default ProtectedRoute;
