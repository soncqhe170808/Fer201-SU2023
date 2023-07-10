import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Screen/HomePage';
import PersonalProfile from './Screen/PersonalProfile';
import Register from './Screen/Register';
import Login from './Component/Auth';
import ApplicationList from './Screen/ApplicationList';
import ProceedApplication from './Screen/ProceedApplication';
import JobData from './Screen/JobData';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/PersonalProfile' element={<PersonalProfile/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/JobData' element={<JobData/>}/>
      <Route path='/ApplicationList/:JobId' element={<ApplicationList/>}/>
      <Route path='/ProceedApplication/:ApplicationId' element={<ProceedApplication/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
