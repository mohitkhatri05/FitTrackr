import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 flex-1 bg-amber-300 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
