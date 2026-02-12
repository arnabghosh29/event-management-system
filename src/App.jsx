
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header'
import Navbar from './components/Navbar'
import Card from './components/Card';
import EventCarousel from './components/Slider';
import Booking from './components/Booking';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import EventList from './components/EventList';
import EventPage from './components/EventList';
import ProfilePage from './components/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AllEvent from './components/AllEvent';
import SingleEvent from './components/SingleEvent';
import AllBookings from './components/AllBookings';
import TicketPage from "./components/TicketPage";
import { AuthProvider } from "./context/AuthContext";
import AllBookingsPage from "./components/AllBookingsPage";
import SearchPage from "./components/SearchPage"
import BookTicket from "./components/BookTicket";
import Footer from './components/Footer';

function App() {


  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<AllEvent />} />
            <Route path="/event/:id" element={<SingleEvent />} />
            <Route path="/bookings" element={<AllBookings />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route path="/allbookings" element={<AllBookingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book/:id" element={<BookTicket />} />

          </Routes>
        </Router>
        <Footer />
        {/* <RegisterPage />
      <EventPage /> */}
      </AuthProvider>
    </>
  )
}

export default App


