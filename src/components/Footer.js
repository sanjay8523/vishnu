// src/components/Footer.js
import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  const categories = [
    { name: "Movies in Bengaluru", href: "#" },
    { name: "Events in Bengaluru", href: "#" },
    { name: "Plays in Bengaluru", href: "#" },
    { name: "Sports Events", href: "#" },
  ];

  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="text-2xl font-black tracking-tighter italic text-red-600 mb-4">
              IT'S SHOW TIME
            </div>
            <p className="text-sm mb-4">
              Your ultimate destination for movies, events, and entertainment
              booking.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-zinc-800 rounded-full hover:bg-red-600 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-800 rounded-full hover:bg-red-600 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-800 rounded-full hover:bg-red-600 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-800 rounded-full hover:bg-red-600 transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-red-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href={cat.href}
                    className="hover:text-red-600 transition-colors text-sm"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>MG Road, Bengaluru, Karnataka 560001</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} />
                <span>+91 80 1234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} />
                <span>support@itsshowtime.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm">
          <p>© 2025 It's Show Time. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
