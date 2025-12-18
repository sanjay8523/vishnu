// src/components/MovieCard.js
import React from "react";
import { Star, Clock, Film } from "lucide-react";

export default function MovieCard({ movie, onClick, highlight }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group relative ${
        highlight
          ? "p-1 rounded-[30px] bg-gradient-to-tr from-amber-500 via-red-600 to-purple-600"
          : ""
      }`}
    >
      <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-bold">{movie.rating}</span>
          </div>

          {/* Language Badge */}
          <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded-full">
            <span className="text-white text-xs font-bold">
              {movie.language}
            </span>
          </div>

          {/* Hover Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold">
              BOOK NOW
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-black text-lg mb-1 text-black dark:text-white group-hover:text-red-600 transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
            {movie.genre}
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
            <Clock size={14} />
            <span>{movie.duration}</span>
          </div>
          {movie.cast && (
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 line-clamp-1">
              <Film size={14} className="inline mr-1" />
              {movie.cast}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
