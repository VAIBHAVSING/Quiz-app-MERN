import { useNavigate } from "react-router-dom";
import { AddButton } from "./AddButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Duration, testheader } from '../store/atoms/Client'
function LiveButton({ live, index }) {
    const question = useRecoilValue(testheader)
    const navigate = useNavigate();
    const setduration=useSetRecoilState(Duration);
    function testattempt() {
        setduration(question[index].Duration);
        const questionId = question[index]._id;
        navigate(`/student/attempttest/${questionId}:id:${index}`)
    }
    if (live === 0) {
        return (
            <AddButton label={"Attempt test"} onClick={testattempt} />
        )
    }
    else if (live === -1) {
        const questionId = question[index]._id;
        return (
            <AddButton label={"Show Result"} onClick={()=>{
                navigate(`/student/showresult/${questionId}`);
            }}/>
        )
    }
    else if (live === 1) {
        return (
            <AddButton label={"set remainder"} />
        )
    }
    else{
        return;
    }
}
export function Testcard({ test, index }) {

    let time = test.Duration;
    let minute = parseInt(time / 60);
    let second = time % 60;
    const a=Date(test.endtime)
    return (
        <div>
            <div className="bg-[#1780BE] h-96 text-white rounded-3xl pl-6 pt-1">
                <div className=" m-4 h-80">
                    <h1 className=" text-xl font-bold">Title:{test.Title}</h1>
                    <div>Starttime:{Date(test.starttime)}</div>
                    <div>Endtime:{""}</div>
                    <div>Duration:{minute}min {second}sec</div>
                    <p>Description:{test.description}</p>
                </div>
                <div className=" h-9 "><LiveButton live={test.live} index={index} /></div>
            </div>
        </div>
    )
} 