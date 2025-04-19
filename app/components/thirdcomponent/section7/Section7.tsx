import React from 'react'

import btn from "../../thirdcomponent/assets/btn.png";
import social from "../../thirdcomponent/assets/social.png";


function Section7() {
    return (
        <div className=' mx-auto w-[1441px] h-[837px]  bg-[#F5F7FC]  flex flex-col justify-evenly items-center' >
            <div  className=' text-[45px] font-semibold font-poppins pt-10 text-black'  >Trusted by Professionals</div>
            <div className=' flex flex-col gap-6 w-[1200px] h-[244px] ' >
                <p className='font-inter text-[22px] leading-[30px] text-[#757575]' >Discover why our platform is recognized as the best AI resume builder for job seekers ready to transform their career trajectory. Our advanced AI resume technology is designed to streamline the application process, ensuring that every resume is optimized to pass ATS filters and catch the eye of recruiters</p>
                <p className='font-inter text-[22px] leading-[30px] text-[#757575]' >By leveraging cutting-edge algorithms and data-driven insights, we’ve built the best resume builder AI that not only saves you time but also increases your chances of landing interviews and ultimately, your dream job. Whether you're revamping an old resume or creating one from scratch, our solution is the ideal choice for a seamless and effective job search.</p>
            </div>
            <div className='  ' >
                <img src={btn} alt="Group of logos" className='w-[303.26px] h-[62.9px]' />
            </div>
            <div className='  ' >
                <img src={social} alt="Group of logos" className='w-[907px] h-[135px]' />

            </div>
        </div>
    )
}

export default Section7