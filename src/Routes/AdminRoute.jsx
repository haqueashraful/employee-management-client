import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Components/Loading";
import PropTypes from 'prop-types';

const AdminRoute = ({children}) => {
    const [isAdmin, isPending] = useAdmin();
    const { user, loader } = useAuth();
    const location = useLocation();
    if (isPending || loader) {
      return <Loading />
    }
  
    if (isAdmin && user) {
      return children;
    }
  
    return <Navigate to="/" state={{ from: location }} replace />;
};


AdminRoute.propTypes = {
  children: PropTypes.node
}

export default AdminRoute;