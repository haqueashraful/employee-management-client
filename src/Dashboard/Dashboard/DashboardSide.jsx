import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import useRole from "../../Hooks/useRole";
import Loading from "../../Components/Loading";

const DashboardSide = () => {
  const [role, isLoading] = useRole();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const roleSpecificNavLinks = () => {
    if (isLoading) {
      return <Loading />;
    }

    switch (role) {
      case "admin":
        return (
          <>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/dash-home">Dash Home</NavLink>
            </li>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/all-employee-list">All Users</NavLink>
            </li>
          </>
        );
      case "hr":
        return (
          <>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/dash-home">Dash Home</NavLink>
            </li>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/employee-list">Employee List</NavLink>
            </li>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/progress">Progress</NavLink>
            </li>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/all-contact">All Contracts</NavLink>
            </li>
          </>
        );
      case "employee":
        return (
          <>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/dash-home">Dash Home</NavLink>
            </li>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/work-sheet">Work Sheet</NavLink>
            </li>
            <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
              <NavLink to="/dashboard/payment_history">Payment History</NavLink>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  const navLinks = (
    <>
      {roleSpecificNavLinks()}
      <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="bg-white text-blue-700 px-3 py-2 rounded-md">
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="lg:hidden">
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          className="m-4 !bg-blue-700/50 !text-white"
        />
        <Drawer
          title="Dashboard Side"
          placement="left"
          closable={true}
          onClose={toggleDrawer}
          visible={drawerVisible}
          key="left"
        >
          <ul className="space-y-4">{navLinks}</ul>
        </Drawer>
      </div>
      <div className="hidden lg:block w-64 bg-blue-700/60 text-white min-h-screen max-h-screen">
        <h1 className="text-3xl font-bold text-center py-8">Dashboard Side</h1>
        <div className="px-5 space-y-4">
          <ul className="space-y-4">{navLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSide;
