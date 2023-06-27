import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Screen/HomePage';
import PersonalProfile from './Screen/PersonalProfile';
import Register from './Screen/Register';
import Login from './Component/Auth';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/PersonalProfile' element={<PersonalProfile/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
