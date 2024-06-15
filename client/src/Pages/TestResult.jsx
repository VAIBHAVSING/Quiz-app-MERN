import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Component/Navbar';
import { Button } from '../Component/Button';

function TestAttempteduser({ data, totalMarks, testid }) {
  const navigate=useNavigate();
  const handleDeleteRecord = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_APILINK}/admin/deletetestrecord`, {
        testid: testid,
          email: data.email
      }, {headers: {
        Authorization: localStorage.getItem('admintoken')
      }}
    );
    if(response.status==200){
      window.location.reload();
    }
      // Handle successful deletion
    } catch (error) {
      console.error('Error deleting test record:', error);
      // Handle error
    }
  };

  return (
    <div className='flex justify-around bg-primary xl:my-2 rounded-xl'>
      <div className='font-bold flex'>
        <div>
          <div>Name: {data.name}</div>
          <div>Email: {data.email}</div>
          <div>Marks: {data.marks}</div>
          <div>Total Marks: {totalMarks}</div>
          <div>Percentage: {(data.marks / totalMarks) * 100}%</div>
        </div>
      </div>
      <div>
        <div className='m-2'>
          <Button label={"delete test record"} onClick={handleDeleteRecord} />
        </div>
        <div className='m-2'>
          <Button label={"view Test"} onClick={()=>{
            navigate(`/admin/viewTestResult/${testid}:+:${data.email}`)
          }}/>
        </div>
      </div>
    </div>
  );
}

export const TestResult = () => {
  const { testId } = useParams();
  const [chartData, setChartData] = useState([]);
  const [totalMarks, setTotalMarks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_APILINK}/admin/Testresult/${testId}`);
        setTotalMarks(response.data.totalmarks);
        setChartData(response.data.studentmarks);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchData();
  }, [testId]);

  return (
    <div>
      <Navbar token={'admintoken'} />
      <br />
      <div className='text-center mb-5'>Student Marks Line Chart</div>
      <div className='flex justify-center'>
        <LineChart
          width={1000}
          height={600}
          data={chartData}
          className='xl:items-center bg-black border-2 rounded-2xl -z-10'
        >
          <XAxis dataKey="name" type="category" label={{ value: 'Students', position: 'insideBottomRight', offset: 0 }} />
          <YAxis dataKey="marks" type="number" label={{ value: 'Marks', angle: -90, position: 'insideLeft' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="marks" stroke="#65EC36" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
      <div className='xl:mx-48'>
        {chartData.map((studentData, index) => (
          <TestAttempteduser key={index} data={studentData} totalMarks={totalMarks} testid={testId} />
        ))}
      </div>
    </div>
  );
};
