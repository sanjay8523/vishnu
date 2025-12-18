// src/components/EventCard.js
import React from "react";
import { Calendar, MapPin, Tag } from "lucide-react";

export default function EventCard({ event, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1 rounded-full">
          <span className="text-white text-xs font-bold">{event.type}</span>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
            <Calendar size={16} className="text-white mb-1" />
            <p className="text-white font-bold text-sm">{event.date}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-black text-lg mb-2 text-black dark:text-white group-hover:text-purple-600 transition-colors">
          {event.title}
        </h3>

        {event.venue && (
          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mb-2">
            <MapPin size={14} />
            <span>{event.venue}</span>
          </div>
        )}

        {event.price && (
          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mb-3">
            <Tag size={14} />
            <span>Starting from ₹{event.price}</span>
          </div>
        )}

        {event.description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-3 line-clamp-2">
            {event.description}
          </p>
        )}

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-bold text-sm transition-colors">
          GET TICKETS
        </button>
      </div>
    </div>
  );
}
