import { Outlet } from "react-router-dom";
import Nav from "../Shared/Nav";
import Footer from "../Shared/Footer";

const Layout = () => {
    return (
        <div>
            <Nav />
           <div className="mx-28">
           <Outlet />
           </div>
            <Footer />
        </div>
    );
};

export default Layout;