import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state?.userLogin);
  const { userInfo, loading } = user;
  let location = useLocation();
  if (loading) {
    return <Loader />;
  }

  if (!userInfo?.access_token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
