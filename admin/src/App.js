import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login/Login";
import { ToastProvider } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/userActions";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NotFound from "./pages/NotFound/NotFound";
import AddProduct from "./pages/AddProduct/AddProduct";
import AddCategory from "./pages/AddCategory/AddCategory";
import AllProducts from "./pages/AllProducts/AllProducts";
import UserList from "./pages/UserList/UserList";
import EditUser from "./pages/EditUser/EditUser";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const user = useSelector((state) => state?.userLogin?.userInfo);
  return (
    <ToastProvider placement="top-right">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="user/reset/:token" element={<ResetPassword />} />

          {user?.access_token && user?.user?.role === 1 && (
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              {/* <Route path="/" element={<Dashboard />} /> same working index and root when i need to render same root use index or root path */}
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Blank />} />
              <Route path="products" element={<AllProducts />} />

              <Route path="category" element={<AddCategory />} />
              <Route path="users" element={<UserList />} />

              {/* <Route path="users" element={<Profile />} /> */}
              <Route path="edit_user/:id" element={<EditUser />} />
              <Route path="addProduct" element={<AddProduct />} />
              <Route path="edit/:productId" element={<AddProduct />} />

              {/* <Route path="products" element={<AllProducts />} /> */}

              {/* <Route path="orders" element={<OrderList />} /> */}
              {/* <Route path="admin/order/:id" element={<ProcessOrder />} /> */}
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
