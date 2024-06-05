import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Components/Loading";

const AdminRoute = ({children}) => {
    const [isAdmin, isPending] = useAdmin();
    const { user, loader } = useAuth();
    const location = useLocation();
      console.log(isAdmin)
    if (isPending || loader) {
      return <Loading />
    }
  
    if (isAdmin && user) {
      return children;
    }
  
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;