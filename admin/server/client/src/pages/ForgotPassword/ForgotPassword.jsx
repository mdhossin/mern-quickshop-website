import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { isEmail } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    error: "",
    success: "",
  });

  const { addToast } = useToasts();
  const { email, error, success } = data;
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, error: "Invalid emails.", success: "" });

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/user/forgot_password`, {
        email,
      });
      setLoading(false);
      setData({ ...data, error: "", success: res.data.message });
    } catch (error) {
      setLoading(false);
      error.response.data.message &&
        setData({
          ...data,
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
      setData({
        email: "",
        error: "",
        success: "",
      });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      setData({
        email: "",
        error: "",
        success: "",
      });
    }
  }, [error, success, addToast]);
  return (
    <section className="login-section forgot">
      <div className="login container-div">
        <h3 className="login__title">Forgot your password?</h3>
        <p>We will send you an email to reset your password.</p>
        <form className="login__form">
          <div>
            <input
              className="login__form__input"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
              placeholder="Your email"
            />
          </div>

          <div>
            <button
              className="login__form__submit"
              type="button"
              onClick={forgotPassword}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Verify your email"
              )}
            </button>
            <button className="button" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
