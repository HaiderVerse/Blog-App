import React from 'react'
import Container from '@/components/global/container.jsx'
import GlobalButton from '@/components/global/Button'
import Icons from '@/components/icons/index.jsx'
export default function Footer() {
    return (
        <>
            <footer className="bg-black gap-[30px] py-12">
                <Container>
                    <div className="w-full flex flex-col items-center gap-12 md:items-start md:gap-0 md:justify-between md:flex-row">
                        <div className="w-[70%] mx-auto md:w-[248px] md:mx-[unset]">
                            <img src="/images/logo.png" className="w-[50%] h-auto md:w-[117.87px] md:h-[60px]" />
                        </div>
                        <ul className="w-[70%] mx-auto md:w-[360px] md:mx-[unset]">
                            <li className="text-white pb-6 md:pb-[30px] text-[26px] font-medium md:text-2xl md:font-medium">Company</li>
                            <li className="text-white text-[16px] pb-4">
                                <a href="#">Careers</a>
                            </li>
                            <li className="text-white text-[17px] font-medium tracking-[0.025em] md:text-[16px] pb-4">
                                <a href="#">Terms of service</a>
                            </li>
                            <li className="text-white text-[17px] font-medium tracking-[0.025em] md:text-[16px] pb-4">
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li className="text-white text-[17px] font-medium tracking-[0.025em] md:text-[16px] pb-4">
                                <a href="{{ route('how-it-work') }}">How it works</a>
                            </li>
                            <li className="text-white text-[17px] font-medium tracking-[0.025em] md:text-[16px] ">
                                <a href="{{ route('faqs') }}">Faq</a>
                            </li>
                        </ul>
                        <div className="w-[70%] mx-auto md:w-[360px] flex flex-col gap-y-5 md:mx-[unset]">
                            <h4 className="text-white text-2xl">Let's talk about your project</h4>
                            <GlobalButton link="#" customClass="w-max">Make a Schedule</GlobalButton>
                            <div className="flex gap-x-6 justify-center sm:justify-start py-8">
                                <a href="#"><Icons type="instagram" width="26px" height="26px" /></a>
                                <a href="#"><Icons type="linkedin" width="26px" height="26px" /></a>
                                <a href="#"><Icons type="facebook" width="26px" height="26px" /></a>
                                <a href="#"><Icons type="twitter" width="26px" height="26px" /></a>
                            </div>
                        </div>
                    </div>
                    <div className='my-12'>
                        <img src="/images/footer-line.png" alt="footer-line" />
                    </div>
                    <div className="text-white font-normal text-lg text-center">ⓒ 2024
                        <span className="text-[#F03DA7]">LLC</span>
                        . All rights reserved
                    </div>
                </Container>
            </footer>
        </>
    )
}
