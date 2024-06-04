import Services from './Services';
import Title from '../../Context/Title';
import Slider from './Slider';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <div>
            <Slider />
            <Title title="Services" />
            <Services />
            <Title title="Testimonial" />
            <Testimonial />
        </div>
    );
};

export default Home;