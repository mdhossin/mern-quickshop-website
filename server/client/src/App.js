import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { Header } from "./components";
import "./styles/styles.scss";
function App() {
  return (
    <ToastProvider placement="top-right">
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
