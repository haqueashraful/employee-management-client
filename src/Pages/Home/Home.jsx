import Services from "./Services";
import Title from "../../Context/Title";
import Slider from "./Slider";
import Testimonial from "./Testimonial";
import OurClient from "./OurClient";
import ProjectsSection from "./ProjectsSection";
import FaqSection from "./FaqSection";
import Loading from "../../Components/Loading";
import ReviewSection from "./ReviewSection";

const Home = () => {
  return (
    <div>
      {/* slider */}
      <Slider />

      {/* Services */}
      <Title title="Services" />
      <Services />

      {/* Our Valuable Client */}
      <Title title="Our Valuable Client" />
      <OurClient />

      {/* projects */}
      <Title title="Our Projects" />
      <ProjectsSection />

      {/* testimonial */}
      <Title title="Testimonial" />
      <Testimonial />


      {/* faq */}
      <Title title="FAQ" />
      <FaqSection />

      {/* review */}
      <ReviewSection />
    </div>
  );
};

export default Home;
