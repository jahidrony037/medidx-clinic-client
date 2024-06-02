import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import TopBar from "../../components/TopBar.jsx";

const MainApp = () => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainApp;
