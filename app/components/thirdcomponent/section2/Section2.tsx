import React from 'react'

import img1 from "../../thirdcomponent/assets/paper.svg";   
import img2 from "../../thirdcomponent/assets/adminIcon.svg";   
import img3 from "../../thirdcomponent/assets/magnify.svg";   
import img4 from "../../thirdcomponent/assets/magnify2.svg";   
import img5 from "../../thirdcomponent/assets/dollar.svg";   
import img6 from "../../thirdcomponent/assets/lines.svg";   


function Section2() {
    return (
        <div className='absolute left-[350px] shadow-md rounded-xl w-[1196px] h-[275.98px] flex justify-evenly items-center mx-auto bg-[#FFFFFF] z-60 -mt-48 ' >
         <div className='flex flex-col gap-5 ' >
         <div className="relative ">
                {/* Main icon (paper) */}
                <img
                    src={img1}
                    alt="Paper Icon"
                    className="w-[54.27px] m-auto h-[67.64px] bg-white"
                />

                {/* Overlay icon (vector5) */}
                <img
                    src={img2}
                    alt="Vector Icon"
                    className="absolute m-auto top-2.5 right-12 w-[33.66px] h-[45.58px]"
                />
                <img
                    src={img3}
                    alt="Vector Icon"
                    className="absolute m-auto top-12 bg-white left-19 w-[31.1px] h-[31.1px] z-1"
                />
                <img
                    src={img4}
                    alt="Vector Icon"
                    className="absolute m-auto top-18 left-25 w-[13.41px] h-[13.41px] z-10"
                />
            </div>
            <p className='text-[22.75]  font-bold font-inter' >Pass ATS screens</p>
         </div>
         {/* //2 */}

        {/* 3 */}
         <div className='flex flex-col gap-5 ' >
         <div className="relative ">
                {/* Main icon (paper) */}
                <img
                    src={img1}
                    alt="Paper Icon"
                    className="w-[54.27px] m-auto h-[67.64px] bg-white"
                />

                {/* Overlay icon (vector5) */}
                <img
                    src={img2}
                    alt="Vector Icon"
                    className="absolute m-auto top-2.5 right-13 w-[33.66px] h-[45.58px]"
                />
               
            </div>
            <p className='text-[22.75]  font-bold font-inter' >2x more interviews</p>
         </div>

    
         <div className='flex flex-col gap-4' >
         <div className="relative ">
                {/* Main icon (paper) */}
                <img
                    src={img1}
                    alt="Paper Icon"
                    className="w-[54.27px] h-[67.64px] m-auto"
                />

                {/* Overlay icon (vector5) */}
                <img
                    src={img1}
                    alt="Vector Icon"
                    className="absolute top-2 right-2 w-[54.27px] h-[67.64px] m-auto "
                />
                <img
                    src={img5}
                    alt="Vector Icon"
                    className="absolute top-3 left-15 w-[12.24px] h-[22.83px] m-auto "
                />
                <img
                    src={img6}
                    alt="Vector Icon"
                    className="absolute top-10 left-15 w-[28.4px] h-[11.85px] m-auto"
                />
            </div>
            <p className='text-[22.75]  font-bold font-inter' >Higher paying jobs</p>
         </div>

        </div>
    )
}

export default Section2 ;