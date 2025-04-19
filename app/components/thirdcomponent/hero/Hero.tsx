import { Link } from "@remix-run/react";
import { useState } from "react";

import img1 from "../../thirdcomponent/assets/robot-new.png";
import img2 from "../../thirdcomponent/assets/Frame.png";
import Section2 from "../section2/Section2.tsx";
import { Menu, X } from "lucide-react";

// import IconSection from "../../ui/IconSection";


const Hero = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
  <div className="relative mx-auto flex flex-col items-center " >
     <div
      className="w-full h-auto min-h-screen relative"
      style={{
        backgroundImage: `url("images/background.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navigation */}
      <div className="absolute top-4 md:top-8 left-0 w-full z-10">
        
          <div className="flex justify-between items-center text-white px-4">
            {/* Logo */}
            <div className="text-xl font-bold">RESUME TAILOR</div>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8">
              <Link to="/">Home</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/testimonials">Testimonials</Link>
              <Link to="/faq">FAQ</Link>
            </div>

            {/* Right side: Login + Hamburger */}
            <div className="flex items-center gap-4">
              <button className="w-[100px] md:w-[120px] h-[34px] bg-transparent border border-white rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out">
                Login
              </button>

              {/* Hamburger Menu (mobile only) */}
              <button
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Popup */}
          {isOpen && (
            <div className="md:hidden mt-4 bg-white text-black rounded-lg shadow-lg py-4 px-6 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/pricing" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
              <Link to="/testimonials" onClick={() => setIsOpen(false)}>
                Testimonials
              </Link>
              <Link to="/faq" onClick={() => setIsOpen(false)}>
                FAQ
              </Link>
            </div>
          )}
      
      </div>

      {/* Hero Section */}
      <div className="pt-32 md:pt-48 pb-12">
       
          <div className="grid grid-cols-1 lg:grid-cols-5 items-center justify-center gap-8 px-4">
            {/* Left Side */}
            <div className="text-white lg:col-span-2 flex flex-col items-start justify-center ">
              <h1 className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mx-auto lg:mx-0 mt-12">
                Land Your Next Job
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-start my-5 max-w-md mx-auto lg:mx-0">
                Let <span className="text-[#40BEA7]">AI</span> build a resume
                that passes the ATS and stands out to recruiters
              </p>
              <button className="flex items-center gap-2 bg-[#40BEA7] px-6 py-3 rounded-md font-semibold text-white mt-2 mx-auto lg:mx-0">
                Build your AI Resume
                <img src={img2} alt="arrow" className="w-4 h-4" />
              </button>
            </div>

            {/* Right Side */}
            <div className="lg:col-span-3 flex justify-center">
              <img src={img1} alt="robot" className="w-full" />
            </div>
          </div>
       
      </div>
    </div>

    <div className="z-20 w-full -mt-40  lg:absolute -bottom-24">
    <Section2 />
  </div>
  </div>
  );
};

export default Hero;