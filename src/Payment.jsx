import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Payment.css';
import { useAppContext } from './context/AppContext';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSlot = location.state?.selectedSlot;
  const { setPaymentDetails, paymentDetails } = useAppContext();

  const hairStyles = [
    require('./Assets/hairstyles/style1.jpg'),
    require('./Assets/hairstyles/style2.jpg'),
    require('./Assets/hairstyles/style3.jpg'),
  ];

  const [slideSettings, setSlideSettings] = useState({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // This will log the updated paymentDetails when it changes
    console.log('Payment details:', paymentDetails);
  }, [paymentDetails]);

  const handlePayment = () => {
    const paymentSuccessful = true;

    if (paymentSuccessful) {
      const processingToastId = toast.info('Processing payment...', { position: toast.POSITION.TOP_CENTER });
      const randomTimeout = Math.floor(Math.random() * (5000 - 2000 + 1) + 2000);
      setTimeout(() => {
        toast.dismiss(processingToastId);
        toast.success('Payment successful!', { position: toast.POSITION.TOP_CENTER });
        const paymentDetailsData = {
          barberName: selectedSlot.barberName,
          time: selectedSlot.time,
          name: userName,
          phoneNumber: phoneNumber,
        };
        localStorage.setItem('paymentDetails', JSON.stringify(paymentDetailsData));

        setPaymentDetails(paymentDetailsData);
      }, randomTimeout);
      // navigate('/AdminDashboard');
      console.log('Payment details set:', paymentDetails);
    } else {
      toast.error('Payment failed. Please try again.', { position: toast.POSITION.TOP_CENTER });
    }
  };

  const handleCancel = () => {
    toast.error('Payment cancelled.', { position: toast.POSITION.TOP_CENTER });
  };

  const handleLogout = () => {
    localStorage.removeItem("current");
    navigate('/');
    console.log('User logged out');
  };
  return (
    <div className="payment-popup">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h3>Select Payment Option</h3>
      {selectedSlot && (
        <div>
          <p>Barber Name: {selectedSlot.barberName}</p>
          <p>Time: {selectedSlot.time}</p>
          {/* Other Payment component content... */}
        </div>
      )}
      <span>Select Styles</span>
      <Slider {...slideSettings} className='sliders'>
        {hairStyles.map((style, index) => (
          <div key={index}>
            <img src={style} alt={`Haircut Styles ${index + 1}`} className='haircut-image' />
          </div>
        ))}
      </Slider>
      <div className='inputsfiels'>
        <input type="text" placeholder="name" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input type="number" placeholder="phonenumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button onClick={handlePayment}>Pay Now</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Payment;
