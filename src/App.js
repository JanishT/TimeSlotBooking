// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoomList from './RoomList';
import TimeSlots from './TimeSlots';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import Payment from './Payment';
import { AppProvider  } from './context/AppContext';

function App() {

  return (
    <AppProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/roomlist' element={<RoomList/>} />
      <Route path='/time-slots/:roomId' element={<TimeSlots/>} />
      <Route path='/Payment' element={<Payment/>}/>
      <Route path='/AdminDashboard' element={<AdminDashboard/>}/>      
    </Routes>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
