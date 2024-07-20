import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup } from "./Pages/Signup"
import { AdminDashboard } from './Pages/AdminDashboard'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Createquiz } from './Pages/Createquiz'
import {Tests} from './Userpage/Tests'
import {RecoilRoot} from "recoil"
import { Attempttest } from './Userpage/Attempttest'
import { Login } from './Pages/Login'
import { UpdateQuiz } from './Pages/UpdateQuiz'
import { Result } from './Userpage/Result'
import { TestResult } from './Pages/TestResult'
import {UserwiseResult} from './Pages/UserwiseResult'
import Homepage from './Pages/Homepage'
// import {Test} from "./Pages/test"
function App() {

  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
        
        <Route path="/" element={<Homepage/>}/>
          <Route  path="/admin/signup" element={<Signup title={"admin"} linklabel={'admin'} apiurl={'admin'}/>}/>
          <Route  path="/admin/login" element={<Login title={"admin"} linklabel={'admin'} apiurl={'admin'}/>} />
          <Route  path="/student/signup" element={<Signup title={"Student"} linklabel={'student'} apiurl={"user"}/>}/>
          <Route  path="/student/login" element={<Login title={"Student"} linklabel={'student'} apiurl={"user"}/>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin/updatequiz" element={<UpdateQuiz/>}/>
          <Route path='/admin/createquiz' element={<Createquiz/>} />   
          <Route path='/student/tests' element={<Tests/>}/>
          <Route path="/student" element={<div>hii from student</div>}/>
          <Route path='/student/attempttest/:testid' element={<Attempttest/>}/>
          <Route path='/student/showresult/:testid' element={<Result />}/>
          <Route path='/admin/TestResult/:testId' element={<TestResult/>}/>
          <Route path='/admin/viewTestResult/:testid' element={<UserwiseResult />}/>
        
        </Routes>
      </BrowserRouter>
    </RecoilRoot>

    </>
  )
}

export default App
