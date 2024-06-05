
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    return <Loading />
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;