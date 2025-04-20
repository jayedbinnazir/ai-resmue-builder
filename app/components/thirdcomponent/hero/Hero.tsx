import robots from "../../thirdcomponent/assets/robot-f.png";
// import img2 from "../../thirdcomponent/assets/Frame.png";
import arrow from "../../thirdcomponent/assets/arw.svg";
import bg from "../../thirdcomponent/assets/background.png";  // Import the background image
import Section2 from "../section2/Section2.tsx";

// import IconSection from "../../ui/IconSection";

const Hero = () => {
  return (
    <div className="relative mx-auto flex flex-col items-center  ">
      <div
        className="w-full h-auto min-h-screen relative px-20 "
        style={{
          backgroundImage: `url(${bg})`,  // Use the imported bg image
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Hero Section */}
        <div className="pt-24 md:pt-36   md:pb-64">
          <div className="grid grid-cols-1 lg:grid-cols-5 items-center justify-center gap-8 px-4 ">
            {/* Left Side */}
            <div className="text-white lg:col-span-2 flex flex-col items-start justify-center ">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mx-auto lg:mx-0 mt-12">
                Land Your Next Job
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-center md:text-start my-5 max-w-md mx-auto lg:mx-0">
                Let <span className="text-[#40BEA7]">AI</span> build a resume
                that passes the ATS and stands out to recruiters
              </p>
              <button className="flex items-center gap-4 bg-[#40BEA7] px-5 py-4 rounded-md text-xl  font-poppins text-white mt-2 mx-auto lg:mx-0">
                Build your AI Resume
                <img src={arrow} alt="arrow" className="w-6 h-6" />
              </button>
            </div>

            {/* Right Side */}
            <div className="lg:col-span-3 flex justify-center">
              <img src={robots} alt="robot" className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="z-20 w-full lg:-mt-40 lg:absolute -bottom-24">
        <Section2 />
      </div>
    </div>
  );
};

export default Hero;
