import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Carousel, Rate } from "antd";
import Title from "antd/es/typography/Title";

const Testimonial = () => {
    const axiosPublic = useAxiosPublic();
    const {data : reviews = []} = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get("/reviews");
            return res.data;
        }
    })
    return (
        <div className="my-10">
            <Carousel autoplay>
               {
                reviews.map((review) => (
                    <div className=" bg-blue-700/50 px-2 lg:px-20 py-20 text-center space-y-5 rounded-md" key={review._id}>
                        <Rate disabled defaultValue={review.rating} />
                        <Title level={1} className="!text-white ">{review.name}</Title>
                        <p className="!text-white text-xl">{review.details}</p>
                    </div>
                ))
               }
               </Carousel>
        </div>
    );
};

export default Testimonial;