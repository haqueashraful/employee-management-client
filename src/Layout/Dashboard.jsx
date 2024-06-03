import { Outlet } from "react-router-dom";
import DashboardSide from "../Dashboard/DashboardSide";

const Dashboard = () => {
  return (
    <div className="mx-28 flex">
      <div className="w-64 fixed">
      <DashboardSide />
      </div>
      <div className="w-full ml-64 px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
