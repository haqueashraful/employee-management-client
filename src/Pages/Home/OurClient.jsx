import Marquee from "react-fast-marquee";
import { FaGoogleDrive, FaReact, FaSlackHash } from "react-icons/fa";
import { SiFitbit } from "react-icons/si";
import { TbBrandAirbnb } from "react-icons/tb";

const OurClient = () => {
  return (
    <div className="my-10 -rotate-3">
      <Marquee
        speed={100}
        className="bg-blue-700/50 py-5 w-full flex flex-col justify-center items-center rounded-md"
      >
        <div className=" w-full flex justify-between items-center gap-20">
          <div className="flex justify-center items-center text-4xl">
            <TbBrandAirbnb />

            <h1>AirBnb</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <FaSlackHash />
            <h1>Slack</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <SiFitbit />
            <h1>FitBit</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <FaGoogleDrive />
            <h1>Google Drive</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <FaReact />
            <h1>React</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <TbBrandAirbnb />

            <h1>AirBnb</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <FaSlackHash />
            <h1>Slack</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <SiFitbit />
            <h1>FitBit</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <FaGoogleDrive />
            <h1>Google Drive</h1>
          </div>

          <div className="flex justify-center items-center text-4xl">
            <FaReact />
            <h1>React</h1>
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default OurClient;
