
const TopDistricts = ({districts, sortMode}) => {

    return(
        <div className="font-roboto">
            <h1 className="text-[#FF073A] text-[32px] py-5 font-medium">Top Districts</h1>
            <div className="grid grid-cols-4 gap-y-4 gap-x-12 mb-25 justify-center">
                {districts.map((item,idx)=>(
                    <div key={idx} className="flex items-center gap-x-3 px-4 text-[#94A3B8]">
                        <span className="text-[24px]">{item[sortMode]}</span>
                        <span className="text-[16px]">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopDistricts