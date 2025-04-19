import React from 'react'

import right from  "../../thirdcomponent/assets/right.svg";   
import girl from  "../../thirdcomponent/assets/girl.png";   
import man from  "../../thirdcomponent/assets/man.png";   
import man2 from  "../../thirdcomponent/assets/man2.png";   


function Section3() {
    return (
        <div className=''>
            <section className=" mx-auto w-[1441px] h-[1011px] from-white to-blue-50 py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between " style={{
                background: 'linear-gradient(2deg, rgba(223, 228, 245, 1) 27%, rgba(245, 247, 252, 1) 50%, rgba(245, 247, 252, 1) 100%)',
            }} >
                <div className=" ">
                    <h2 className="text-3xl md:text-[45px] font-poppins font-semibold text-gray-900 mb-4">
                        Trying To Find A New Job is Exhausting
                    </h2>
                    <p className="text-[#757575] mb-2">
                        80% of resumes get rejected by robots before a human sees them.
                    </p>
                    <p className="text-[#757575] mb-2">
                        Hours wasted applying... only to get auto-rejected.
                    </p>
                    <p className="text-[#757575] mb-6">
                        Missed interviews for jobs you’re perfect for.
                    </p>

                    <h3 className="text-lg font-semibold text-black mb-3 text-[30px] ">
                        The ATS doesn’t care about:
                    </h3>
                    <ul className="space-y-2 mb-6 text-[#757575]">
                        {["Your hard work", "Your career story", "Your unique skills"].map((item, index) => (
                            <React.Fragment key={index}>
                                <li className="flex items-start gap-2 text-[#757575]">
                                    <img src={right} alt="icon" className="w-4 h-4 mt-1" />
                                    <span className="text-gray-800">{item}</span>
                                </li>
                                <hr className="border-t border-gray-300" />
                            </React.Fragment>
                        ))}
                    </ul>


                    <p className="text-[#757575] mb-6">
                        It only cares about keywords. We’ll give your resume the right
                        keywords in a way that still makes sense to recruiters.
                    </p>

                    <button className="bg-emerald-400 hover:bg-emerald-500 text-white px-5 py-3 rounded-lg shadow-md transition font-medium">
                        Build Your AI Resume ✈️
                    </button>
                </div>

                <div className="flex items-center justify-center h-screen">
                    <div className="grid grid-cols-2 gap-6 ">
                        <div className="grid grid-cols-1 h-[80%] justify-center py-36">
                            <img
                                src={girl}
                                alt="Person reading resume"
                                className="w-[226px] h-[234px] object-cover rounded-xl shadow-md"
                            />
                            <div className="flex items-center justify-center w-[228px] h-[105px] shadow-md text-center text-[#FFFFFF] bg-[#6B45FE] font-bold text-lg ">
                                2000+ <br /> Satisfied Clients
                            </div>
                        </div>

                        <div className="col-span-1 gap-4 h-full justify-center py-24">
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



        // <div className='w-[1441px] h-[1011px] border-2 mx-auto ' style={{
        //     background: 'linear-gradient(2deg, rgba(223, 228, 245, 1) 27%, rgba(245, 247, 252, 1) 50%, rgba(245, 247, 252, 1) 100%)',
        //   }} >

        // </div>
    )
}

export default Section3