import { InputComponent } from "../Component/InputComponent";
import { Navbar } from "../Component/Navbar";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useState,useEffect} from "react";
import { AddButton } from "../Component/AddButton";
import { Questions, QuestionCountSelector } from "../store/atoms/Question";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


let id = 0;

function InputQuestion({ id, }) {
    const [questions, setQuestions] = useRecoilState(Questions);

    const handleQuestionChange = (id = id, field, fieldValue) => {
        setQuestions((oldQuestions) => {
            const updatedQuestions = [...oldQuestions];
            updatedQuestions[id] = { ...updatedQuestions[id], [field]: fieldValue };
            return updatedQuestions;
        });
    };

    return (
        <div key={id} className="xl:ml-24 xl:mr-24  rounded-xl border-4 border-white">

            <div className=" text-primary text-2xl">Question No({id + 1}):</div>
            <InputComponent id={`Q-${id}`} label={"Question"} placeholder={"Who is the PM of India"} value={questions[id]?.Q || ""} onChange={(e) => handleQuestionChange(id, 'Q', e.target.value)} />
            <InputComponent id={`A-${id}`} label={"OPTION A"} placeholder={"Amit Shah"} value={questions[id]?.A || ""} onChange={(e) => handleQuestionChange(id, 'A', e.target.value)} />
            <InputComponent id={`B-${id}`} label={"OPTION B"} placeholder={"Narendra Modi"} value={questions[id]?.B || ""} onChange={(e) => handleQuestionChange(id, 'B', e.target.value)} />
            <InputComponent id={`C-${id}`} label={"OPTION C"} placeholder={"Arvind Kejriwal"} value={questions[id]?.C || ""} onChange={(e) => handleQuestionChange(id, 'C', e.target.value)} />
            <InputComponent id={`D-${id}`} label={"OPTION D"} placeholder={"Rahul Gandhi"} value={questions[id]?.D || ""} onChange={(e) => handleQuestionChange(id, 'D', e.target.value)} /><br></br>
            <div className="flex justify-around">
                <div className=" text-primary">Answer</div>
                <input
                    type="radio"
                    id="optionA"
                    value="A"
                    onChange={() => handleQuestionChange(id, 'ANS', 'A')}
                    checked={questions[id]?.ANS === "A"}
                />
                <label htmlFor="optionA">Option A</label>

                <input
                    type="radio"
                    id="optionB"
                    value="B"
                    onChange={() => handleQuestionChange(id, 'ANS', 'B')}
                    checked={questions[id]?.ANS === "B"}
                />
                <label htmlFor="optionB">Option B</label>

                <input
                    type="radio"
                    id="optionC"
                    value="C"
                    onChange={() => handleQuestionChange(id, 'ANS', 'C')}
                    checked={questions[id]?.ANS === "C"}
                />
                <label htmlFor="optionC">Option C</label>

                <input
                    type="radio"
                    id="optionD"
                    value="D"
                    onChange={() => handleQuestionChange(id, 'ANS', 'D')}
                    checked={questions[id]?.ANS === "D"}
                />
                <label htmlFor="optionD">Option D</label>
            </div>


            <br />
            <div className="flex justify-center">
                <AddButton label={"Remove Question"} onClick={() => {
                    let data = [...questions];
                    data.splice(id, 1);
                    setQuestions(data);
                }} />
            </div>

            <br />
        </div>
    );
}

function InputLogic() {
    const [questions, setQuestions] = useRecoilState(Questions);

    const addQuestion = () => {
        setQuestions(prevQuestions => [
            ...prevQuestions,
            { Q: '', A: '', B: '', C: '', D: '', ANS: '' }
        ]);
    };

    return (
        <>
            {questions.map((question, id) => (
                <InputQuestion key={id} id={id} />
            ))}
            <div className="flex justify-end">
                <AddButton label={"Add Question"} onClick={addQuestion} />
            </div>
        </>
    );
}

export function Createquiz() {
    const now = dayjs(); // Convert the Date object to a Dayjs object
    const [starttime, setStarttime] = useState(now);
    const [endtime, setEndtime] = useState(now);
    const [questions, setQuestions] = useRecoilState(Questions);
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState("");
    const navigate=useNavigate();
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
    // Define your custom theme
    const theme = createTheme({
        palette: {
            mode: 'dark', // Use dark mode
            primary: {
                main: '#5CE1E6', // Accent color
            },
            background: {
                default: '#000000', // Background color
                paper: '#212121', // Paper color
            },
            text: {
                primary: '#BCBEFA', // Text color
            },
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <div style={{ background: "black", minHeight: "100vh", color: "white" }} >
                <Navbar token={"admintoken"}/>
                <br />
                <div className="md:ml-28 md:mr-28">
                    <InputComponent label={"Quiz Name"} placeholder={"SY-IT-CCE TEST"} onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                    <InputComponent step={"0.01"} label={"DURATION:"} placeholder={'5.30 is 5 min 30 sec'} type="number" onChange={(e) => {
                        let data = e.target.value;
                        data = data.split('.');
                        let second = (parseInt(data[0]) * 60) + parseInt(data[1]);

                        setDuration(parseInt(second));


                    }} />
                    <InputComponent label={"Description:"} placeholder={'after giving this test you will get 5 marks'} type="text"
                        onChange={(e) => {
                            setDescription(e.target.value);

                        }} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="Enter Test Start Time (IST)"
                                minDateTime={now} // Pass the Dayjs object
                                value={starttime}
                                onChange={(e) => {
                                    setStarttime(e);
                                }}
                                formatOptions={{ timeZone: 'Asia/Kolkata' }} // Set timezone to IST
                            />
                            <DateTimePicker
                                label="Enter Test End Time (IST)"
                                minDateTime={now} // Pass the Dayjs object
                                value={endtime}
                                onChange={(e) => {
                                    console.log(e)
                                    setEndtime(e);
                                }}
                                formatOptions={{ timeZone: 'Asia/Kolkata' }} // Set timezone to IST
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <br />

                    <InputLogic />

                    <br />
                    <div className="flex justify-center gap-4">

                        <AddButton label={"SUBMIT"} onClick={async () => {
                            // Retrieve token from localStorage
                            const authorization = localStorage.getItem('admintoken');

                            // Check if token exists
                            if (!authorization) {
                                console.error('Authorization token not found in localStorage');
                                return;
                            }

                            try {

                                // Make POST request with authorization token as header
                                const response = await Axios.post(`${process.env.REACT_APP_APILINK}/admin/createtest`, {
                                    Title: title,
                                    description,
                                    Duration: duration,
                                    starttime,
                                    endtime,
                                    question: questions
                                }, {
                                    headers: {
                                        Authorization: `${authorization}` // Include token as Bearer token in Authorization header
                                    }
                                });

                                // Log response
                                if(response.status==200){
                                    alert("Test Created Successfully")
                                    navigate("/admin/dashboard");
                                }

                            } catch (error) {
                                // Handle errors
                                console.error('Error:', error);
                            }
                        }} />

                    </div>

                </div>
                <div className="h-36"></div>
            </div>
        </ThemeProvider>
    );
}