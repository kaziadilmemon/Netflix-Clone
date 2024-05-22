import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const LoginProtected = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to={"/"}></Navigate>;
  }
  return children;
};
export default LoginProtected;
