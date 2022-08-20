import { Helmet } from "react-helmet";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { AppDownload, Footer, NewsLetter } from "../../components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
const Contact = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    subject: "",
    text: "",
    error: "",
    success: "",
  });
  const [loading, setLoading] = useState(false);
  const { username, email, subject, text, error, success } = formdata;
  const { addToast } = useToasts();
  const handleChangeInput = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!username || !email) {
        return setFormdata({
          ...formdata,
          error: "Username or email cannot be empty.",
          success: "",
        });
      }
      if (!subject || !text) {
        return setFormdata({
          ...formdata,
          error: "Subject or text cannot be empty.",
          success: "",
        });
      }
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/message`,
        { username, email, subject, text },
        config
      );
      setLoading(false);
      setFormdata({ ...formdata, success: data.message, error: "" });
    } catch (error) {
      setLoading(false);
      setFormdata({
        ...formdata,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        success: "",
      });
    }
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      setFormdata({
        username: "",
        email: "",
        subject: "",
        text: "",
        error: "",
        success: "",
      });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      setFormdata({
        username: "",
        email: "",
        subject: "",
        text: "",
        error: "",
        success: "",
      });
    }
  }, [error, success, addToast]);
  return (
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
            <span className="active-page">Contact Us</span>
          </div>
        </div>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44337.07194047137!2d-74.02297055858564!3d40.7648841925082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ad18bdf7ab%3A0x74c598e39ea9002a!2sNew%20York%2C%20NY%2010018%2C%20USA!5e0!3m2!1sen!2sbd!4v1654160773420!5m2!1sen!2sbd"
          width="100%"
          height="600px"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
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
            <p>Dhaka, Bangladesh</p>
          </div>
          <div className="contact__left__box">
            <div>
              <AiOutlineMail />
            </div>
            <p>mdsahadathossin778@gmail.com</p>
          </div>
          <div className="contact__left__box">
            <div>
              <IoCallOutline />
            </div>
            <p>(+88) 01836855666</p>
          </div>
        </div>
        <div className="contact__right">
          <h3>Keep In Touch With Us</h3>

          <form className="contact__right__form" onSubmit={handleSubmit}>
            <div className="contact__right__form__detail grid">
              <div>
                <label htmlFor="name">Name*</label>
                <input
                  onChange={handleChangeInput}
                  type="text"
                  name="username"
                  value={username}
                  id="name"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChangeInput}
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject">Subject*</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={subject}
                onChange={handleChangeInput}
                placeholder="Subject"
              />
            </div>
            <div>
              <label htmlFor="subject">Message*</label>
              <textarea
                name="text"
                id="message"
                cols="30"
                rows="7"
                placeholder="Message"
                value={text}
                onChange={handleChangeInput}
              ></textarea>
            </div>

            <div>
              <button type="submit" className="button">
                {loading ? "Loading.." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <NewsLetter />
      <AppDownload />
      <Footer />
    </section>
  );
};

export default Contact;
