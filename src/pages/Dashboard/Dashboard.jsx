import { NavLink, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin, adminLoading] = useAdmin() || [];
  // console.log(isAdmin);
  return (
    <div className="niramit">
      <div className="flex gap-5">
        <div className="bg-first-color min-h-screen pl-2 pr-5">
          {adminLoading ? (
            <Loader />
          ) : (
            <div>
              {!isAdmin ? (
                <ul className="flex flex-col items-start gap-5  text-[#fff] ">
                  <li className="cursor-pointer p-2 rounded-xl">
                    <NavLink to="/dashboard/userProfile">My Profile</NavLink>
                  </li>
                  <li className="cursor-pointer  p-2 rounded-xl">
                    <NavLink to="/dashboard/userAppointments">
                      Upcoming Appointments
                    </NavLink>
                  </li>
                  <li className="cursor-pointer  p-2 rounded-xl">
                    <NavLink to="/dashboard/testResult">Test Results</NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col items-start gap-5  text-[#fff] ">
                  <li className="cursor-pointer p-2 rounded-xl">
                    <NavLink to="/dashboard/userProfile">Admin Profile</NavLink>
                  </li>
                  <li className="cursor-pointer  p-2 rounded-xl">
                    <NavLink to="/dashboard/allUsers">All Users</NavLink>
                  </li>
                  <li className="cursor-pointer  p-2 rounded-xl">
                    <NavLink to="/dashboard/testResult">Test Results</NavLink>
                  </li>
                </ul>
              )}
              <div className="divider divider-accent"></div>
              <ul className="flex flex-col items-start gap-5  text-[#fff] ">
                <li className="cursor-pointer p-2 rounded-xl">
                  <NavLink to="/">Home</NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
