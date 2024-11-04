// src/components/LoginForm.js

import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [npm, setNPM] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!npm || !password) {
      alert("NPM and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ npm, password }),
      });

      const data = await response.json();
      console.log("Received data:", data); // Log received data

      if (response.ok) {
        console.log("Login successful:", data);
        onLogin(data.user); // Pass user data (including npm and nama) to the parent component
      } else if (response.status === 401) {
        alert("Invalid NPM or password");
      } else {
        alert("Internal server error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="NPM"
        value={npm}
        onChange={(e) => setNPM(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
