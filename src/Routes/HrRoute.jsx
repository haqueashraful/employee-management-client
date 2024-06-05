import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";

const HrRoute = ({children}) => {
    const [role , isLoading] = useRole();
    const location = useLocation();
    const {user} = useAuth();

    if(isLoading){
        return <p>Loading...</p>
    }

    if(role === "hr" && user){
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default HrRoute;