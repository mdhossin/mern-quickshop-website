import React from "react";
import "./MainLayout.scss";
import SideBar from "../components/Sidebar/SideBar";
import TopNav from "../components/TopNav/TopNav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <SideBar />
      <div className="main">
        <div className="main__content">
          <TopNav />
          {/* used nested route data show here */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
