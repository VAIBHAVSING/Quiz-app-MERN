import { Heading } from "../Component/Heading"
import { Subheading } from "../Component/Subheading"
import { InputComponent } from "../Component/InputComponent"
import { useState } from "react";
import { Bottomwarning } from "../Component/Bottomwarning";
import axios from "axios";
import { Button } from "../Component/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function Login({ title, linklabel,apiurl }) {
    const [islogin, setlogin] = useState();
    useEffect(() => {
        if (localStorage.getItem(`${linklabel}token`)) {
            setlogin(true);
            alert("You already logged in")
            if(linklabel==='admin'){
                navigate("/admin/dashboard");
            }else{
                navigate("/student/tests");
            }

        } else {
            setlogin(false);
           
        }
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function handlesubmit() {
        if (email === '') {
            alert("please enter email");
            return false;
        }
        if (password === '') {
            alert("Please Enter Password");
            return false;
        }
        return true;
    }
    return (
        <div style={{ background: "black", minHeight: "100vh", color: "white" }}>
            <div className="flex justify-center border-l-2  border-r-2 xl:mx-80 " >
                <div className="">

                    <Heading title={"Login " + title} />
                    <Subheading label={"LogIn to Existing Account"} />


                    <InputComponent label={"Email"} onChange={(event) => {
                        setEmail(event.target.value);
                    }} id={"emailinput"} type={"email"} placeholder={"abc@xyz.com"} />
                    <InputComponent label={"Password"} id={"passwordinput"} placeholder={"********"} type="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <br></br>
                    <Button label={"Log in"} onClick={async () => {
                        if (handlesubmit()) {
                            const url = `http://localhost:3000/${apiurl}/signin`;
                            const response = await axios.post(url, { email, password })
                            const data = response.data;
                            if (data.token) {
                                
                                localStorage.setItem('name',data.name);
                                localStorage.setItem(`${linklabel}token`, "Bearer " + response.data.token);
                                if (linklabel === 'student') {
                                    navigate(`/${linklabel}/tests`);
                                }
                                else if (linklabel === 'admin') {
                                    navigate(`/${linklabel}/dashboard`);
                                }
                            }
                            else if(response.status==401){
                                alert("Please enter correct username or password");
                            }
                            else if(response.status==500){
                                alert("Internal server error");
                            }
                        }
                    }} />

                    <br></br>
                    <Bottomwarning title={"Don't have an account?"} label={"Signup here"} link={`/${linklabel}/signup`} />
                    
                </div>
            </div>
        </div>
    )
}