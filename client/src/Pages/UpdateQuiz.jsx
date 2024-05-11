import { useEffect, useState } from "react";
import { Navbar } from "../Component/Navbar"
import axios from "axios";
import { Button } from "../Component/Button";
import { useNavigate } from "react-router-dom";
function TestcardButton({isevaluated,testid}){
    if(!isevaluated){
        
        return(
            <Button label={"evaluate"} onClick={async()=>{
                const token=await localStorage.getItem('admintoken')
                const response=await axios.get(`${process.env.REACT_APP_APILINK}/admin/evaluated/${testid}`,{headers:{Authorization:token}});
                window.location.reload();
            }}/>
        )
    }
}
function Testcard({ test, index }) {
    const navigate=useNavigate();
    let time = test.Duration;
    let minute = parseInt(time / 60);
    let second = time % 60;
    return (
        <div>
            <div className="bg-[#1780BE] h-96 text-white rounded-3xl pl-6 pt-1">
                <div className=" m-4 h-80">
                    <h1 className=" text-xl font-bold">Title:{test.Title}</h1>
                    <div>Starttime:{test.starttime}</div>
                    <div>Endtime:{test.endtime}</div>
                    <div>Duration:{minute}min {second}sec</div>
                    <p>Description:{test.description}</p>
                </div>
                <div className=""><TestcardButton isevaluated={test.isevaluated} testid={test._id}/>
                <Button label={"See Result"} onClick={()=>{
                    navigate(`/admin/TestResult/${test._id}`);
                }}/>
                </div>
            </div>
        </div>
    )
}
export function UpdateQuiz() {
    const [tests, setTests] = useState([]);
    const [islogin, setlogin] = useState();
    useEffect(() => {
        if (localStorage.getItem("admintoken")) {
            setlogin(true);

        } else {
            setlogin(false);
            alert("Invalid session")
            navigate("/admin/login");
        }
    }, []);
    useEffect(() => {
        async function fetchData() {
            try {
                const authorization = localStorage.getItem("admintoken");
                const response = await axios.get(`${process.env.REACT_APP_APILINK}/admin/mytest`, {
                    headers: { Authorization: authorization }
                });
                setTests(response.data.tests); // Assuming the response data has a 'tests' array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{ background: "black", minHeight: "100vh", color: "white" }}>
            <Navbar token={"admintoken"} />
            <div className="xl:mx-56 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {tests.map((test, index) => (
                    <Testcard key={index} test={test} />
                ))}
            </div>
        </div>
    );
}
