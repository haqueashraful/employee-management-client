import { Collapse } from "antd";
import img from "../../assets/faq.jpg";

const FaqSection = () => {
  const items = [
    {
      key: "1",
      label: "Is available for many type of works?",
      children: (
        <p>
          Yes. We are available for any type of works. You can contact us for any type of works.
        </p>
      ),
    },
    {
      key: "2",
      label: "Which Type of works are available?",
      children: (
        <div>
          We are available for any type of works.
          <ul className="list-disc ml-5">
            <li>Web Development</li>
            <li>Graphic Design</li>
            <li>Data Science</li>
            <li>Machine Learning</li>
            <li>Digital Marketing</li>
          </ul>
          You can contact us for any type of works.
        </div>
      ),
    },
    {
      key: "3",
      label: "What are the payment options?",
      children: (
        <div>
          We accept various payment options including:
          <ul className="list-disc ml-5">
            <li>Credit cards</li>
            <li>Debit cards</li>
            <li>Online payment methods like PayPal</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-5 justify-center items-center w-full my-10 overflow-hidden">
      <div className="w-full lg:w-1/2">
        <img className="w-full h-full object-cover" src={img} alt="FAQ" />
      </div>
      <div className="w-full lg:w-1/2 p-5">
        <Collapse items={items} />
      </div>
    </div>
  );
};

export default FaqSection;
