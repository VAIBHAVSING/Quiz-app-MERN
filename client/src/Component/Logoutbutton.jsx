import { useNavigate } from "react-router-dom";

export function Logoutbutton({token}) {
  
    function logout() {
        localStorage.removeItem(`${token}`);
       window.location.reload();
    }
    return(
     <div className="bg-[#F41111] font-bold h-12 my-5 text-center pt-2 text-2xl rounded-2xl hover:bg-[#7CF015] hover:rounded-3xl">
         <button onClick={logout}>Log Out</button>
     </div>
    )
 }