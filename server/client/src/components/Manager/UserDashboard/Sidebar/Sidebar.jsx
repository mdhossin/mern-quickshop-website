import React, { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { BiLogOutCircle, BiShoppingBag, BiGridAlt } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { logout } from "../../../../redux/actions/userActions";
import { USER_LOGOUT_RESET } from "../../../../redux/constants/userConstants";

const Sidebar = () => {
  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const width = navbarState ? "60%" : "0%";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const logoutUser = useSelector((state) => state.userLogout);
  const { userLogout, error } = logoutUser;

  const handleLogout = () => {
    if (!userInfo?.access_token) return;
    dispatch(logout(userInfo?.access_token));
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: USER_LOGOUT_RESET });
      // addToast(error, { appearance: "error", autoDismiss: true });
    } else if (userLogout) {
      dispatch({ type: USER_LOGOUT_RESET });

      // addToast(userLogout?.message, {
      //   appearance: "success",
      //   autoDismiss: true,
      // });

      navigate("/");
    }
  }, [userLogout, error, addToast, dispatch, navigate]);

  return (
    <>
      <section className="sidebar">
        <div className="top">
          <div className="brand">
            <span>
              <BiGridAlt />
            </span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <AiOutlineMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="links">
            <ul>
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => setCurrentLink(1)}
              >
                <Link to="/dashboard">
                  <BsPerson />
                  <span> Profile</span>
                </Link>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
                <Link to="/dashboard/myorders">
                  <BiShoppingBag />
                  <span> My Orders</span>
                </Link>
              </li>

              <li className="userLogout" onClick={handleLogout}>
                <BiLogOutCircle />
                <span> Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div
        // state={navbarState}
        className={"responsive " + (navbarState && "show")}
        style={{ width: width }}
      >
        <div className="responsive__links">
          <ul>
            <li
              className={currentLink === 1 ? "active" : "none"}
              onClick={() => setCurrentLink(1)}
            >
              <Link to="/dashboard" onClick={() => setNavbarState(false)}>
                <BsPerson />
                <span> Profile</span>
              </Link>
            </li>
            <li
              className={currentLink === 2 ? "active" : "none"}
              onClick={() => setCurrentLink(2)}
            >
              <Link
                to="/dashboard/myorders"
                onClick={() => setNavbarState(false)}
              >
                <BiShoppingBag />
                <span> My Orders</span>
              </Link>
            </li>

            <li
              className="userLogout"
              onClick={(() => setNavbarState(false), handleLogout)}
            >
              <BiLogOutCircle />
              <span> Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
