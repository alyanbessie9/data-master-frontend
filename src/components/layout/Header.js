// src/components/layout/Header.js

import React from "react";

const Header = ({ onLogout }) => {
  return (
    <header className="h-16 bg-gray-200 text-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">My Application</h1>
      </div>

      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
