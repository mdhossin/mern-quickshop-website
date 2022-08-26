import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";

import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import { ToastProvider } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";

import { refreshToken } from "./redux/actions/userActions";
import {
  AddCategory,
  AddProduct,
  AllProducts,
  EditUser,
  ForgotPassword,
  MainLayout,
  NotFound,
  OrderList,
  PrivateRoute,
  ProcessOrder,
  ResetPassword,
  Reviews,
  UserList,
} from "./pages";

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
              <Route index element={<Dashboard />} />

              <Route path="products" element={<AllProducts />} />

              <Route path="category" element={<AddCategory />} />
              <Route path="users" element={<UserList />} />
              <Route path="reviews" element={<Reviews />} />

              <Route path="edit_user/:id" element={<EditUser />} />
              <Route path="addProduct" element={<AddProduct />} />
              <Route path="edit/:productId" element={<AddProduct />} />

              <Route path="orders" element={<OrderList />} />
              <Route path="admin/order/:id" element={<ProcessOrder />} />
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
