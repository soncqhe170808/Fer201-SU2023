import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Screen/HomePage';
import PersonalProfile from './Screen/PersonalProfile';
import Register from './Screen/Register';
import Login from './Component/Auth';
import ApplicationList from './Screen/ApplicationList';
import ProceedApplication from './Screen/ProceedApplication';
import JobData from './Screen/JobData';
import JobDetails from './Screen/JobDetails';
import ProceedJobPost from './Screen/ProceedJobPost';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9999/JobPost')
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PersonalProfile" element={<PersonalProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/JobData" element={<JobData />} />
        <Route
          path="/JobDetails/:jobId"
          element={<JobDetails jobs={jobs} />} 
        />
        <Route path='/ProceedJobPost' element={<ProceedJobPost/>}/>
        <Route path="/ApplicationList/:JobId" element={<ApplicationList />} />
        <Route path="/ProceedApplication/:ApplicationId" element={<ProceedApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
