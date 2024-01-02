import React from 'react'
import { useAppContext } from './context/AppContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { setPaymentDetails,paymentDetails } = useAppContext();
  console.log('Payment details received:', paymentDetails);

  const currentUser = localStorage.getItem('current');
  const isAdmin = currentUser === 'admin@gmail.com';

  // Retrieve payment details from local storage on component mount
  React.useEffect(() => {
    const storedPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails')) || [];
    setPaymentDetails(storedPaymentDetails);
  }, [setPaymentDetails]);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return (
    <div>
      <h2>Admin Page</h2>
      {paymentDetails && (
        <div>
          <p>Barber Name: {paymentDetails.barberName}</p>
          <p>Time: {paymentDetails.time}</p>
          <p>User Name: {paymentDetails.name}</p>
          <p>Phone Number: {paymentDetails.phoneNumber}</p>
          {/* Other admin page content... */}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard