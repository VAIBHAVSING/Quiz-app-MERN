import { Heading } from "../Component/Heading"
import { Subheading } from "../Component/Subheading"
import { InputComponent } from "../Component/InputComponent"
import { useState } from "react";
import { Confirmpassword } from "../Component/Confirmpassword";
import { Bottomwarning } from "../Component/Bottomwarning";
import axios from "axios";
import { Button } from "../Component/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function Signup({ title, linklabel,apiurl}) {
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
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const navigate = useNavigate();
    function handlesubmit() {
        if (firstname === '') {
            alert("Please Enter firstname");
            return false;
        }
        if (lastname === '') {
            alert("Please Enter lastname");
            return false;
        }
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

                    <Heading title={"Signup " + title} />
                    <Subheading label={"enter detail and signup"} />
                    <InputComponent label={"Firstname"} onChange={(event) => {
                        setFirstname(event.target.value);
                    }} id={"firstnamebutton"} type={"text"} placeholder={"vaibhav"} />
                    <InputComponent label={"Lastname"} onChange={(event) => {
                        setLastname(event.target.value);
                    }} id={"lastnamebutton"} type={"text"} placeholder={"patil"} />
                    <InputComponent label={"Email"} onChange={(event) => {
                        setEmail(event.target.value);
                    }} id={"emailbutton"} type={"email"} placeholder={"abc@xyz.com"} />
                    <Confirmpassword setValue={setPassword} />
                    <br></br>
                    <Button label={"Sign up"} onClick={async () => {
                        if (handlesubmit()) {
                            
                           try{ const url = `${process.env.REACT_APP_APILINK}/${apiurl}/signup`;
                            const response = await axios.post(url, { email, password, firstname, lastname })
                            localStorage.setItem(`${linklabel}token`, "Bearer " + response.data.token)
                            const data = response.data;
                            if (data.token) {
                                localStorage.setItem(`${linklabel}token`, "Bearer " + response.data.token)
                                localStorage.setItem('name',firstname);
                                if (linklabel === 'student') {
                                    navigate(`/student/tests`);
                                }
                                else if (linklabel === 'admin') {
                                    navigate(`/admin/dashboard`);
                                }
                            }
                         }catch(response){
                            if(response.response.status==400){
                                console.log(response.response.data.error[0])
                                const error=response.response.data.error[0].message;
                                alert("All fields are required \n"+error);
                            }
                            else if(response.response.status==409){
                                alert("Username already exists");
                            }
                            else if(response.response.status==500){
                                alert("Internal server error");
                            }
                         }
                        }
                    }} />

                    <br></br>
                    <Bottomwarning title={"Already have an account?"} label={"Login here"} link={`/${linklabel}/login`} />

                </div>
            </div>
        </div>
    )
}