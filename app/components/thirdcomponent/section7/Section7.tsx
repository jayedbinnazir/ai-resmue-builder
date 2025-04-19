import React from 'react'

import btn from "../../thirdcomponent/assets/btn.png";
import social from "../../thirdcomponent/assets/social.png";

function Section7() {
  return (
    <div className="w-full bg-[#F5F7FC] flex flex-col items-center justify-evenly py-14 px-4">
      <h2 className="text-[32px] md:text-[45px] font-semibold font-poppins text-black text-center mb-6">
        Trusted by Professionals
      </h2>

      <div className="flex flex-col gap-6 max-w-[1200px] w-full mb-10">
        <p className="font-inter text-[18px] md:text-[22px] leading-[28px] md:leading-[30px] text-[#757575] text-justify">
          Discover why our platform is recognized as the best AI resume builder for job seekers ready to transform their career trajectory. Our advanced AI resume technology is designed to streamline the application process, ensuring that every resume is optimized to pass ATS filters and catch the eye of recruiters.
        </p>
        <p className="font-inter text-[18px] md:text-[22px] leading-[28px] md:leading-[30px] text-[#757575] text-justify">
          By leveraging cutting-edge algorithms and data-driven insights, we’ve built the best resume builder AI that not only saves you time but also increases your chances of landing interviews and ultimately, your dream job. Whether you're revamping an old resume or creating one from scratch, our solution is the ideal choice for a seamless and effective job search.
        </p>
      </div>

      <div className="mb-8">
        <img
          src={btn}
          alt="CTA Button"
          className="w-[250px] md:w-[303.26px] h-auto"
        />
      </div>

      <div>
        <img
          src={social}
          alt="Social Proof Logos"
          className="w-full max-w-[907px] h-auto"
        />
      </div>
    </div>
  );
}

export default Section7;
