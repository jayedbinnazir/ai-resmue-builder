import React from 'react';

import right from "../../thirdcomponent/assets/right.svg";
import girl from "../../thirdcomponent/assets/girl.png";
import man from "../../thirdcomponent/assets/man.png";
import man2 from "../../thirdcomponent/assets/man2.png";

function Section3() {
    return (
        <div className=''>
            <section className="mx-auto w-full  h-auto pt-64 pb-20  md:px-20 flex flex-col md:flex-row items-center justify-between" style={{
                background: 'linear-gradient(2deg, rgba(223, 228, 245, 1) 27%, rgba(245, 247, 252, 1) 50%, rgba(245, 247, 252, 1) 100%)',
            }}>
                <div className="w-full md:w-1/2 mb-12 md:mb-0">
                    <h2 className="text-3xl sm:text-[40px] md:text-[45px] leading-tight font-poppins font-semibold text-gray-900 mb-4">
                        Trying To Find A New Job is Exhausting
                    </h2>
                    <p className="text-[#757575] mb-2 text-lg sm:text-[18px]">
                        80% of resumes get rejected by robots before a human sees them.
                    </p>
                    <p className="text-[#757575] mb-2 text-lg sm:text-[18px]">
                        Hours wasted applying... only to get auto-rejected.
                    </p>
                    <p className="text-[#757575] mb-6 text-lg sm:text-[18px]">
                        Missed interviews for jobs you’re perfect for.
                    </p>

                    <h3 className="text-lg sm:text-[22px] md:text-[30px] font-semibold text-black mb-3">
                        The ATS doesn’t care about:
                    </h3>
                    <ul className="space-y-2 mb-6 text-[#757575]">
                        {["Your hard work", "Your career story", "Your unique skills"].map((item, index) => (
                            <React.Fragment key={index}>
                                <li className="flex items-start gap-2 text-[#757575] text-lg sm:text-[18px]">
                                    <img src={right} alt="icon" className="w-4 h-4 mt-1" />
                                    <span className="text-gray-800">{item}</span>
                                </li>
                                <hr className="border-t border-gray-300" />
                            </React.Fragment>
                        ))}
                    </ul>

                    <p className="text-[#757575] mb-6 text-lg sm:text-[18px]">
                        It only cares about keywords. We’ll give your resume the right
                        keywords in a way that still makes sense to recruiters.
                    </p>

                    <button className="bg-emerald-400 hover:bg-emerald-500 text-white px-5 py-3 rounded-lg shadow-md transition font-medium">
                        Build Your AI Resume ✈️
                    </button>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center justify-center mb-6">
                            <img
                                src={girl}
                                alt="Person reading resume"
                                className="w-[226px] h-[234px] object-cover rounded-xl shadow-md"
                            />
                            <div className="flex items-center justify-center w-[228px] h-[105px] shadow-md text-center text-[#FFFFFF] bg-[#6B45FE] font-bold text-lg mt-4">
                                2000+ <br /> Satisfied Clients
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center justify-center">
                            <img
                                src={man}
                                alt="Person working at desk"
                                className="w-[226px] h-[234px] object-cover rounded-xl shadow-md"
                            />
                            <img
                                src={man2}
                                alt="Person with hologram UI"
                                className="w-[226px] h-[234px] object-cover rounded-xl shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Section3;
