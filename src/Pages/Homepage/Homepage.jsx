import { RiUserHeartLine } from "react-icons/ri";
import { FaHeadSideCough } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import { BsFilterRight } from "react-icons/bs";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import Header from '../../components/Header/Header'
import Footer from "../../components/Footer/Footer";
import './index.css'

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
  TT: "Total", // This usually represents the overall India data.
  UN: "Unknown", // Some datasets use this idk what this is.
  UP: "Uttar Pradesh",
  UT: "Uttarakhand",
  WB: "West Bengal"
};


function Homepage() {

  const [search, setSearch] = useState('');

  const [loader, setLoader] = useState(true)

  const navigate = useNavigate()

  const [totals, setTotals] = useState({
    confirmed: 0,
    active: 0,
    recovered: 0,
    deceased: 0
  })

  const [data, setData] = useState([]);

  const sortAsc = () => {
    const sorted = [...data].sort((a,b)=> a.state.localeCompare(b.state))
    setData(sorted);
  }

  const sortDec = () => {
    const sorted = [...data].sort((a,b)=> b.state.localeCompare(a.state))
    setData(sorted);
    console.log(sorted)
  }

  const selectedRoute = (stateCode) => {
    navigate(`/state/${stateCode}`)
  };


  useEffect(() => {
    const fetchedData = async () => {
      
      try{
        const res = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
        const json = await res.json()
        console.log(json)
        //Object.entries(json) converts the data into an array of key-value pairs.
        const processed = Object.entries(json).map(([code, stateData])=>{   //stateData = object containing all date-based data for that state, code is just AP, AN...
          const name = stateMap[code] || code  //sets AP to full name from stateMap list.
            const total = stateData?.total

            if(!total) return null

            const confirmed = total?.confirmed || 0
            const recovered = total?.recovered || 0
            const deceased = total?.deceased || 0
            const population = stateData?.meta?.population || 0
            const active = confirmed - (recovered + deceased); 
            const latestDate = stateData?.meta?.tested?.date || null;


            return{
              code,
              state: name,
              confirmed,
              active,
              recovered,
              deceased,
              population,
              latestDate
            }   
        }).filter(Boolean)  //removes any nulls
        console.log(processed)

        //total values for all states
        const {totalConfirmed, totalRecovered, totalDeceased, totalActive} =  processed.reduce(
              (acc,item) => ({
                totalConfirmed: acc.totalConfirmed + item.confirmed,
                totalRecovered: acc.totalRecovered + item.recovered,
                totalDeceased: acc.totalDeceased + item.deceased,
                totalActive: acc.totalActive + item.active
              }),
              {totalConfirmed: 0, totalRecovered: 0, totalDeceased: 0, totalActive: 0}
            )


        setData(processed)
        setLoader(false)
        setTotals({
          confirmed: totalConfirmed,
          recovered: totalRecovered,
          deceased: totalDeceased,
          active: totalActive 
        })
        
      }
      catch(error){
        console.log(`An Error has occured, ${error}`)
      }
    }
    
    fetchedData();
    
  },[])

  const filteredData = data.filter(
    item => !search || item.state.toLowerCase().startsWith(search.toLowerCase()),
  );
  
  return (
    <div>  
        <Header />
        {!search ? ( loader ? (
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
        ) : (
        <article className="homepage-container">
            <input 
              className='search' 
              type='search' 
              placeholder="Enter the state" 
              onChange={(e)=>{setSearch(e.target.value)}} 
              value={search} 
            />
            <div className='flex justify-center p-20'>
              <div className='confirmed px-24 text-[#ff073a]'>
                <p className='font-bold my-2 scale-85'>Confirmed</p>
                <p className='my-4 flex justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </p>
                <p className='scale-125 font-semibold my-2 text-center'>{totals.confirmed.toLocaleString()}</p>
              </div>
              <div className='confirmed px-24 text-[#007bff]'>
                <p className='font-bold my-2 scale-85'>Active</p>
                <p className='my-4 flex justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </p>
                <p className='scale-125 font-semibold my-2 text-center'>{totals.active.toLocaleString()}</p>
              </div>
              <div className='confirmed px-24 text-[#28a745]'>
                <p className='font-bold my-2 scale-85'>Recovered</p>
                <p className='my-4 flex justify-center scale-230 py-3'>
                  <RiUserHeartLine />
                </p>
                <p className='scale-125 font-semibold my-2 text-center'>{totals.recovered.toLocaleString()}</p>
              </div>
              <div className='confirmed px-24 text-[#818a92]'>
                <p className='font-bold my-2 scale-85'>Deceased</p>
                <p className='my-4 flex justify-center scale-230 py-3'>
                  <FaHeadSideCough />
                </p>
                <p className='scale-125 font-semibold my-2 text-center'>{totals.deceased.toLocaleString()}</p>
              </div>
            </div>
            <section className=" bg-[#1e1e30] mx-40 border-1 border-[#47556c] text-[#f8fafc] rounded-[12px]">
              <ul className="grid grid-cols-6 py-4 text-sm text-[#f8fafc]  ">
                <li className="flex pl-10">States/UT <BsFilterLeft size={18} className="mx-3  mt-1 cursor-pointer" onClick={sortAsc}/> <BsFilterRight size={18} className="mt-1" onClick={sortDec}/></li>
                <li className="pl-10">Confirmed</li>
                <li className="pl-3">Active</li>
                <li className="pr-5">Recovered</li>
                <li className="pr-10">Deceased</li>
                <li className="pr-15">Population</li>
              </ul>
              <hr />
              <div>
                  <div className="mx-10">
                    {data.map((item, index) => (
                    <div key={index} className="grid grid-cols-6 py-4 text-sm rounded-lg text-[#f8fafc]">
                      <p className="flex flex-start">{item.state}</p>
                      <p className="text-[#ff073a]">{item.confirmed.toLocaleString()}</p>
                      <p className="text-[#007bff]">{item.active.toLocaleString()}</p>
                      <p className="text-[#28a745]">{item.recovered.toLocaleString()}</p>
                      <p className="text-[#818a92]">{item.deceased.toLocaleString()}</p>
                      <p className="text-[#d4d4db]">{item.population.toLocaleString()}</p>
                    </div>
                    ))}
                  </div>
              </div>
            </section>
        </article>
        ) 
      )   :   (
        <article className="homepage-container">
          <input 
              className='search' 
              type='search' 
              placeholder="Enter the state" 
              onChange={(e)=>{setSearch(e.target.value)}} 
              value={search} 
            />
          <div className="w-[824px] pt-4 flex flex-col justify-center">
              {filteredData.map((item, index) => (
                <div key={index} onClick={() => selectedRoute(item.code)} className="flex justify-between text-sm text-[#f8fafc] p-4 hover:bg-[#2c2c40] hover:border-1">
                  <p className="flex flex-start p-1 pt-2 cursor-pointer">{item.state}</p>
                  <button className="p-1 pt-2 font-bold text-amber-500">{item.code}</button>
                </div>
                ))}
          </div>
        </article>
      )}
      <Footer />
    </div>
  )
}

export default Homepage