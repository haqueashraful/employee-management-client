import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({children}) => {
    const [isAdmin, isPending] = useAdmin();
    const { user, loader } = useAuth();
    const location = useLocation();
  
    if (isPending || loader) {
      return <p> Loading...</p>
    }
  
    if (isAdmin && user) {
      return children;
    }
  
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;