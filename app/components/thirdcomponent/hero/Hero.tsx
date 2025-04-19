import React from "react";
// import { Link } from "react-router-dom";
import img1 from "../../thirdcomponent/assets/robot-new.png";
import img2 from "../../thirdcomponent/assets/frame.png";
import bgImage from "../../thirdcomponent/assets/background.png";
// import IconSection from "../../ui/IconSection";


const Hero = () => {
  return (
    <div
      className="w-full h-[847px] relative -z-10 "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      
    >
      {/* Navigation positioned absolutely */}
      <div className="absolute top-8 left-0 w-full z-10  ">
          <div className="flex justify-around items-center text-white px-4">
            <div>RESUME TAILOR</div>
            <div className="flex gap-8">
              <div>Home</div>
              <div>Pricing</div>
              <div>Testimonials</div>
              <div>FAQ</div>
            </div>
            <div>
              <button className="w-[120px] h-[34px] bg-transparent border-1 border-white rounded-lg">
                Login
              </button>
            </div>
          </div>
      </div>

      {/* hero section start  */}
      <div className="p-14 ">
          <div className="grid grid-cols-5 items-center justify-center text-center gap-4 pt-[158px] px-7">
            <div className="text-white col-span-2">
              <h1 className="text-6xl font-bold text-start w-[606px]">
                Land Your Next Job
              </h1>
              <p className="text-2xl text-start my-7 w-[500px]">
                Let <span className="text-[#40BEA7]">AI</span> build a resume
                that passes the ATS and stands out to recruiters
              </p>
              <button className="flex justify-center items-center gap-2 bg-[#40BEA7] lg:w-[276px] lg:h-[56px] rounded-md font-semibold">
                Build your AI Resume
                <img src={img2} alt="" className="" />
              </button>
            </div>
            <div className="col-span-3">
              <img src={img1} alt="" />
            </div>
          </div>
      </div>

      {/* <IconSection/> */}
    </div>
  );
};

export default Hero;