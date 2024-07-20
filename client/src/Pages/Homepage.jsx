import placeholder from '../assets/placeholder.jpg'
import { Helmet } from 'react-helmet'
import React, { useRef ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Form = ({ targetRef }) => {
    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      message: ''
    });
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { firstname, lastname, email, message } = formData;
        const name = `${firstname} ${lastname}`;
        const apiurl=`${process.env.REACT_APP_APILINK}/contactus`;
        const response = await axios.post(apiurl,{ email, message, name });
      
        if (response.data.msg) {
          alert(response.data.msg);
        } else {
          alert('Message not sent');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Internal Server Error');
      }
    };
    return (
      <form className="space-y-4" data-id="50" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="51">
          <div data-id="52">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="firstname" data-id="53">
              First Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="firstname"
              placeholder="Enter your first name"
              data-id="54"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div data-id="55">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="lastname" data-id="56">
              Last Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="lastname"
              placeholder="Enter your last name"
              data-id="57"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div data-id="58">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email" ref={targetRef} id="downform" data-id="59">
            Email
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="Enter your email"
            data-id="60"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div data-id="61">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="message" data-id="62">
            Message
          </label>
          <textarea
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
            id="message"
            placeholder="Enter your message"
            data-id="63"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          data-id="64"
        >
          Send Message
        </button>
      </form>
    );
  };
export default function Homepage() {
    const targetRef = useRef(null);
    const navigate=useNavigate();

    const scrollToTarget = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        // <Helmet>
            <div className="min-h-screen bg-gray-100" data-id="1">
                <header className="bg-primary text-white p-4 flex justify-between items-center" data-id="2"><h1 className="text-2xl font-bold" data-id="3">MCQ Test App</h1><div className="flex items-center space-x-4" data-id="4"><button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary hover:text-accent-foreground h-10 px-4 py-2" data-id="5" onClick={()=>{navigate('student/login')}}>Student</button><button onClick={
                  () => navigate('/admin/login')
                } className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary hover:text-accent-foreground h-10 px-4 py-2" data-id="6">Teacher</button><span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" data-id="7"><img className="aspect-square h-full w-full" data-id="8" src={placeholder} /></span></div></header>
                <main className="p-8" data-id="9"><section id="home" className="mb-8" data-id="10"><h1 className="text-4xl font-bold mb-4" data-id="11">Welcome to MCQ Test App</h1><p className="text-lg mb-4" data-id="12">The ultimate platform for teachers to create and manage tests, and for students to take and analyze their results.</p><button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mr-4" data-id="13" onClick={scrollToTarget}>Get Started</button><button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2" data-id="14" onClick={()=>{
                    window.open('https://github.com/VAIBHAVSING/Quiz-app-MERN','_blank')
                }}>Learn More</button></section><section id="features" className="mb-8" data-id="15"><h2 className="text-3xl font-bold mb-4" data-id="16">Features</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-id="17"><div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-id="18" data-v0-t="card"><div className="flex flex-col space-y-1.5 p-6" data-id="19"><h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight" data-id="20">Create Tests</h3></div><div className="p-6" data-id="21"><p data-id="22">Create multiple-choice questions and schedule tests for your students.</p></div></div><div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-id="23" data-v0-t="card"><div className="flex flex-col space-y-1.5 p-6" data-id="24"><h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight" data-id="25">Schedule Tests</h3></div><div className="p-6" data-id="26"><p data-id="27">Set dates and times for tests to be taken by students.</p></div></div><div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-id="28" data-v0-t="card"><div className="flex flex-col space-y-1.5 p-6" data-id="29"><h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight" data-id="30">Publish Results</h3></div><div className="p-6" data-id="31"><p data-id="32">Publish test results for students to view.</p></div></div><div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-id="33" data-v0-t="card"><div className="flex flex-col space-y-1.5 p-6" data-id="34"><h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight" data-id="35">Analyze Results</h3></div><div className="p-6" data-id="36"><p data-id="37">Analyze test results to gain insights into student performance.</p></div></div><div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-id="38" data-v0-t="card"><div className="flex flex-col space-y-1.5 p-6" data-id="39"><h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight" data-id="40">Take Tests</h3></div><div className="p-6" data-id="41"><p data-id="42">Students can take scheduled tests online.</p></div></div><div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-id="43" data-v0-t="card"><div className="flex flex-col space-y-1.5 p-6" data-id="44"><h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight" data-id="45">View Results</h3></div><div className="p-6" data-id="46"><p data-id="47">Students can view their test results and performance analysis.</p></div></div></div></section><section id="contact" className="mb-8" data-id="48"><h2 className="text-3xl font-bold mb-4" data-id="49">Contact Us</h2></section></main>
                <Form targetRef={targetRef}/>
                <div className='h-10'></div>
                <footer className="p-4 bg-primary text-white text-center" data-id="65">© 2023 MCQ Test App. All rights reserved.</footer>
            </div>
        // </Helmet>
    )
}