import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";

const MainApp = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainApp;
