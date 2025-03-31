import { Routes, Route } from 'react-router-dom';
import BookingStepOne from './pages/BookingStepOne';
import BookingStepTwo from './pages/BookingStepTwo';

export default function App() {
  return (
    <Routes>
      <Route path="/booking" element={<BookingStepOne />} />
      <Route path="/booking/select" element={<BookingStepTwo />} />
    </Routes>
  );
}
