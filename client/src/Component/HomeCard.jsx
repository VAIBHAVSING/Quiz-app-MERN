function Proceedbutton({ onclick }) {
    return (
        <button onClick={onclick} className='flex justify-normal bg-[#BCBEFA] p-2 rounded-xl hover:bg-[#5CE1E6] '>
            <div>Proceed</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>

        </button>
    )
}
export function HomeCard({svg,title,onclick}){
    return(
        <div className="bg-[#1780BE] h-52 rounded-3xl">
            <div className=" flex justify-around">
             <div dangerouslySetInnerHTML={{ __html: svg }} className="span-col-3 fill-white " />
             <div className=" text-center font-bold text-3xl">{title}</div>
        </div>
        <div className="flex justify-end mr-5 mt-12"><Proceedbutton onclick={onclick}/></div>
        </div>
    )
}