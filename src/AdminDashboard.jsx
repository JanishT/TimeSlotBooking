import React from 'react';

const AdminDashboard = ({ bookedSlots, onSlotStatusUpdate }) => {
  const updateSlotStatus = (bookingId, newStatus) => {
    // Update the status of a booked slot
    const updatedBookedSlots = bookedSlots.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    // Pass the updated booked slots back to the parent component
    onSlotStatusUpdate(updatedBookedSlots);
  };

  return (
    <div>
      <h2>Welcome to the Admin Dashboard!</h2>
      <h3>Booked Slots</h3>
      {bookedSlots && bookedSlots.length > 0 ? (
        bookedSlots.map((booking) => (
          <div key={booking.id}>
            <p>Slot ID: {booking.slotId}</p>
            <p>Status: {booking.status}</p>
            {/* Add a dropdown or buttons to update the status */}
            <select
              value={booking.status}
              onChange={(e) => updateSlotStatus(booking.id, e.target.value)}
            >
              <option value="Booked">Booked</option>
              <option value="Available">Available</option>
              {/* Add more options as needed */}
            </select>
          </div>
        ))
      ) : (
        <p>No booked slots available.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
