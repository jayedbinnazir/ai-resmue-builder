import React from "react";

import frame from "../../thirdcomponent/assets/Frame.png";
import frame2 from "../../thirdcomponent/assets/Frame2.png";
import frame3 from "../../thirdcomponent/assets/Frame2.png";
import arc2 from "../../thirdcomponent/assets/Arc 2.png";
import arc3 from "../../thirdcomponent/assets/Arc 3.png";


function Section4() {
  return (
    <div className="h-auto w-full my-18 ">
      <h2 className="poppins-semibold text-[45px] w-2/3 mx-auto text-center mt-[51px] mb-[30px]">
        Land Your Next Job Faster Using Our AI Resume Builder
      </h2>
      <h3 className="poppins-semibold text-[30px] w-2/3 mx-auto text-center mt-[30px]">
        Process Steps:
      </h3>
      <p className="inter-400 text-[#757575] text-[22px] w-2/3 mx-auto text-center mt-[10px]">
        Our AI knows what ATS bots and hiring managers want. All you have to do
        is
      </p>
      <div className="w-[75%] mx-auto grid grid-cols-8  mt-[70px]">
        <div className="col-span-2">
          <div className="flex items-center justify-around">
            <p className="inter-700 text-[30px] text-[#40BEA7]">01</p>
            <img src={frame} className="" />
          </div>
          <p className="inter-700 text-[25px] text-center mt-[20px]">
            Click to Build Your Resume
          </p>
        </div>
        <div className="col-span-1 my-auto">
          <img src={arc2} alt=""  />
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-around">
            <p className="inter-700 text-[30px] text-[#40BEA7]">01</p>
            <img src={frame2} className="" />
          </div>
          <p className="inter-700 text-[25px] text-center mt-[20px]">
            Paste a Job Description
          </p>
        </div>
        <div className="col-span-1 my-auto">
          <img src={arc3} alt="" />
        </div>
        <div className="col-span-2 ">
          <div className="flex items-center justify-around">
            <p className="inter-700 text-[30px] text-[#40BEA7]">01</p>
            <img src={frame3} className="" />
          </div>
          <p className="inter-700 text-[25px] text-center mt-[20px]">
            Get in Front of Recruiters
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-around text-white mt-[50px]">
        <button className="bg-[#40BEA7] flex items-center gap-2 poppins-semibold text-[22px] p-3 rounded-md"><span>Build Your AI Resume</span> <img src="/Frame copy.png" alt="" /></button>
      </div>
    </div>
  );
}

export default Section4;
