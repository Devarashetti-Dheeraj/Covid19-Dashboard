import NotFound from "../../assets/NotFound.png"
import Homepage from "../Homepage/Homepage"
import { useNavigate } from "react-router"

function NotFoundPage() {

  const navigate = useNavigate()

  const backToHome = () => {
    navigate("/")
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] text-center">
      <img src={NotFound} alt="Not_Found_Img" />
      <h1 className="font-semibold text-[32px] text-[#CBD5E1] pb-4">Page Not Found</h1>
      <p className="text-[#94A3B8] text-[20px] font-medium">we’re sorry, the page you requested could not be found</p>
      <p className="text-[#94A3B8] text-[20px] font-medium pb-8"> Please go back to the homepage</p>
      <button className="bg-[#2563EB] hover:bg-[#215ad4] px-[24px] py-[12px] mx-[20px] rounded-3xl text-white cursor-pointer font-semibold text-[24px] h-fit w-fit" onClick={backToHome}>Home</button>
    </div>
  )
}

export default NotFoundPage
