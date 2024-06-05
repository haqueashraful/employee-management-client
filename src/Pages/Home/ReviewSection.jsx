import { Rate, Button, Input } from "antd";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";
import feed from "../../assets/feedback.jpg";

const ReviewSection = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !name || !details) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "All fields are required",
                showConfirmButton: true,
            });
            return;
        }

        setLoading(true);
        try {
            const values = { rating, name, details };
            await axiosPublic.post("/reviews", values);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review submitted successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            setRating(0);
            setName("");
            setDetails("");
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error submitting review",
                text: error.message,
                showConfirmButton: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 bg-white rounded-md shadow-md my-10">
            <h2 className="text-2xl text-center font-bold mb-4">Leave a Review</h2>
           <div className="flex lg:flex-row flex-col justify-center items-center gap-4">
            {/* image */}
                <div className="w-full lg:w-1/2 h-1/2 overflow-hidden">
                <img className=" w-full h-full"  src={feed} alt="feedback img" />
                </div>
            {/* Form */}
           <form className="w-full lg:w-1/2" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Rating</label>
                    <Rate value={rating} onChange={setRating} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="details">Details</label>
                    <Input.TextArea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        rows={4}
                        placeholder="Your Message"
                    />
                </div>
                <div>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </div>
            </form>
           </div>
        </div>
    );
};

export default ReviewSection;
