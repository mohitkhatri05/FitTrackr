import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Workout Tracker", path: "/workouts", icon: "💪" },
    { name: "Blog", path: "/blog", icon: "📝" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <div className="w-60 h-screen bg-gray-900 text-white fixed top-0 left-0">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        FitTrackr
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg text-lg transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
