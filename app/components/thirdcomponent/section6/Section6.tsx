import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import customer from "../../thirdcomponent/assets/image 33.png";
import svg from "../../thirdcomponent/assets/image 41.svg";

const testimonials = [
  {
    name: "Christian Barlow",
    role: "Software Engineer",
    text: `"This might be the best ai resume builder I’ve used. Most cost $20-30 a month… For $7.99 I sent 20 resumes and got 3 interviews. Game-changer."`,
    image: customer,
  },
  {
    name: "Sarah Kim",
    role: "Product Manager",
    text: `"I used this tool and landed an interview at my dream company in less than a week!"`,
    image: customer,
  },
  {
    name: "Alex Jordan",
    role: "UX Designer",
    text: `"Super simple, effective, and affordable. Definitely recommending to my friends."`,
    image: customer,
  },
];

const Section6 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const { name, role, text, image } = testimonials[currentIndex];

  return (
    <div className="w-full mx-auto px-6 py-16 bg-white text-black">
      <h2 className="text-[32px] md:text-[45px] text-black font-bold text-center mb-10 poppins-semibold">
        Success Stories
      </h2>

      <div className="relative flex flex-col md:flex-row items-center justify-center rounded-xl p-6 md:p-10 gap-12">
        {/* Left - Image */}
        <div className="relative flex-shrink-0 w-full max-w-[300px] md:max-w-[350px]">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="rounded-xl object-cover w-full h-auto"
            />

            {/* Star Badge */}
            <div className="absolute -left-4 top-4 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-md p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FACC15"
                viewBox="0 0 24 24"
                className="w-10 h-10"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.78 1.4 8.17L12 18.896l-7.334 3.864 1.4-8.17L.132 9.21l8.2-1.192z" />
              </svg>
            </div>

            {/* Curved Arrow */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 hidden md:block">
              <img src={svg} alt="Curved Arrow" className="w-24 h-auto" />
            </div>
          </div>
        </div>

        {/* Right - Text Section */}
        <div className="flex flex-col justify-between gap-10 max-w-full md:max-w-[520px] text-left">
          <p className="text-gray-700 text-base md:text-[20px] leading-relaxed md:leading-[30px]">
            {text}
          </p>

          <div>
            <h3 className="text-[24px] md:text-[30px] font-bold text-black">
              {name}
            </h3>
            <p className="text-[18px] md:text-[23px] text-gray-500">{role}</p>
          </div>

          {/* Arrows */}
          <div className="flex justify-start mt-4 gap-4">
            <button
              onClick={handlePrev}
              className="bg-white shadow-md p-4 md:p-6 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-indigo-600" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white shadow-md p-4 md:p-6 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-indigo-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6;
