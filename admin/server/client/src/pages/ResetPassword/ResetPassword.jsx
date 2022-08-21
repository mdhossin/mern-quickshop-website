import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import { checkPassword, isLength } from "../../utils/validation";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { BASE_URL } from "../../config";
const ResetPassword = () => {
  const [data, setData] = useState({
    password: "",
    cf_password: "",
    error: "",
    success: "",
  });
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const { addToast } = useToasts();

  const { password, cf_password, error, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        error: "Password must be at least 6 characters.",
        success: "",
      });

    if (checkPassword(password, cf_password))
      return setData({
        ...data,
        error: "Password did not match.",
        success: "",
      });

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/user/reset`,
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);

      setData({ ...data, error: "", success: res.data.message });
    } catch (error) {
      setLoading(false);
      error.response &&
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
        password: "",
        cf_password: "",
        error: "",
        success: "",
      });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      setData({
        password: "",
        cf_password: "",
        error: "",
        success: "",
      });
    }
  }, [error, success, addToast]);

  return (
    <section className="login-section">
      <div className="login container-div">
        <h3 className="login__title">Reset Your Password</h3>
        <form className="login__form">
          <div className="pass">
            <input
              className="login__form__input"
              type={typePass ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={handleChangeInput}
              placeholder="New password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>
          <div className="pass">
            <input
              className="login__form__input"
              type={typeCfPass ? "text" : "password"}
              name="cf_password"
              id="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
              placeholder="Confirm password"
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>

          <button
            className="login__form__submit"
            type="button"
            onClick={handleResetPass}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
