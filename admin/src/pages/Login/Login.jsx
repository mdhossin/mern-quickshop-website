import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { login, logout } from "../../redux/actions/userActions";
import { Spinner } from "react-bootstrap";
import { USER_LOGIN_RESET } from "../../redux/constants/userConstants";

const Login = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const { addToast } = useToasts();
  const [newUser, setNewUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const redirect = location.state?.path || "/";

  const { email, password } = newUser;

  const [typePass, setTypePass] = useState(false);

  const userLogin = useSelector((state) => state?.userLogin);

  const { loading, error, userInfo } = userLogin;

  const handleChangeInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: USER_LOGIN_RESET });
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (userInfo) {
      if (userInfo.message !== undefined) {
        addToast(userInfo?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }

      if (userInfo?.user?.role !== 1) {
        dispatch(logout(userInfo?.access_token));
        addToast("Admin resources access denied.", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        navigate("/dashboard/");
      }
    }
  }, [userInfo, error, addToast, navigate, dispatch, redirect]);
  return (
    <section className="login-section">
      <div className="login container-div">
        <h3 className="login__title">Login</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <div>
            <input
              className="login__form__input"
              type="email"
              name="email"
              value={email}
              id="email"
              onChange={handleChangeInput}
              placeholder="Your Email"
            />
          </div>

          <div className="pass">
            <input
              className="login__form__input"
              type={typePass ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChangeInput}
              id="password"
              placeholder="Your Password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>

          <p className="login__form__forgot">
            <Link to="/forgot">Forgot Password? </Link>
          </p>

          <button className="login__form__submit" type="submit">
            {loading ? <Spinner animation="border" size="sm" /> : "login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
