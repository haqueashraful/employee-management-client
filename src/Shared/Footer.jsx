import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import logo from "../assets/BIPV7LIgwA3NM0jE_uQbX76_Bqo.png";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <Marquee speed={200} className="bg-green-700/50 py-5">
        <p className="text-center text-white font-bold text-5xl">
          #Contact With Us Today
        </p>
      </Marquee>

      <footer className="bg-blue-700/50 text-white py-10 grid justify-center items-center gap-5 grid-cols-1 lg:grid-cols-3 px-5 lg:px-28">
        {/* start */}
        <div className=" space-y-3">
          <ul className="space-y-3">
            <li className="text-xl font-bold underline">
              <Link to="/">Home</Link>
            </li>

            <li className="text-xl font-bold underline">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <p className=" text-xl">Copyright © 2022 - All right reserved</p>
        </div>
        {/* middle */}
        <div className="lg:flex flex-col justify-center items-center">
          <div className="flex  gap-1">
            <img className=" size-10" src={logo} alt="logo" />
            <h1 className="text-3xl font-bold">Dev Care</h1>
          </div>
        </div>
        {/* end */}
        <div className="lg:flex flex-col justify-end items-end">
          <p className="text-2xl font-bold">Connect in Social</p>
          <ul className="flex items-center gap-5 py-3">
            <li className=" p-2 rounded-full text-2xl flex justify-center items-center bg-white text-blue-700">
              <Link to="https://github.com/haqueashraful">
              <FaGithub />
              </Link>
            </li>
            <li className=" p-2 rounded-full text-2xl flex justify-center items-center bg-white text-blue-700">
              <Link to="https://www.facebook.com/profile.php?id=100051858772605">
              <FaFacebook />
              </Link>
            </li>
            <li className=" p-2 rounded-full text-2xl flex justify-center items-center bg-white text-blue-700">
              <Link to="https://www.linkedin.com/in/a-h-rana">
              <FaLinkedinIn />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
