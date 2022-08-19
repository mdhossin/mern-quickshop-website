import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <GoogleOAuthProvider
    clientId={`633438770849-ffnf0v3a9vgkmfgffv5k6fakmpu4n2nc.apps.googleusercontent.com`}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
