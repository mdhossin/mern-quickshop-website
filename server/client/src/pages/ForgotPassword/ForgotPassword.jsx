import React, { useState } from "react";

const ForgotPassword = () => {
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
              placeholder="Your email"
            />
          </div>

          <button className="login__form__submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
