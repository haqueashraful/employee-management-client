import Marquee from "react-fast-marquee";

const OurClient = () => {
    return (
        <div>
            <Marquee gradient gradientColor="#8EA6EB" speed={100} className=" py-5 flex flex-col justify-center items-center">
  I can be a React component, multiple React components, or just some text.
</Marquee>
        </div>
    );
};

export default OurClient;