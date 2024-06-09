import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="niramit">
      <div className="flex gap-5">
        <div className="bg-second-color min-h-screen pl-2 pr-5">
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

            <div className="divider divider-accent"></div>
          </ul>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
