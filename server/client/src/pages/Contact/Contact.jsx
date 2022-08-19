import { Helmet } from "react-helmet";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { AppDownload, Footer, NewsLetter } from "../../components";
import { Link } from "react-router-dom";

const Contact = () => (
  <section className="contact-main">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Contact</title>
    </Helmet>
    <div className="title">
      <div>
        <h2>Contact Us</h2>

        <div className="breadcramp">
          <Link to="/">Home</Link>
          <span className="arrow">{">"}</span>
          <span className="active-page">Blog</span>
        </div>
      </div>
    </div>

    <div className="contact grid container-div section">
      <div className="contact__left">
        <div>
          <h3>Contact Info</h3>
          <p className="contact__left-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="contact__left__box">
          <div>
            <GoLocation />
          </div>
          <p>Dambo dika, USA, orad 123</p>
        </div>
        <div className="contact__left__box">
          <div>
            <AiOutlineMail />
          </div>
          <p>quickshop@gmail.com</p>
        </div>
        <div className="contact__left__box">
          <div>
            <IoCallOutline />
          </div>
          <p>quickshop@gmail.com</p>
        </div>
      </div>
      <div className="contact__right">
        <h3>Keep In Touch With Us</h3>

        <div className="contact__right__form">
          <div className="contact__right__form__detail grid">
            <div>
              <label htmlFor="name">Name*</label>
              <input type="text" name="name" id="name" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="email">Email*</label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
          </div>
          <div>
            <label htmlFor="subject">Subject*</label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject"
            />
          </div>
          <div>
            <label htmlFor="subject">Message*</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="7"
              placeholder="Message"
            ></textarea>
          </div>

          <div>
            <button className="button">Send Message</button>
          </div>
        </div>
      </div>
    </div>

    <NewsLetter />
    <AppDownload />
    <Footer />
  </section>
);

export default Contact;
