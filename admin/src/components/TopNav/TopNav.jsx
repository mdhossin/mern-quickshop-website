import UserInfo from "../UserInfo/UserInfo";
import { BiMenuAltRight } from "react-icons/bi";
import { useSelector } from "react-redux";
const TopNav = () => {
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
  };

  return (
    <div className="topNav">
      <UserInfo userInfo={userInfo}></UserInfo>
      <div className="sidebar-toggle" onClick={openSidebar}>
        <BiMenuAltRight />
      </div>
    </div>
  );
};

export default TopNav;
