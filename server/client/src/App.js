import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import {
  ActivationEmail,
  ConfirmOrder,
  ForgotPassword,
  Login,
  MyOrders,
  NotFound,
  OrderDetails,
  OrderSuccess,
  Payment,
  Profile,
  ProtectedRoute,
  Register,
  ResetPassword,
  Shipping,
} from "./pages";
import { refreshToken } from "./redux/actions/userActions";
import "./styles/styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from "react-loader-spinner";
import { Header } from "./components";

const UserDashboard = lazy(() =>
  import("./components/Manager/UserDashboard/UserDashboard")
);
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));

const Blog = lazy(() => import("./pages/Blog/Blog"));

const Contact = lazy(() => import("./pages/Contact/Contact"));

const Home = lazy(() => import("./pages/Home/Home"));

const ProductDetail = lazy(() => import("./pages/ProductDetail/ProductDetail"));

const Shop = lazy(() => import("./pages/Shop/Shop"));

// home pages

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const user = useSelector((state) => state?.userLogin?.userInfo);
  return (
    <>
      <ToastProvider placement="top-right">
        <BrowserRouter>
          <Header />
          <Suspense
            fallback={
              <Rings
                ariaLabel="loading-indicator"
                color="#f3b632"
                height={100}
                width={100}
              />
            }
          >
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
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />

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
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </>
  );
}

export default App;
