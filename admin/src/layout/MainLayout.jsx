import SideBar from "../components/Sidebar/SideBar";
import TopNav from "../components/TopNav/TopNav";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <>
    <SideBar />
    <div className="main">
      <div className="main__content">
        <TopNav />
        {/* used nested route data show here */}
        <Outlet />
      </div>
    </div>
  </>
);

export default MainLayout;
