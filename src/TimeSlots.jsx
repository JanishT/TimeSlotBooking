import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Timeslot.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from './context/AppContext';
import Payment from './Payment';

function TimeSlots() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const {adminStatus} = useAppContext();
  
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState(() => {
    const savedBookedSlots = localStorage.getItem(`bookedSlots-for-room${roomId}`);
    return savedBookedSlots ? JSON.parse(savedBookedSlots) : [];
  });

  useEffect(() => {
    if (!localStorage.getItem("current")) {
      toast.error("You are not signed in!");
      navigate('/');
    }
  }, []);

  useEffect(() => {
    // Fetch or load barbers data based on roomId
    const simulatedBarbers = [
      { id: 1, name: 'Janish' },
      { id: 2, name: 'Janu' },
    ];
    setBarbers(simulatedBarbers);
  }, [roomId]);

  useEffect(() => {
    // Fetch or load time slots data based on roomId
    const simulatedTimeSlots = [
      { id: 1, barberId: 1, time: '9:00 AM - 9:30 AM', status: 'Available', slotAdmin: '' },
      { id: 2, barberId: 1, time: '9:30 AM - 10:00 AM', status: 'Available', slotAdmin: '' },
      { id: 3, barberId: 2, time: '9:00 AM - 9:30 AM', status: 'Available', slotAdmin: '' },
      { id: 4, barberId: 2, time: '9:30 AM - 10:00 AM', status: 'Available', slotAdmin: '' },
      { id: 5, barberId: 2, time: '10:00 AM - 10:30 AM', status: 'Available', slotAdmin: '' },
    ];

    if (timeSlots.length === 0) {
      setTimeSlots(simulatedTimeSlots);
    }
  }, [roomId]);

  const handleBookSlot = (slotId) => {
    const isBooked = bookedSlots.includes(slotId);
  const currentUser = localStorage.getItem("current");
  
  // Find the slot with the given slotId
  const slot = timeSlots.find((slot) => slot.id === slotId);

  if (!isBooked) {
    setBookedSlots([...bookedSlots, slotId]);
    const updatedSlots = timeSlots.map((slot) =>
      slot.id === slotId ? { ...slot, status: 'Booked', slotAdmin: currentUser } : slot
    );
    setTimeSlots(updatedSlots);

    const selectedSlotInfo = {
      barberName: barbers.find((barber) => barber.id === slot.barberId)?.name,
      time: slot.time,
    };
    setSelectedSlot(selectedSlotInfo);
      navigate('/Payment',{ state: { selectedSlot: selectedSlotInfo } });
    } else {
      setSelectedSlot(null);
      const validAdmin = slot?.slotAdmin;
      if (currentUser === validAdmin) {
        const updatedBookedSlots = bookedSlots.filter((id) => id !== slotId);
        setBookedSlots(updatedBookedSlots);
        const updatedSlots = timeSlots.map((slot) =>
          slot.id === slotId ? { ...slot, status: 'Available', slotAdmin: '' } : slot
        );
        setTimeSlots(updatedSlots);
      }
    }
  };
  

  useEffect(() => {
    localStorage.setItem(`bookedSlots-for-room${roomId}`, JSON.stringify(bookedSlots));
  }, [roomId, bookedSlots]);

  useEffect(() => {
    localStorage.setItem(`timeslotsforroom${roomId}`, JSON.stringify(timeSlots));
  }, [roomId, timeSlots]);

  const handleLogout = () => {
    localStorage.removeItem("current");
    navigate('/');
    console.log('User logged out');
  };

  return (
    <div className='slot-main-container'>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Time Slots for Room {roomId}</h2>
      {barbers.map((barber) => (
        <div key={barber.id}>
          <h3>{barber.name}</h3>
          <div className="time-slot-container">
            {timeSlots.map((slot) => (
              slot.barberId === barber.id && (
                <div
                  className={
                    slot.slotAdmin && slot.slotAdmin !== localStorage.getItem("current")
                      ? "time-slot-card disabled-div"
                      : `time-slot-card ${slot.status}`
                  }
                  key={slot.id}
                >
                  <h4>{slot.time}</h4>
                  <p>Status: {slot.status}</p>
                  {(slot.slotAdmin === '' || slot.slotAdmin === localStorage.getItem("current")) && (
                    <button
                      className={slot.status === 'Booked' ? "red" : ""}
                      onClick={() => handleBookSlot(slot.id)}
                    >
                      
                      {bookedSlots.includes(slot.id) ? 'Cancel Booking' : 'Book Slot'}

                      {selectedSlot && <Payment selectedSlot={selectedSlot} />}
                    </button>
                    
                    
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimeSlots;


