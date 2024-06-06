import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";

const HrRoute = ({children}) => {
    const [role , isLoading] = useRole();
    const location = useLocation();
    const {user} = useAuth();
    console.log(role)

    if(isLoading){
        return <Loading />
    }

    if(role === "hr" && user){
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default HrRoute;