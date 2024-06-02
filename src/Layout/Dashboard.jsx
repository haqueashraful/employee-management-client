import { Outlet } from "react-router-dom";
import DashboardSide from "../Dashboard/DashboardSide";

const Dashboard = () => {
  return (
    <div className="mx-28 flex">
      <div className="w-64">
      <DashboardSide />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
