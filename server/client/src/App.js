import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { Header } from "./components";
import { ForgotPassword, Home, Login, Register } from "./pages";
import "./styles/styles.scss";
function App() {
  return (
    <ToastProvider placement="top-right">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
