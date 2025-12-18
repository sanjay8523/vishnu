// src/App.js
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import TicketsPage from "./pages/TicketsPage";
import MoviesPage from "./pages/MoviesPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
import { SEAT_TYPES, SNACKS } from "./data/moviesData";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [snackCart, setSnackCart] = useState({});
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigateTo = (page, movie = null) => {
    setCurrentPage(page);
    if (movie) setSelectedMovie(movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookingComplete = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const seatTotal = selectedSeats.reduce(
      (sum, seat) => sum + SEAT_TYPES[seat.type].price,
      0
    );
    const snackTotal = Object.entries(snackCart).reduce((sum, [id, qty]) => {
      const snack = SNACKS.find((s) => s.id === parseInt(id));
      return sum + (snack ? snack.price * qty : 0);
    }, 0);
    const convenienceFee = seatTotal * 0.1;
    const gst = (seatTotal + snackTotal + convenienceFee) * 0.18;
    const total = seatTotal + snackTotal + convenienceFee + gst;

    const newBooking = {
      id: Math.floor(100000 + Math.random() * 900000),
      movie: selectedMovie,
      seats: [...selectedSeats],
      total: total,
      date: "Dec 20, 2025",
      time: "07:30 PM",
    };

    setBookings([newBooking, ...bookings]);
    setSelectedSeats([]);
    setSnackCart({});
    setCurrentPage("tickets");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          setShowAuthModal={setShowAuthModal}
          navigateTo={navigateTo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentPage={currentPage}
        />

        <main>
          {currentPage === "home" && (
            <HomePage navigateTo={navigateTo} searchQuery={searchQuery} />
          )}

          {currentPage === "movies" && (
            <MoviesPage navigateTo={navigateTo} searchQuery={searchQuery} />
          )}

          {currentPage === "events" && <EventsPage searchQuery={searchQuery} />}

          {currentPage === "booking" && selectedMovie && (
            <BookingPage
              movie={selectedMovie}
              navigateTo={navigateTo}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              snackCart={snackCart}
              setSnackCart={setSnackCart}
              onBook={handleBookingComplete}
              user={user}
              setShowAuthModal={setShowAuthModal}
            />
          )}

          {currentPage === "tickets" && <TicketsPage bookings={bookings} />}

          {currentPage === "profile" && user && (
            <ProfilePage
              user={user}
              setUser={setUser}
              bookings={bookings}
              navigateTo={navigateTo}
            />
          )}
        </main>

        <Footer />

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            setUser={setUser}
          />
        )}
      </div>
    </div>
  );
}
