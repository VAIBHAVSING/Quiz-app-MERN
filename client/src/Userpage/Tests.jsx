import { useEffect, useState } from "react";
import { Navbar } from "../Component/Navbar";
import { Testcard } from "../Component/Testcard";
import axios from "axios";
import { useRecoilState } from "recoil";
import { testheader } from '../store/atoms/Client';
import { useNavigate } from "react-router-dom";

export function Tests() {
  const [tests, setTests] = useRecoilState(testheader);
  const [islogin, setlogin] = useState();
  const navigate = useNavigate();

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
    if (islogin) {
      async function fetchapi() {
        try {
          const response = await axios.get(`${process.env.REACT_APP_APILINK}/user/tests`,{
            headers:{
              Authorization:localStorage.getItem("studenttoken")
            }
          });
          setTests(response.data.tests); // Assuming the data is directly in response.data
        } catch (error) {
          console.error("Error fetching tests:", error);
        }
      }
      fetchapi();
    }
  }, [islogin]);

  return (
    <div style={{ background: "black", minHeight: "100vh", color: "white" }}>
      <Navbar token={"studenttoken"}/><br /><br />
      <div className="xl:mx-56 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {tests.map((test, index) => (
          <Testcard key={index} test={test} index={index} />
        ))}
      </div>
    </div>
  );
}