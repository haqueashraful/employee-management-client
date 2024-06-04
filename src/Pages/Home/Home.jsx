import Services from './Services';
import Title from '../../Context/Title';
import Slider from './Slider';
import Testimonial from './Testimonial';
import OurClient from './OurClient';

const Home = () => {
    return (
        <div>
            <Slider />
            <Title title="Services" />
            <Services />
            <Title title="Testimonial" />
            <Testimonial />
            <OurClient />
        </div>
    );
};

export default Home;