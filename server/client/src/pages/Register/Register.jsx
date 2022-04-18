import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import { validRegister } from "../../utils/validation";
const Register = () => {
  const { addToast } = useToasts();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    cf_password: "",
  });
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
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
    // dispatch(register(name, email, password));
    setNewUser({
      email: "",
      password: "",
      name: "",
      cf_password: "",
    });
  };

  return (
    <section className="login-section">
      <div className="login container-div">
        <h3 className="login__title">Register</h3>
        <form className="login__form">
          <div>
            <input
              className="login__form__input"
              type="text"
              name="name"
              placeholder="Your name"
            />
          </div>
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
          <div className="pass">
            <input
              className="login__form__input"
              type={typeCfPass ? "text" : "password"}
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
              placeholder="Confrim Password"
              id="cf_password"
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>

          <button className="login__form__submit" type="submit">
            Register
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
