export function AddButton({label,onClick,svg}){
    return (
        <button onClick={onClick} className='flex justify-normal bg-[#BCBEFA] p-2 rounded-xl hover:bg-[#5CE1E6] '>
            <div>{label}</div>
            <div dangerouslySetInnerHTML={{ __html: svg }} className="span-col-3 fill-white " />
        </button>
    )
}