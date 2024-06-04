import { Outlet } from "react-router-dom";
import Nav from "../Shared/Nav";
import Footer from "../Shared/Footer";

const Layout = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-10">
        <Nav />
      </div>
      <div className="mx-28">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;








