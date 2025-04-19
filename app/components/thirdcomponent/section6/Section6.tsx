import { ArrowLeft, ArrowRight } from 'lucide-react';
import customer from "../../thirdcomponent/assets/image 33.png"; // Replace with actual image URL
import svg from "../../thirdcomponent/assets/image 41.svg" 


const Section6 = () => {
  return (
    <div className="max-w-[1130px] mx-auto px-4 py-12">
      <h2 className="text-[45px] font-bold text-center mb-10 poppins-semibold">Success Stories</h2>

      <div className="relative flex flex-col md:flex-row items-center justify-between bg-white rounded-xl p-6 md:p-10 gap-6 md:gap-15 ">
        {/* Image & Star */}
        <div className="relative flex-shrink-0">
         <div className="relative inline-block">
          {/* User Image */}
          <img
            src={customer} // Replace with actual image URL
            alt="Christian Barlow"
            className=" rounded-xl object-cover"
          />

      {/* Star Badge */}
      <div className="absolute -left-4 top-15 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-md p-3">
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

      <div className=' absolute -right-12 bottom-62 hidden md:block'>
          <img src={svg} alt="" />
      </div>
    </div>
        
    </div>

        {/* Text */}
        <div className="flex flex-col justify-between gap-6 max-w-[520px]  items-start">
      {/* Testimonial Text */}
      <p className="text-gray-700 text-base leading-relaxed text-[25px]">
      "This might be the best ai resume builder I’ve used. Most cost $20-30 a month… For $7.99 i Sent 20 resumes and got 3 interviews. Game-changer."
      </p>

      {/* Name & Title */}
      <div>
        <h3 className="text-[30px] font-bold text-black">Christian Barlow</h3>
        <p className="text-[23px] text-gray-500">Software Engineer</p>
      </div>

      {/* Arrows */}
      <div className="flex justify-center mt-15 gap-4">
        <button className="bg-white shadow-md p-7 rounded-full hover:bg-gray-100 transition cursor-pointer">
          <ArrowLeft className="w-7 h-7 text-indigo-600" />
        </button>
        <button className="bg-white shadow-md p-7 rounded-full hover:bg-gray-100 transition cursor-pointer">
          <ArrowRight className="w-7 h-7 text-indigo-600" />
        </button>
      </div>
    </div>
      </div>
    
    </div>
  );
};

export default Section6;
