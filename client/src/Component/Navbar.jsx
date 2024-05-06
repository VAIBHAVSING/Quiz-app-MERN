import { Usericon } from "./Usericon"

import { Logoutbutton } from "./Logoutbutton";
export function Navbar({token}) {

    return (
        <div className="flex justify-between sticky top-0 bg-[#BCBEFA] ">
            <div>
                <div className=" text-[#5CE1E6] font-bold bg-black rounded-2xl w-32 h-10 text-center sm:my-5 sm:mx-20 p-1.5 ">
                    Quiz app
                </div>
            </div>
            <div className='flex justify-around'>
                <Usericon firstname={localStorage.getItem('name')}/>
                <div className='md:mx-10'>
                    <Logoutbutton token={token} />
                </div>

            </div>
        </div>

    )
}