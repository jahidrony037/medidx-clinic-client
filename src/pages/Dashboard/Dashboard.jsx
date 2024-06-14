import { NavLink, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [isAdmin, adminLoading] = useAdmin() || [];
  // console.log(isAdmin);
  const { user } = useAuth();
  return (
    <div className="niramit">
      <div className="flex gap-5">
        <div className="bg-first-color min-h-screen pl-2 pr-5 md:w-[15%]">
          {adminLoading ? (
            <Loader />
          ) : (
            <div>
              {!isAdmin ? (
                <div>
                  <div className="avatar flex justify-center py-5">
                    <div className="w-24 rounded-full ring ring-first-color  ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL} className="mx-auto" />
                    </div>
                  </div>
                  <h3 className="text-center font-bold lora text-xl text-second-color">
                    GENERAL USER
                  </h3>
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
                </div>
              ) : (
                <div>
                  <div className="avatar flex justify-center py-5">
                    <div className="w-24 rounded-full ring ring-second-color  ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL} className="mx-auto" />
                    </div>
                  </div>
                  <h3 className="text-center font-bold lora text-xl text-second-color">
                    ADMIN
                  </h3>
                  <ul className="flex flex-col items-start gap-5  text-[#fff] ">
                    <li className="cursor-pointer p-2 rounded-xl">
                      <NavLink to="/dashboard/userProfile">
                        Admin Profile
                      </NavLink>
                    </li>
                    <li className="cursor-pointer  p-2 rounded-xl">
                      <NavLink to="/dashboard/allUsers">All Users</NavLink>
                    </li>
                    <li className="cursor-pointer  p-2 rounded-xl">
                      <NavLink to="/dashboard/addTest">Add Test</NavLink>
                    </li>
                    <li className="cursor-pointer  p-2 rounded-xl">
                      <NavLink to="/dashboard/allTests">All Tests</NavLink>
                    </li>
                    <li className="cursor-pointer  p-2 rounded-xl">
                      <NavLink to="/dashboard/addBanner">Add Banner</NavLink>
                    </li>
                  </ul>
                </div>
              )}
              <div className="divider border-second-color border-[1px] h-[1px]"></div>
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
