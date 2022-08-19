import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <GoogleOAuthProvider
    clientId={`768253564136-6ntsta3ed6q04le02jrkr0520ii7psqh.apps.googleusercontent.com`}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
