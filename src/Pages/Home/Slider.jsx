import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import slide3 from '../../assets/Slider/rpa-concept-with-blurry-hand-touching-screen.jpg'
import slide2 from '../../assets/Slider/website-hosting-concept-with-bright-light.jpg'
import slide1 from '../../assets/Slider/web-design-concepts-with-blurred-background.jpg'
import slide4 from '../../assets/Slider/programming-background-with-person-working-with-codes-computer.jpg'
import slide5 from '../../assets/Slider/aerial-view-businessman-using-computer-laptop.jpg'

const Slider = () => {
    return (
        <div className="w-full my-8">
             <Carousel  autoPlay infiniteLoop showArrows={true}>
                <div>
                    <img className="" src={slide1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img className=" object-cover" src={slide2} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={slide3} />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={slide4} />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src={slide5} />
                    <p className="legend">Legend 5</p>
                </div>
              
            </Carousel>
        </div>
    );
};

export default Slider;