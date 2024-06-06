import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import img from "../../assets/contact.jpg";
import { Card } from "antd";

const Contact = () => {
  const axiosPublic = useAxiosPublic();
  const contactSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const message = form.message.value
    const phone = form.phone.value


    axiosPublic.post('/contacts', {
      name,
      email,
      message,
      phone
    }).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Message sent successfully, Please Wait for response',
          showConfirmButton: false,
          timer: 1500
        })
        form.reset()
      }
    })
    console.log('submitted');
  }
  return (
    <div>
      {/* banner */}
      <div
        className="my-10 rounded-md overflow-hidden"
        style={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full h-full flex justify-center items-center bg-black/50 py-10">
          <h1 className="text-5xl font-bold text-white my-10 text-center">
            Contact Us
          </h1>
        </div>
      </div>
      {/* contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-10">
        <Card hoverable className="!border-blue-700/50">
          <h1 className="text-2xl font-bold text-blue-400">Phone</h1>
          <p className="text-xl">+880 185632 8101</p>
        </Card>
        <Card hoverable className="!border-blue-700/50">
          <h1 className="text-2xl font-bold text-blue-400">Email</h1>
          <p className="text-xl">123ashrafulhaque@gmail.com</p>
        </Card>
        <Card hoverable className="!border-blue-700/50">
          <h1 className="text-2xl font-bold text-blue-400">Address</h1>
          <p className="text-xl">Dhaka, Bangladesh</p>
        </Card>
      </div>

      {/* form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
        <Card hoverable className="!border-blue-700/50">
          <h1 className="text-2xl font-bold text-blue-400">Send us a message</h1>
          <form onSubmit={contactSubmit} className="flex flex-col justify-center items-center gap-5">
            <input
              className="w-full p-2 border"
              name="name"
              type="text"
              placeholder="Name"
            />
            <input
              className="w-full p-2 border"
              name="email"
              type="email"
              placeholder="Email"
            />
            <input
              className="w-full p-2 border"
              name="phone"
              type="tel"
              placeholder="Phone"
            />
            <textarea
              className="w-full p-2 border"
              placeholder="Message"
              name="message"
              rows="5"
            ></textarea>
            <button className="w-full p-2 bg-blue-500/50 text-white">Submit</button>
          </form>
        </Card>
        <Card hoverable className="!border-blue-700/50">
          <h1 className="text-2xl font-bold text-blue-400">Find us on map</h1>
          <iframe
            className="w-full h-96 rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.843791879258!2d90.41251831498122!3d23.750930294593682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b855a36f4c5b%3A0x3e66bcd833b1715e!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1622878071612!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          />
        </Card>
      </div>
    </div>
  );
};

export default Contact;
