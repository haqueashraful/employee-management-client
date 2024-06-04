import { Button, Dropdown, Menu } from "antd";
import { NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import logo from "../assets/BIPV7LIgwA3NM0jE_uQbX76_Bqo.png"

const Nav = () => {
  const { user, logOutUser } = useAuth();

  const logout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Logout failed",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink>{user?.displayName}</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="link" onClick={logout}>
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar bg-blue-300/50 w-full h-20 flex justify-between items-center lg:px-28 px-5">
      <div className="flex justify-center items-center gap-1">
        <img className=" size-10" src={logo} alt="logo" />
        <h1 className="text-3xl font-bold">Dev Care</h1>
      </div>
      <div>
        <ul className="flex justify-center items-center gap-5">
          <li>
            <NavLink to="/">
              <Button className="!border-none">Home</Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <Button className="!border-none">Contact</Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/dash-home">
              <Button className="!border-none">Dashboard</Button>
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        {user ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <button className="">
              <img
                src={user?.photoURL}
                className="w-10 h-10 rounded-full border"
                alt={user?.displayName}
              />
            </button>
          </Dropdown>
        ) : (
          <NavLink to="/login">
            <Button type="primary">Log in</Button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
