import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import useUser from "../../Hooks/useUser";

const DashboardHome = () => {
  const { user } = useAuth();
  const [userData, refetch, isPending] = useUser();
  const { name, email, role, photo, bank_account_no, designation } =
    userData || {};

  // const role = "admin"
  // const [role] = useRole();

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-20">Hi, Welcome <span className="text-blue-700">{name}</span>!</h1>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* user image */}
      <div className="text-center border rounded-lg border-blue-700 p-1">
        <img className="size-72 rounded-lg  hover:rotate-45 hover:transition hover:delay-200 hover:rounded-full" src={photo} alt="" />
      </div>
    {/* user details */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-xl font-bold">Name: <span className="font-bold">{name}</span></p>
        </div>

        <div>
            <p className="text-xl font-bold">Email: <span className="font-bold">{email}</span></p>

        </div>
        <div>
            <p className="text-xl font-bold">Role: <span className="font-bold">{role}</span></p>
        </div>
        <div>
            <p className="text-xl font-bold">Bank Account No: <span className="font-bold">{bank_account_no}</span></p>
        </div>
        <div>
            <p className="text-xl font-bold">Designation: <span className="font-bold">{designation}</span></p>
        </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default DashboardHome;
