// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoomList from './RoomList';
import TimeSlots from './TimeSlots';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import Payment from './Payment';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/roomlist' element={<RoomList/>} />
      <Route path='/time-slots/:roomId' element={<TimeSlots/>} />
      <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
      <Route path='/Payment' element={<Payment/>}/>
    </Routes>
  
  );
}

export default App;
