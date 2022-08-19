import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { googleLogin, login } from "../../redux/actions/userActions";
import { USER_LOGIN_RESET } from "../../redux/constants/userConstants";
import { Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
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

  const responseGoogle = async (response) => {
    console.log(response, "goole response");
    try {
      dispatch(googleLogin(response.credential));
    } catch (error) {
      alert(error?.message);
    }
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
      navigate(redirect, { replace: true });
    }
  }, [userInfo, error, addToast, navigate, dispatch, redirect]);
  return (
    <section className="login-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
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
          <div className="login__form__social">
            <GoogleLogin
              width="100%"
              onSuccess={responseGoogle}
              onError={() => console.log("Login Failed")}
            />
          </div>

          <div className="login__form__forgot">
            <Link to="/register"> Don't have an account ? Register</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
