import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import {
  Header,
  MyOrders,
  OrderDetails,
  Profile,
  UserDashboard,
} from "./components";
import {
  ActivationEmail,
  ConfirmOrder,
  ForgotPassword,
  Home,
  Login,
  OrderSuccess,
  Payment,
  ProductDetail,
  ProtectedRoute,
  Register,
  ResetPassword,
  Shipping,
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

          <Route
            path="shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="myorders" element={<MyOrders />} />
            <Route path="order/:orderId" element={<OrderDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
