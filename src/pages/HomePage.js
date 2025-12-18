// src/pages/HomePage.js
import React from "react";
import {
  ChevronRight,
  Sparkles,
  Film,
  Calendar,
  TrendingUp,
} from "lucide-react";
import MovieCard from "../components/MovieCard";
import EventCard from "../components/EventCard";
import { MOVIES, EVENTS } from "../data/moviesData";

export default function HomePage({ navigateTo, searchQuery }) {
  const filteredMovies = MOVIES.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nowShowingMovies = filteredMovies.filter(
    (m) => m.category === "now-showing"
  );
  const sandalwoodMovies = filteredMovies.filter(
    (m) => m.category === "sandalwood"
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-yellow-400" />
                <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                  PREMIERE OF THE WEEK
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
                KALKI
                <br />
                2898 AD
              </h1>
              <p className="text-lg mb-6 text-white/90 max-w-md">
                A modern sci-fi masterpiece blending mythology and futuristic
                action. Experience the epic saga on the big screen.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigateTo("booking", MOVIES[0])}
                  className="bg-white text-black px-10 py-4 rounded-full font-black flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  BOOK NOW
                  <ChevronRight />
                </button>
                <button className="bg-white/20 backdrop-blur-md px-10 py-4 rounded-full font-black hover:bg-white/30 transition-colors">
                  WATCH TRAILER
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src={MOVIES[0].image}
                alt="Kalki 2898 AD"
                className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black text-2xl shadow-xl">
                ⭐ {MOVIES[0].rating}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Now Showing */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-red-600" size={28} />
              <h2 className="text-3xl font-black text-black dark:text-white">
                NOW SHOWING
              </h2>
            </div>
            <button
              onClick={() => navigateTo("movies")}
              className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              VIEW ALL <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {nowShowingMovies.slice(0, 5).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => navigateTo("booking", movie)}
              />
            ))}
          </div>
        </section>

        {/* Sandalwood Special */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Film className="text-amber-600" size={28} />
              <h2 className="text-3xl font-black text-black dark:text-white">
                SANDALWOOD SPECIAL
              </h2>
            </div>
            <button
              onClick={() => navigateTo("movies")}
              className="text-amber-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              VIEW ALL <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sandalwoodMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => navigateTo("booking", movie)}
                highlight
              />
            ))}
          </div>
        </section>

        {/* Events */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="text-purple-600" size={28} />
              <h2 className="text-3xl font-black text-black dark:text-white">
                UPCOMING EVENTS
              </h2>
            </div>
            <button
              onClick={() => navigateTo("events")}
              className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              VIEW ALL <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {EVENTS.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => {}} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-500 to-red-700 p-8 rounded-3xl text-white">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-2xl font-black mb-2">Book Tickets</h3>
            <p className="text-white/90">
              Reserve your seats in advance for the latest movies and events
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-3xl text-white">
            <div className="text-4xl mb-4">🍿</div>
            <h3 className="text-2xl font-black mb-2">Order Snacks</h3>
            <p className="text-white/90">
              Pre-order your favorite snacks and skip the queue
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-3xl text-white">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-2xl font-black mb-2">Easy Payment</h3>
            <p className="text-white/90">
              Multiple payment options for a seamless checkout experience
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
