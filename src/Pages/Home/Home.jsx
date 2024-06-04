import Services from './Services';
import Title from '../../Context/Title';
import Slider from './Slider';

const Home = () => {
    return (
        <div>
            <Slider />
            <Title title="Services" />
            <Services />
            
        </div>
    );
};

export default Home;