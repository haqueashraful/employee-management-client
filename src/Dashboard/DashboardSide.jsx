import useAdmin from "../Hooks/useAdmin";

const DashboardSide = () => {
    const [isAdmin] = useAdmin();

    
    return (
        <div className="w-64 bg-blue-700/60 h-screen">
            <h1>Dashboard Side</h1>
            <ul>
               
            </ul>
        </div>
    );
};

export default DashboardSide;