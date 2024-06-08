import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth() || {};
  //   console.log(loading);
  const location = useLocation();

  if (loading && !user) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ form: location }} replace to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
