import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import {
  Header,
  MyOrders,
  OrderDetails,
  Profile,
  UserDashboard,
} from "./components";
import {
  AboutUs,
  ActivationEmail,
  ConfirmOrder,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  OrderSuccess,
  Payment,
  ProductDetail,
  ProtectedRoute,
  Register,
  ResetPassword,
  Shipping,
  Shop,
} from "./pages";

import { Rings } from "react-loader-spinner";
import { refreshToken } from "./redux/actions/userActions";
import "./styles/styles.scss";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const user = useSelector((state) => state?.userLogin?.userInfo);
  return (
    <>
      {loading ? (
        <Rings ariaLabel="loading-indicator" color="#f3b632" />
      ) : (
        <ToastProvider placement="top-right">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route
                path="register"
                element={
                  user?.access_token ? <Navigate to="/" /> : <Register />
                }
              />
              <Route
                path="forgot"
                element={
                  user?.access_token ? <Navigate to="/" /> : <ForgotPassword />
                }
              />
              <Route path="user/reset/:token" element={<ResetPassword />} />

              <Route
                path="active/:activation_token"
                element={
                  user?.access_token ? <Navigate to="/" /> : <ActivationEmail />
                }
              />
              <Route path="product/:productId" element={<ProductDetail />} />
              <Route path="shop" element={<Shop />} />
              <Route path="about" element={<AboutUs />} />

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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      )}
    </>
  );
}

export default App;
