import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home"; // Adjusted path for Home component
// import Dashboard from "../../pages/Dashboard"; <Route path="/Dashboard" element={<Dashboard />} />
import Schedule from "../../pages/Schedule"; // Adjusted path for Schedule component
import Students from "../../pages/Students"; // Adjusted path for students component
import Courses from "../../pages/Courses"; // Adjusted path for courses component
import Settings from "../../pages/Settings"; // Adjusted path for Settings component

function MainContent() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path="/schedule" element={<Schedule />} />
      <Route path="/students" element={<Students />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default MainContent;
