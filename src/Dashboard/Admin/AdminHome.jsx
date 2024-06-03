import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";

const AdminHome = () => {
   const [userData, refetch, isPending] = useUser();
    const {name, email, role, photo, bank_account_no, designation} = userData || {};

   if(isPending){
    return <p>Loading...</p>
   }
    return (
        <div>
            <div>
                <img className="size-72 rounded-full" src={photo} alt="" />
                <h1 className="text-3xl font-bold">{name}</h1>
                <p>Email: {email}</p>
            </div>
        </div>
    );
};

export default AdminHome;