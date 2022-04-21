import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { Helmet } from "react-helmet";
const UserDashboard = () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Dashboard</title>
    </Helmet>
    <Sidebar />
    <div className="main">
      <div className="main__content">
        {/* used nested route data show here */}
        <Outlet />
      </div>
    </div>
  </>
);

export default UserDashboard;
