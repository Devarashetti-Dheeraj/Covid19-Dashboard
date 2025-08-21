import { Link, NavLink } from "react-router-dom";

function Header() {

  return (
    <header className='flex justify-between items-center px-5 p-4 block] h-[80px] bg-[#1E1E30]'>
        <Link to="/" className='mx-20 cursor-pointer'>
            <h1 className="font-normal text-[20px]"><span className='text-white'>Covid19</span><span className='text-blue-600'>INDIA</span></h1>
        </Link>
        <div  className='flex gap-10 mx-10'>
            <NavLink to="/" className={({ isActive }) => `cursor-pointer text-[16px] ${isActive ? "text-white" : "text-[#9494a4]"}`}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `cursor-pointer text-[16px] ${isActive ? "text-white" : "text-[#9494a4]"}`}>
              About
            </NavLink>
        </div>
       </header>     
  )
}

export default Header
