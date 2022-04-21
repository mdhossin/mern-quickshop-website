import React, { useEffect, useState } from "react";

import { animateScroll } from "react-scroll";
import { AiFillInstagram } from "react-icons/ai";
import {
  BsChevronDoubleUp,
  BsFacebook,
  BsPinterest,
  BsTwitter,
} from "react-icons/bs";
import { logo } from "../../../assets";
const Footer = () => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <footer className="footer section">
      <div className="footer__container container-div grid">
        <div className="footer__content">
          <a href="#home" className="footer__logo">
            <img width="90" src={logo} alt="shop" />
          </a>
          <p className="footer__description">
            259 Princess Road, London, NW18JR, UK
          </p>
          <p className="footer__description">quickshop@gmail.com</p>
          <p className="footer__description">(+036) 912-3548-073</p>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Help</h3>
          <ul className="footer__links">
            <li>
              <a href="#home" className="footer__link">
                Help
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Feedback
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Unsubscribe
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Reservations
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Company</h3>
          <ul className="footer__links">
            <li>
              <a href="#home" className="footer__link">
                Gadgets
              </a>
            </li>

            <li>
              <a href="#home" className="footer__link">
                Games & Controller
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Headphones
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Laptops & Computers
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Smartphones & Tablets
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Categories</h3>
          <ul className="footer__links">
            <li>
              <a href="#home" className="footer__link">
                Laptops & Computers
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Gadgets
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Games & Controller
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Shipping
              </a>
            </li>
            <li>
              <a href="#home" className="footer__link">
                Headpones
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">Social</h3>
          <ul className="footer__social">
            <li>
              <a href="https://www.facebook.com/">
                <BsFacebook />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <AiFillInstagram />
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com/">
                <BsPinterest />
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com/">
                <BsTwitter />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer__copyright">
        &copy; QuickShop. All Right Reserved 2022
      </p>

      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <BsChevronDoubleUp />
      </button>
    </footer>
  );
};

export default Footer;
