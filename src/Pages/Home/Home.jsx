import Services from './Services';
import Title from '../../Context/Title';
import Slider from './Slider';
import Testimonial from './Testimonial';
import OurClient from './OurClient';

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


            {/* testimonial */}
            <Title title="Testimonial" />
            <Testimonial />
        </div>
    );
};

export default Home;