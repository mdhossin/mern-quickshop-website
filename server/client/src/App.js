import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { Header } from "./components";
import {
  ActivationEmail,
  ForgotPassword,
  Home,
  Login,
  ProductDetail,
  Register,
  ResetPassword,
  Shop,
} from "./pages";
import { refreshToken } from "./redux/actions/userActions";
import "./styles/styles.scss";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return (
    <ToastProvider placement="top-right">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="user/reset/:token" element={<ResetPassword />} />

          <Route
            path="active/:activation_token"
            element={<ActivationEmail />}
          />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="shop" element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
