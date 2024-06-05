import { Outlet } from "react-router-dom";
import DashboardSide from "../Dashboard/Dashboard/DashboardSide";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading";

const Dashboard = () => {
  const [role, isPending] = useRole();
  if(isPending){
    return <Loading />
  }
  
  return (
    <div className=" flex container mx-auto">
      <div className="w-64 fixed">
      <DashboardSide />
      </div>
      <div className="w-full ml-0 lg:ml-64 px-10 flex flex-col justify-center items-center min-h-screen">
        <div className="w-full">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
