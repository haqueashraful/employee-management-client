import { Link } from "react-router-dom";
import useRole from "../../Hooks/useRole";

const DashboardSide = () => {
  // const [role] = useRole();
  const role = "admin";
  console.log(role);

  if (role === "admin") {
    return (
      <div className="w-64 bg-blue-700/60 min-h-screen max-h-screen">
        <h1 className="text-3xl font-bold text-center">Dashboard Side</h1>
        <ul>
          <li>
            <Link to="/dashboard/dash-home">Dash Home</Link>
          </li>
          <li>
            <Link to="/dashboard/all-employee-list">All Users</Link>
          </li>
        </ul>
      </div>
    );
  }
  if (role === "hr") {
    return (
      <div className="w-64 bg-blue-700/60 min-h-screen">
        <h1 className="text-3xl font-bold text-center">Dashboard Side</h1>
        <ul>
          <li>
            <Link to="/dashboard/dash-home">Dash Home</Link>
          </li>
          <li>
            <Link to="/dashboard/employee-list">Employee List</Link>
          </li>
          <li>
            <Link to="/dashboard/progress">Progress</Link>
          </li>
        </ul>
      </div>
    );
  }
  if (role === "employee") {
    return (
      <div className="w-64 bg-blue-700/60 min-h-screen">
        <h1 className="text-3xl font-bold text-center">Dashboard Side</h1>
        <ul>
          <li>
            <Link to="/dashboard/dash-home">Dash Home</Link>
          </li>
          <li>
            <Link to="/dashboard/work-sheet">Work Sheet</Link>
          </li>
          <li>
            <Link to="/dashboard/payment_history">Payment History</Link>
          </li>
        </ul>
      </div>
    );
  }
  return <p>Loading...</p>;
};

export default DashboardSide;
