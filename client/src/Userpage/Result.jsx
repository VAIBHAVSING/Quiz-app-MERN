import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Component/Navbar";
import { QuestionComponent } from "../Component/Questioncomponent";
const TestDetailsComponent = ({ test }) => {
    const min=parseInt(test.duration/60);
    const sec=test.duration%60;
    return (
      <div className=" text-black font-bold xl:mx-48 p-6 border-b-2 bg-[#D1F3DF]">
        <h2 className="text-3xl">Title:{test.title}</h2>
        <p>description:{test.description}</p>
        <p>TimeAttempted: {test.time}</p>
        <p>Duration: {min}min {sec}sec </p>
        <p>Marks Obtained: {test.marks}</p>
        <p>Total Marks: {test.totalMarks}</p>
        <p>Percentage Score: {test.marks*100/test.totalMarks}%</p>
      </div>
    );
  };
  
  // Question component

  
export function Result() {
    const [islogin, setlogin] = useState();
    useEffect(() => {
        if (localStorage.getItem("studenttoken")) {
            setlogin(true);

        } else {
            setlogin(false);
            alert("Invalid session")
            navigate("/student/login");
        }
    }, []);
    const { testid } = useParams();
    const [testdata, settestdata] = useState();
    const [isevaluated,setevaluation]=useState(false);

    useEffect(() => {
        try {
            async function apicall() {
                const token = localStorage.getItem("studenttoken");
                const response = await axios.get(`${process.env.REACT_APP_APILINK}/user/result/${testid}`, {
                    headers: {
                        Authorization: token
                    }
                });
                const eva=response.data.isevaluated;
                setevaluation(eva);
                settestdata(response.data);
                
            }
            apicall();
        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
    }, [testid])

    if(isevaluated){
        return (
            <div style={{ background: "black", minHeight: "100vh" }}>
               <div  className=" font-bold ">
               <Navbar token={"studenttoken"} />
                {testdata && <TestDetailsComponent test={testdata} />}
                <br />
                {testdata && testdata.question.map((question, index) => (
                    <QuestionComponent key={index}  index={index} question={question} />
                ))}
               </div>
               <br /><br />
            </div>
        );
    }
    else{
        return(
            <div className=" text-3xl text-center mt-10 font-bold ">Test is not evaluated yet</div>
        )
    }
}