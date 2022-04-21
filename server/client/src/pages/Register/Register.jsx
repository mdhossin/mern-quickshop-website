import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import { validRegister } from "../../utils/validation";
import { register } from "../../redux/actions/userActions";
import { USER_REGISTER_RESET } from "../../redux/constants/userConstants";
import { Helmet } from "react-helmet";
const Register = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    cf_password: "",
  });
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const userReg = useSelector((state) => state.userRegister);
  const { loading, error, userInfo: userRegInfo } = userReg;

  const { name, email, password, cf_password } = newUser;

  const handleChangeInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validRegister(newUser);

    if (result?.errLength) {
      return addToast(result?.errMsg[0], {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch(register(name, email, password));
    setNewUser({
      email: "",
      password: "",
      name: "",
      cf_password: "",
    });
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: USER_REGISTER_RESET });
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (userRegInfo) {
      dispatch({ type: USER_REGISTER_RESET });
      addToast(userRegInfo?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [userRegInfo, error, addToast, dispatch]);
  return (
    <section className="login-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="login container-div">
        <h3 className="login__title">Register</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <div>
            <input
              className="login__form__input"
              type="name"
              name="name"
              value={name}
              id="name"
              onChange={handleChangeInput}
              placeholder="Your Name"
            />
          </div>
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
              id="password"
              onChange={handleChangeInput}
              placeholder="Your Password"
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
              value={cf_password}
              id="cf_password"
              onChange={handleChangeInput}
              placeholder="Confrim Password"
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>

          <button className="login__form__submit" type="submit">
            {loading ? <Spinner animation="border" size="sm" /> : "Register"}
          </button>

          <div style={{ marginTop: "1rem" }} className="login__form__forgot">
            <Link to="/login">Already have an account ? Login</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
