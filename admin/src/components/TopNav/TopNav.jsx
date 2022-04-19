import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import "./TopNav.scss";
import { data } from "../../constants";
const TopNav = () => {
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
  };

  return (
    <div className="topNav">
      <UserInfo user={data.user}></UserInfo>
      <div className="sidebar-toggle" onClick={openSidebar}>
        <i className="bx bx-menu-alt-right"></i>
      </div>
    </div>
  );
};

export default TopNav;
