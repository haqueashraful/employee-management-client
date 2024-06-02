import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="mx-28">
            <Outlet />
        </div>
    );
};

export default Dashboard;