import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login/Login";
import { ToastProvider } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/userActions";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  return (
    <ToastProvider placement="top-right">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<MainLayout />}>
            {/* <Route path="/" element={<Dashboard />} /> same working index and root when i need to render same root use index or root path */}
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Blank />} />
            <Route path="products" element={<Blank />} />
            <Route path="customers" element={<Blank />} />
            <Route path="settings" element={<Blank />} />
            <Route path="stats" element={<Blank />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
