import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../Component/Navbar";
import { duration } from "@mui/material";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { testheader, index, Duration } from '../store/atoms/Client'
import { Questionanswer } from "../store/atoms/Client"
import { Button } from "../Component/Button";
function Radioinput({ id, name, value, checked, onChange }) {
    return (
        <div className="m-4">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id}>{value}</label>
        </div>
    );
}

function Timer({ initialTime,functioncall }) {
    const [time, setTime] = useState(initialTime);
    const navigate = useNavigate();
    const [second, setsecond] = useState();
    const [minute, setminute] = useState();

    useEffect(() => {
        setsecond(time % 60);
        setminute(Math.floor(time / 60));

        let timerId;
        if (time > 0) {
            timerId = setTimeout(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            functioncall();
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [time]);

    return <div className="  h-10 text-center bg-gray-600 text-white text-2xl z-10 sticky top-0 rounded-xl p-2">{minute}min {second}sec</div>;
}


function Questionset({ question, id, selectedAnswer }) {
    const setSelectedAnswers = useSetRecoilState(Questionanswer);
    const onAnswerChange = (index, id, ans) => {
        setSelectedAnswers((oldanswer) => {
            const updatedanswer = [...oldanswer];
            updatedanswer[index] = { ...updatedanswer[index], questionid: id, respond: ans };
            return updatedanswer;
        });
    };
    console.log(id)
    return (
        <div className="mt-4 pt-4 bg-primary">
            <div className="text-3xl text-black font-bold">Q{id + 1}: {question.Q}</div>
            <div className="text-black font-bold ml-2 md:ml-6 lg:ml-16">
                <Radioinput
                    key={'A'}
                    id={`${question._id}A`}
                    name={id} // Name is the same for all options
                    value={question.A}

                    onChange={() => onAnswerChange(id, question._id, 'A')}

                />
                <Radioinput
                    key={'B'}
                    id={`${question._id}B`}
                    name={id} // Name is the same for all options
                    value={question.B}

                    onChange={() => onAnswerChange(id, question._id, 'B')}

                />
                <Radioinput
                    key={'C'}
                    id={`${question._id}C`}
                    name={id} // Name is the same for all options
                    value={question.C}

                    onChange={() => onAnswerChange(id, question._id, 'C')}

                />
                <Radioinput
                    key={'D'}
                    id={`${question._id}D`}
                    name={id} // Name is the same for all options
                    value={question.D}

                    onChange={() => onAnswerChange(id, question._id, 'D')}

                />

            </div>
        </div>
    );
}

export function Attempttest() {
    const [testData, setTestData] = useState();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const { testid } = useParams();
    let TestId = testid.split(':id:');
    const [i, setIndex] = useRecoilState(index);
    const tests = useRecoilValue(testheader);
    const navigate=useNavigate();
    const duration = useRecoilValue(Duration);
    useEffect(() => {
        setIndex(TestId[1]); // Set index in the effect hook
    }, [TestId, setIndex]);
    TestId = TestId[0];
    const [islogin, setlogin] = useState();
    const [Iseligible,seteligibility]=useState(false);
    useEffect(() => {
        if (localStorage.getItem("studenttoken")) {
            setlogin(true);

        } else {
            setlogin(false);
            alert("Invalid session")
            navigate("/student/login");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_APILINK}/user/attendtest/${TestId}`, {
                    headers: {
                        Authorization: localStorage.getItem('studenttoken')
                    }

                });
                if(response.status==200){
                    seteligibility(false);
                    setTestData(response.data.test);
                }
                else{
                   seteligibility(true);
                }
                
            } catch (error) {
                console.error("Error fetching test data:", error);
            }
        };
        fetchData();
    }, [testid]);

    const question = useRecoilValue(Questionanswer);
    async function buttononclick() {
        const authorization = localStorage.getItem('studenttoken');
       
        // Check if token exists
        if (!authorization) {
            console.error('Authorization token not found in localStorage');
            return;
        }
        const response = await axios.post(`${process.env.REACT_APP_APILINK}/user/updateanswer`, { testid: TestId, submitted:true,question }, {
            headers: {
                Authorization: `${authorization}` // Include token as Bearer token in Authorization header
            }
        })
        const data=response.data;
        if (response.status==200) {
            navigate('/student/tests')
            alert("test submitted successfully");
        }
    
    }
    
    return (
        <div style={{ background: "black", minHeight: "100vh", color: "white" }}>
            <Navbar token={"studenttoken"}/>
            <div className="flex justify-center sticky top-0 "><Timer initialTime={duration} functioncall={buttononclick} /></div>
            <div className="xl:mx-56">
                {testData &&
                    testData.question.map((question, id) => (
                        <Questionset
                            key={question._id}
                            question={question}
                            id={id}

                        />
                        
                    ))}
                <Button onClick={buttononclick} label={"SUBMIT TEST"} />
                <br /><br />
            </div>

        </div>
    );
}