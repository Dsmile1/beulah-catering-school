
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Programs", path: "/program" },
  { name: "Our Services", path: "/Services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#5F99D8] px-4 sm:px-5 py-3 shadow-md">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img
            src="/Blogo.png"
            alt="Beulah Catering School"
            className="w-28 h-16 sm:w-36 sm:h-20 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 font-bold text-white text-base xl:text-lg">

          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-gray-200 transition ${
                location.pathname === item.path
                  ? "text-yellow-200"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-3xl text-white focus:outline-none"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden absolute top-full left-0 w-full bg-[#5F99D8] shadow-lg border-t border-white/20"
        >
          <div className="flex flex-col px-6 py-5 gap-4 font-bold text-white text-lg">

            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`hover:text-yellow-200 transition ${
                  location.pathname === item.path
                    ? "text-yellow-200"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

          </div>
        </div>
      )}

    </nav>
  );
}
