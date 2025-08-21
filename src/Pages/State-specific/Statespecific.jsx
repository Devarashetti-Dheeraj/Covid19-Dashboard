import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RiUserHeartLine } from "react-icons/ri";
import { FaHeadSideCough } from "react-icons/fa";
import Header from "../../components/Header/Header.jsx";
import TopDistricts from "../../components/TopDistricts/TopDistricts.jsx";
import RenderCharts from "../../components/BarGraph/BarGraph.jsx";


const stateMap = {
  AN: "Andaman and Nicobar Islands",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CH: "Chandigarh",
  CT: "Chhattisgarh",
  DL: "Delhi",
  DN: "Dadra and Nagar Haveli and Daman and Diu",
  GA: "Goa",
  GJ: "Gujarat",
  HP: "Himachal Pradesh",
  HR: "Haryana",
  JH: "Jharkhand",
  JK: "Jammu and Kashmir",
  KA: "Karnataka",
  KL: "Kerala",
  LA: "Ladakh",
  LD: "Lakshadweep",
  MH: "Maharashtra",
  ML: "Meghalaya",
  MN: "Manipur",
  MP: "Madhya Pradesh",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  PB: "Punjab",
  PY: "Puducherry",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TG: "Telangana",
  TN: "Tamil Nadu",
  TR: "Tripura",
  UN: "Unknown", // Some datasets use this idk what this is.
  UP: "Uttar Pradesh",
  UT: "Uttarakhand",
  WB: "West Bengal"
};

const TOP_DISTRICTS_COUNT = 28;

