import React from 'react'

import ats from "../../thirdcomponent/assets/ats.svg";
import ai from "../../thirdcomponent/assets/ai.svg";
import makeover from "../../thirdcomponent/assets/makeover.svg";


function Section5() {
  return (
   <div className=' w-[1441px] h-[501px] flex flex-col justify-center  m-auto bg-[#F5F7FC]' >
        <div className='text-center font-semibold font-poppins text-black text-[45px] pt-20' >
                Here What You Get
        </div>
        <div className=' w-[1441px] h-[501px] flex justify-around m-auto bg-[#F5F7FC]' >
        
        <div className=' flex flex-col gap-4 self-center ' >

            <div className='' >
            <img
                    src={ats}
                    alt="Paper Icon"
                    className="w-[89px] m-auto h-[89px] bg-white"
                />
            </div>
            <div className=' w-[303px] ' >
                <p className='font-inter font-bold text-[27.9px] text-black text-center'> ATS- Formatting</p>
                <p className='font-inter text-center leading-[28px] text-black text-[20px] opacity-45'> Proven layouts that algorithms read perfectly</p>
            </div>
        </div>
        
        <div className=' flex flex-col gap-4 self-center ' >

            <div className='' >
            <img
                    src={ai}
                    alt="Paper Icon"
                    className="w-[89px] m-auto h-[89px] bg-white"
                />
            </div>
            <div className=' w-[303px] ' >
                <p className='font-inter text-black font-bold text-[27.9px] text-center'>AI Keyword Injection</p>
                <p className='font-inter text-black text-center leading-[28px] text-[20px] opacity-45'> Auto-matches skills to job descriptions</p>
            </div>
        </div>
        <div className=' flex flex-col gap-4 self-center ' >

            <div className='' >
            <img
                    src={makeover}
                    alt="Paper Icon"
                    className="w-[89px] m-auto h-[89px] bg-white"
                />
            </div>
            <div className=' w-[303px] ' >
                <p className='font-inter text-black font-bold text-[27.9px] text-center'> 60-Second</p>
                <p className='font-inter text-black text-center leading-[28px] text-[20px] opacity-45'>Update old resumes for new roles instantly</p>
            </div>
        </div>
       
    </div>
   </div>
  )
}

export default Section5