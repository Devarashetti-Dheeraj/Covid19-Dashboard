import { PiGithubLogoLight } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa6";
import { RxTwitterLogo } from "react-icons/rx";

function Footer() {

  return (
    <footer className="w-full py-10 bg-[#161625] text-center text-sm ">
        <div>
            <h1 className='text-[24px] font-bree-serif mb-4'><span className='text-white'>COVID19</span><span className='text-blue-600 text'>INDIA</span></h1>
            <p className='text-[#9c9cb0] text-[16px]'>we stand with everyone fighting on the front lines.</p>
            <div className="flex gap-10 justify-center pt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <PiGithubLogoLight className="text-[#CBD5E1] w-[42px] h-[46px] cursor-pointer" /> 
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-[#CBD5E1] w-[41px] h-[45px] cursor-pointer" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <RxTwitterLogo className="text-[#CBD5E1] w-[41px] h-[45px] cursor-pointer" />
              </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
