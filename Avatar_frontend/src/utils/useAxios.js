import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { authActions } from "../store/reducers/auth-slice";
const useAxios = () => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state.auth);
  const baseURL = useSelector((state) => state.baseUrl.url);
  const axiosInstance = axios.create({
    url: baseURL,
    headers: {
      Authorization: `Bearer ${refresh}`,
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    try {
      const user = jwt_decode(refresh);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) {
        return req;
      } else {
        try {
          const response = await axios.post(`${baseURL}/api/refresh/`, {
            token: refresh,
          });
          const data = await response.data;
          localStorage.setItem("refresh", data.token);
          req.headers.Authorization = `Bearer ${data.token}`;
          dispatch(authActions.login({ refresh: data.token }));
          return req;
        } catch (error) {
          dispatch(authActions.logout());
        }
      }
    } catch (error) {
      dispatch(authActions.logout());
    }
  });
  return axiosInstance;
};
export default useAxios;
