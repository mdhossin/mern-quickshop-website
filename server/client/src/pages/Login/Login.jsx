import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Login = () => {
  const [typePass, setTypePass] = useState(false);
  const responseGoogle = async (response) => {
    console.log(response);
  };

  return (
    <section className="login-section">
      <div className="login container-div">
        <h3 className="login__title">Login</h3>
        <form className="login__form">
          <div>
            <input
              className="login__form__input"
              type="email"
              name="email"
              placeholder="Your email"
            />
          </div>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="login__form__input"
              name="password"
              placeholder="Your password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>

          <p className="login__form__forgot">
            <Link to="/forgot">Forgot Password? </Link>
          </p>

          <button className="login__form__submit" type="submit">
            Login
          </button>
          <div className="login__form__social">
            <GoogleLogin
              clientId="371370040135-2f71d8rrmn8ami8mfc77ivcst7adc3cp.apps.googleusercontent.com"
              buttonText="Login with google"
              onSuccess={responseGoogle}
              cookiePolicy={"single_host_origin"}
              theme="dark"
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
