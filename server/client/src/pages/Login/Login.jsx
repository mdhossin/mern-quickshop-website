import React from "react";

const Login = () => {
  return (
    <div className="login-box">
      <h3>Login</h3>
      <form>
        <p>Username</p>
        <input type="text" name="" placeholder="Enter your username..." />
        <p>Password</p>
        <input type="password" name="" placeholder="Enter your password..." />
        <input type="submit" name="" value="Login" />
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
          Forgot your password?
        </a>
        <a href="#home">
          Click here to &nbsp<span> sign up</span>
        </a>
      </form>
    </div>
  );
};

export default Login;
