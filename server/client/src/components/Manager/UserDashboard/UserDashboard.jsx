import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const AdminDashboard = () => (
  <>
    <Sidebar />
    <div className="main">
      <div className="main__content">
        {/* used nested route data show here */}
        <Outlet />
      </div>
    </div>
  </>
);

export default AdminDashboard;
