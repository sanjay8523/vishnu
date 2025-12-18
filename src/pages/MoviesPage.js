// src/pages/MoviesPage.js
import React, { useState } from "react";
import { Film, Filter } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { MOVIES } from "../data/moviesData";

export default function MoviesPage({ navigateTo, searchQuery }) {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const genres = [
    "all",
    ...new Set(MOVIES.flatMap((m) => m.genre.split(", "))),
  ];
  const languages = ["all", ...new Set(MOVIES.map((m) => m.language))];

  const filteredMovies = MOVIES.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || movie.genre.includes(selectedGenre);
    const matchesLanguage =
      selectedLanguage === "all" || movie.language === selectedLanguage;
    return matchesSearch && matchesGenre && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Film className="text-red-600" size={32} />
          <h1 className="text-3xl font-black text-black dark:text-white">
            All Movies
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-red-600" size={20} />
            <h2 className="text-xl font-black text-black dark:text-white">
              Filters
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Genre Filter */}
            <div>
              <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 mb-2 block">
                Genre
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                      selectedGenre === genre
                        ? "bg-red-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 mb-2 block">
                Language
              </label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                      selectedLanguage === lang
                        ? "bg-red-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-zinc-600 dark:text-zinc-400">
            Showing {filteredMovies.length}{" "}
            {filteredMovies.length === 1 ? "movie" : "movies"}
          </p>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <Film
              size={64}
              className="mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
            />
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">
              No Movies Found
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => navigateTo("booking", movie)}
                highlight={movie.category === "sandalwood"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
