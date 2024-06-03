import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import AdminHome from "../Admin/AdminHome";

const DashboardHome = () => {
  const { user } = useAuth();
  const role = "admin"
  // const [role] = useRole();
    if(role === "admin"){
      return (
        <div>
      <h1 className="text-3xl font-bold text-center">Hello, Welcome {user?.displayName}</h1>
        <AdminHome />
        </div>
      )
    }

  return (
    <div>
    </div>
  );
};

export default DashboardHome;
