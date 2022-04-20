import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "../../components";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state?.userLogin);
  const { userInfo, loading } = user;
  let location = useLocation();
  if (loading) {
    return <Loading inline backdrop />;
  }

  if (!userInfo?.access_token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default ProtectedRoute;
