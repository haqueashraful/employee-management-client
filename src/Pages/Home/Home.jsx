import Services from "./Services";
import Title from "../../Context/Title";
import Slider from "./Slider";
import Testimonial from "./Testimonial";
import OurClient from "./OurClient";
import ProjectsSection from "./ProjectsSection";

const Home = () => {
  return (
    <div>
      {/* slider */}
      <Slider />

      {/* Services */}
      <Title title="Services" />
      <Services />

      {/* projects */}
      <Title title="Our Projects" />
      <ProjectsSection />

      {/* Our Valuable Client */}
      <Title title="Our Valuable Client" />
      <OurClient />

      {/* testimonial */}
      <Title title="Testimonial" />
      <Testimonial />
    </div>
  );
};

export default Home;
