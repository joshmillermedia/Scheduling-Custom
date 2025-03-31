import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import InventoryGrid from '../components/InventoryGrid';

export default function BookingStepTwo() {
  const { formData } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    const { name, phone, date } = formData;
    if (!name || !phone || !date) {
      navigate('/booking'); // protect route
    }
  }, [formData, navigate]);

  return (
    <div className="p-4">
      <h2>Select Your Phone</h2>
      <InventoryGrid formData={formData} />
    </div>
  );
}
