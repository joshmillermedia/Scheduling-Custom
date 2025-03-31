import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('bookingForm');
    return saved ? JSON.parse(saved) : {
      name: '',
      phone: '',
      email: '',
      date: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('bookingForm', JSON.stringify(formData));
  }, [formData]);

  return (
    <BookingContext.Provider value={{ formData, setFormData }}>
      {children}
    </BookingContext.Provider>
  );
};
