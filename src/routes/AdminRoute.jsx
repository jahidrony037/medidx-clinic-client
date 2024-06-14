import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const [isAdmin, adminLoading] = useAdmin() || [];
  const { user, loading } = useAuth() || {};
  const location = useLocation();
  if (loading || adminLoading) {
    return <Loader />;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate state={{ from: location }} replace to={"/login"} />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
