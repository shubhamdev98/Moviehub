import React from "react";

function Navbar({ setquery }) {
  function handleSetQuery(e) {
    setquery(e.target.value);
  }
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-8" src="/logo.jpg" alt="Logo" />
            <span className="text-white text-lg font-semibold ml-2">
              Movie Site
            </span>
          </div>
          <div className="bg-yellow-200 w-2/5">
            <input
              type="search"
              className="p-2 border-none outline-none  w-full"
              onChange={(e) => handleSetQuery(e)}
            />
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="/movies" className="text-white hover:text-gray-300">
              Movies
            </a>
            <a href="/tv-shows" className="text-white hover:text-gray-300">
              TV Shows
            </a>
            <a href="/favorites" className="text-white hover:text-gray-300">
              Favorites
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