function Statespecific() {

  const {stateCode} = useParams();
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true)
  const [districts, setDistricts] = useState([])
  const [timeLinesData, setTimeLinesData] = useState(null)
  const [activeBox, setActiveBox] = useState(null);
  const [sortMode, setSortMode] = useState("confirmed")


  const handleClickEvent = (boxname) => {
    toggleBoxColor(boxname)
    setSortMode(boxname)
  }

  const toggleBoxColor = (boxname) => {
    setActiveBox(prev => prev === boxname ? null : boxname)
  }

  const formatDateWithOrdinal = (datetime) => {
    if (!datetime) return 'N/A'

    const date = new Date(datetime)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'long' })
    const year = date.getFullYear()

    let suffix = 'th'
    if (day % 10 === 1 && day !== 11) {
      suffix = 'st'
    } else if (day % 10 === 2 && day !== 12) {
      suffix = 'nd'
    } else if (day % 10 === 3 && day !== 13) {
      suffix = 'rd'
    }

    return `${month} ${day}${suffix}, ${year}`
  }


  useEffect(()=>{
    const fetchDataOfState = async () => {
      try{
        const [stateWiseResponse, timeLinesResponse] = await Promise.all([
          fetch("https://apis.ccbp.in/covid19-state-wise-data"),
          fetch("https://apis.ccbp.in/covid19-timelines-data")
        ])

        const stateWiseJson = await stateWiseResponse.json()
        const timeLinesJson = await timeLinesResponse.json()

        //Process state-wise data (for Totals and Top Districts
        const dataOfState = stateWiseJson[stateCode]
        const districtobj = stateWiseJson[stateCode]?.districts || {}

        if (dataOfState){

          const {total, meta} = dataOfState;  //Total,meta
          const {confirmed = 0, recovered = 0, deceased = 0, tested = 0} = total;
          const active = confirmed - recovered - deceased;
          const testedDate = meta?.tested?.date || null;
          const populationData = meta?.population || null;
          const lastUpdatedDateTime = meta?.last_updated || null;

          //set state with processed data
          setStateData({
          name: stateMap[stateCode] || stateCode,
          confirmed,
          active,
          recovered,
          deceased,
          testedDate,
          populationData,
          tested,
          lastUpdatedDateTime
        });
        }

        //converting object to array with key/value pairs(Districts)
        const distArray = Object.entries(districtobj).map(([name,info])=>{
            const confirmed = info.total?.confirmed || 0
            const recovered = info.total?.recovered || 0
            const deceased = info.total?.deceased || 0
            const active = confirmed - (recovered + deceased)
            
            return { name, confirmed, recovered, deceased, active }
          })
        
        setDistricts(distArray);

        //Process time-series data(for charts)
        if (timeLinesJson[stateCode]) {
          const {dates} = timeLinesJson[stateCode]
          const dateKeys = Object.keys(dates)

          const processedChartData = dateKeys.map(date => {
            const dayData = dates[date]
            const total = dayData.total || {}
            const delta = dayData.delta || {}
            const confirmed = total.confirmed || 0
            const recovered = total.recovered || 0
            const deceased = total.deceased || 0
            
            return {
              date,
              confirmed: delta.confirmed || 0, // DAily new
              active: confirmed - (recovered + deceased),
              recovered: delta.recovered || 0,
              deceased: delta.deceased || 0,
              tested: delta.tested || 0,
            }
          })
          setTimeLinesData(processedChartData);
        }

      } 
      catch(error){
        console.log(error)
      }
      setLoading(false)
    }

    if(stateCode){
    fetchDataOfState();
    }
  },[stateCode])

  //convet datetime to only date
  const lastUpdatedDate = formatDateWithOrdinal(stateData?.lastUpdatedDateTime);
  const sortedDistricts = [...districts].sort((a,b) => b[sortMode] - a[sortMode]).slice(0, TOP_DISTRICTS_COUNT)

  if(loading){
    return (
    <div className="flex justify-center items-center bg-[#161625] min-h-[100vh]">
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
             strokeWidth="4"
           />
           <mask id="path-2-inside-1_2527_20912" fill="white">
             <path d="M46.0051 24.5C47.1068 24.5 48.0086 23.6053 47.9172 22.5073C47.5452 18.0426 45.9291 13.7565 43.2335 10.1448C40.139 5.9986 35.7874 2.9634 30.8274 1.4916C25.8674 0.019799 20.5646 0.190212 15.7094 1.97744C11.4802 3.53423 7.78776 6.24518 5.04079 9.78438C4.36525 10.6547 4.63305 11.8965 5.55649 12.4975C6.47993 13.0984 7.70826 12.8295 8.39813 11.9705C10.6656 9.14692 13.6659 6.98122 17.0877 5.72166C21.1357 4.23155 25.557 4.08947 29.6924 5.31659C33.8278 6.54371 37.456 9.07434 40.0361 12.5313C42.217 15.4533 43.5504 18.905 43.9108 22.5083C44.0205 23.6046 44.9033 24.5 46.0051 24.5Z" />
           </mask>
           <path
             d="M46.0051 24.5C47.1068 24.5 48.0086 23.6053 47.9172 22.5073C47.5452 18.0426 45.9291 13.7565 43.2335 10.1448C40.139 5.9986 35.7874 2.9634 30.8274 1.4916C25.8674 0.019799 20.5646 0.190212 15.7094 1.97744C11.4802 3.53423 7.78776 6.24518 5.04079 9.78438C4.36525 10.6547 4.63305 11.8965 5.55649 12.4975C6.47993 13.0984 7.70826 12.8295 8.39813 11.9705C10.6656 9.14692 13.6659 6.98122 17.0877 5.72166C21.1357 4.23155 25.557 4.08947 29.6924 5.31659C33.8278 6.54371 37.456 9.07434 40.0361 12.5313C42.217 15.4533 43.5504 18.905 43.9108 22.5083C44.0205 23.6046 44.9033 24.5 46.0051 24.5Z"
             stroke="#3758F9"
             strokeWidth="8"
             mask="url(#path-2-inside-1_2527_20912)"
           />
         </svg>
     </div>
   </div>
    )
  }
  console.log(timeLinesData)

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-[#161625] pt-8">
      <div className="flex justify-around">
        <div>
          <h1 className="text-[32px] mb-4 text-center inline-block  rounded-4xl px-10  bg-[#0284C729] text-[#0EA5E9] font-semibold">{stateData.name}</h1>
          <p className="text-white">Last update on {lastUpdatedDate}</p>
        </div>
        <div className="text-[#94A3B8]">
          <p className="flex justify-end">Tested</p>
          <h1 className="text-[24px] font-medium">{stateData.tested}</h1>
        </div>
      </div>

      <div className='flex justify-center p-20'>
                <div className={`confirmed px-15 cursor-pointer text-[#ff073a] rounded-lg w-[200px] m-4 text-center ${activeBox === "confirmed" ? "bg-[#331427]" : ""}`} onClick={() => {handleClickEvent("confirmed")}}>
                  <p className='font-bold my-2 scale-85'>Confirmed</p>
                  <p className='my-4 flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </p>
                  <p className='scale-125 font-semibold my-2 text-center'>{stateData.confirmed.toLocaleString()}</p>
                </div>
                <div className={`confirmed px-15 cursor-pointer text-[#007bff] rounded-lg w-[200px] m-4 text-center ${activeBox === "active" ? "bg-[#132240]" : ""}`} onClick={() => {handleClickEvent("active")}}>
                  <p className='font-bold my-2 scale-85'>Active</p>
                  <p className='my-4 flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </p>
                  <p className='scale-125 font-semibold my-2 text-center'>{stateData.active.toLocaleString()}</p>
                </div>
                <div className={`confirmed px-15 cursor-pointer text-[#28a745] rounded-lg w-[200px] m-4 text-center ${activeBox === "recovered" ? "bg-[#182829]" : ""}`} onClick={() => {handleClickEvent("recovered")}}>
                  <p className='font-bold my-2 scale-85'>Recovered</p>
                  <p className='my-4 flex justify-center scale-230 py-3'>
                    <RiUserHeartLine />
                  </p>
                  <p className='scale-125 font-semibold my-2 text-center'>{stateData.recovered.toLocaleString()}</p>
                </div>
                <div className={`confirmed px-15 cursor-pointer text-[#818a92] rounded-lg w-[200px] m-4 text-center ${activeBox === "deceased" ? "bg-[#1C1C2B]" : ""}`} onClick={() => {handleClickEvent("deceased")}}>
                  <p className='font-bold my-2 scale-85'>Deceased</p>
                  <p className='my-4 flex justify-center scale-230 py-3'>
                    <FaHeadSideCough />
                  </p>
                  <p className='scale-125 font-semibold my-2 text-center'>{stateData.deceased.toLocaleString()}</p>
                </div>
      </div>

      <div className="flex justify-center">
        <TopDistricts districts={sortedDistricts} sortMode={sortMode}/>
      </div>
      
      <div className="">
        <RenderCharts chartData={timeLinesData} sortMode={sortMode} />
      </div>
    </div>
    </div>
  )
}

export default Statespecific
