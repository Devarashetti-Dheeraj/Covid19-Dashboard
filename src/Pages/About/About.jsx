import { useState, useEffect } from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

function About() {

  const [faqData, setFaqData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchedData = async () => {
      try{
        const res = await fetch("https://apis.ccbp.in/covid19-faqs")
        const json = await res.json()

        const {faq} = json
        
        if(faq){
          const FAQ = faq.map((item)=>({
            qno: item.qno,
            question: item.question,
            answer: item.answer
          }))
          setFaqData(FAQ)
          setLoading(false) 
        }
      }
      catch(error){
        console.log(`An Error has occured, ${error}`)
      }
    }
    fetchedData()    
},[])



return (
  <div>
    { loading ? (
      <div>
      <Header />  
        <div className="homepage-container flex justify-center items-center bg-[#161625]">
          <div>
              <svg
                width="48"
                height="49"
                viewBox="0 0 48 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
              >
                <circle
                  cx="24"
                  cy="24.5"
                  r="22"
                  stroke="#E5E7EB"
                  stroke-width="4"
                />
                <mask id="path-2-inside-1_2527_20912" fill="white">
                  <path d="M46.0051 24.5C47.1068 24.5 48.0086 23.6053 47.9172 22.5073C47.5452 18.0426 45.9291 13.7565 43.2335 10.1448C40.139 5.9986 35.7874 2.9634 30.8274 1.4916C25.8674 0.019799 20.5646 0.190212 15.7094 1.97744C11.4802 3.53423 7.78776 6.24518 5.04079 9.78438C4.36525 10.6547 4.63305 11.8965 5.55649 12.4975C6.47993 13.0984 7.70826 12.8295 8.39813 11.9705C10.6656 9.14692 13.6659 6.98122 17.0877 5.72166C21.1357 4.23155 25.557 4.08947 29.6924 5.31659C33.8278 6.54371 37.456 9.07434 40.0361 12.5313C42.217 15.4533 43.5504 18.905 43.9108 22.5083C44.0205 23.6046 44.9033 24.5 46.0051 24.5Z" />
                </mask>
                <path
                  d="M46.0051 24.5C47.1068 24.5 48.0086 23.6053 47.9172 22.5073C47.5452 18.0426 45.9291 13.7565 43.2335 10.1448C40.139 5.9986 35.7874 2.9634 30.8274 1.4916C25.8674 0.019799 20.5646 0.190212 15.7094 1.97744C11.4802 3.53423 7.78776 6.24518 5.04079 9.78438C4.36525 10.6547 4.63305 11.8965 5.55649 12.4975C6.47993 13.0984 7.70826 12.8295 8.39813 11.9705C10.6656 9.14692 13.6659 6.98122 17.0877 5.72166C21.1357 4.23155 25.557 4.08947 29.6924 5.31659C33.8278 6.54371 37.456 9.07434 40.0361 12.5313C42.217 15.4533 43.5504 18.905 43.9108 22.5083C44.0205 23.6046 44.9033 24.5 46.0051 24.5Z"
                  stroke="#3758F9"
                  stroke-width="8"
                  mask="url(#path-2-inside-1_2527_20912)"
                />
              </svg>
          </div>
        </div>      
      </div> 
    ) : (
      <div>
        <Header />
        <div className="flex flex-col px-25 py-10 min-h-[100vh]">
        <h1 className="font-semibold text-[48px] text-[#F8FAFC] pt-4">About</h1>
        <p className="text-[#94A3B8] text-[18px] font-roboto py-3">Last Updated on march 28th 2021</p>
        
        <h2 className="text-[#E2E8F0] text-[24px] font-semibold pb-10">COVID-19 vaccines be ready for distribution</h2>
        <div>
          {faqData?.map((item, idx)=>(
            <div key={idx}>
              <p className="text-[#94A3B8] text-[16px] font-semibold font-roboto pb-5">{item.question}</p>
              <p className="text-[#007BFF] text-[16px] font-semibold font-roboto pb-6">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    <Footer />
      </div>
    ) }
  </div>
)
}

export default About
