import { Card } from "antd";
import web from '../../assets/Icons/web-development_2210153.png'
import graphic from "../../assets/Icons/graphic-editor_11904976.png"
import dataScience from "../../assets/Icons/data-science_8932269.png"
import machine from "../../assets/Icons/machine-learning_2172828.png"
import digital from "../../assets/Icons/digital-marketing_3141294.png"
import network from '../../assets/Icons/network_4094475.png'

const Services = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">

            {/* web */}
            <Card hoverable className="!text-center border-blue-700">
                <div className=" flex justify-center items-center">

                <img className="w-32 h-32" src={web} alt="" />
                </div>
                <h1 className="text-2xl font-bold">Web Development</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Card>

            {/* graphic */}
            <Card hoverable className="!text-center border-blue-700">
                <div className=" flex justify-center items-center">

                <img className="w-32 h-32" src={graphic} alt="" />
                </div>
                <h1 className="text-2xl font-bold">Graphic Design</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Card>

             {/* Data science */}
             <Card hoverable className="!text-center border-blue-700">
                <div className=" flex justify-center items-center">

                <img className="w-32 h-32" src={dataScience} alt="" />
                </div>
                <h1 className="text-2xl font-bold">Data Science</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Card>

             {/* Machine learning */}
             <Card hoverable className="!text-center border-blue-700">
                <div className=" flex justify-center items-center">

                <img className="w-32 h-32" src={machine} alt="" />
                </div>
                <h1 className="text-2xl font-bold">Machine Learning</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Card>

            
             {/* digital marketing */}
             <Card hoverable className="!text-center border-blue-700">
                <div className=" flex justify-center items-center">

                <img className="w-32 h-32" src={digital} alt="" />
                </div>
                <h1 className="text-2xl font-bold">Digital Marketing</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Card>


            
             {/* Networking */}
             <Card hoverable className="!text-center border-blue-700">
                <div className=" flex justify-center items-center">

                <img className="w-32 h-32" src={network} alt="" />
                </div>
                <h1 className="text-2xl font-bold">Networking</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Card>
        </div>
    );
};

export default Services;