import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function BookingStepOne() {
  const { formData, setFormData } = useBooking();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, date } = formData;
    if (name && phone && date) {
      navigate('/booking/select');
    } else {
      alert('Please fill all required fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input name="email" placeholder="Email (optional)" value={formData.email} onChange={handleChange} />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <button type="submit">Next</button>
    </form>
  );
}
