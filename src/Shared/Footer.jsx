import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import logo from "../assets/BIPV7LIgwA3NM0jE_uQbX76_Bqo.png";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <Marquee className="bg-green-700/80 py-5">
        <p className="text-center text-white font-bold text-5xl">
          #Contact With Us Today
        </p>
      </Marquee>

      <footer>
        {/* start */}
        <div>
          <p className="">Copyright © 2022 - All right reserved</p>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        {/* middle */}
        <div className="flex justify-center items-center gap-1">
          <img className=" size-10" src={logo} alt="logo" />
          <h1 className="text-3xl font-bold">Dev Care</h1>
        </div>
        {/* end */}
        <div>
            <p>Connect in Social</p>
            <ul>
                <li><FaFacebook /></li>
                
            </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
