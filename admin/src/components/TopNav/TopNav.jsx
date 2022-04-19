import React from "react";
import UserInfo from "../UserInfo/UserInfo";

import { data } from "../../constants";
import { useSelector } from "react-redux";
const TopNav = () => {
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;
  console.log(userInfo);
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
  };

  return (
    <div className="topNav">
      <UserInfo userInfo={userInfo}></UserInfo>
      <div className="sidebar-toggle" onClick={openSidebar}>
        <i className="bx bx-menu-alt-right"></i>
      </div>
    </div>
  );
};

export default TopNav;
