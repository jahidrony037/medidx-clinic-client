import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoMdClose } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
const Dashboard = () => {
  const [isAdmin, adminLoading] = useAdmin() || [];
  // console.log(isAdmin);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  // console.log(open);
  return (
    <div className="niramit">
      {/* <Transition show={open} /> */}
      <Helmet>
        <title>MediDX || Profile</title>
      </Helmet>
      <div className="md:flex md:gap-5 ">
        <TiThMenu
          className={`md:hidden absolute left-0  z-30 bg-first-color  text-[#ffff]`}
          size={35}
          title="Menu"
          onClick={() => setIsOpen(true)}
        />
        <div
          className={`bg-first-color mt-0  pl-2 pr-5 md:w-[15%] w-full ${
            !isOpen && "z-10"
          }  ${isOpen ? "absolute" : "hidden md:flex"} 
          top-0 min-h-screen md:relative`}
        >
          <IoMdClose
            className={`md:hidden absolute right-1 text-[#ffff]`}
            size={35}
            onClick={() => setIsOpen(false)}
          />
          {adminLoading ? (
            <Loader />
          ) : (
            <div>
              {!isAdmin ? (
                <div>
                  <div className="avatar flex justify-center py-5">
                    <div className="w-24 rounded-full ring ring-first-color  ring-offset-base-100 ring-offset-2">
                      <img
                        src={user?.photoURL}
                        title={user?.displayName}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                  <h3 className="text-center font-bold lora text-xl text-second-color">
                    GENERAL USER
                  </h3>
                  <ul className="flex flex-col items-start gap-5 mt-5  text-[#fff] ">
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
                    {/* <li className="cursor-pointer  p-2 rounded-xl">
                      <NavLink to="/dashboard/cart">
                        <button className="btn btn-sm flex items-center bg-first-color">
                          <FaOpencart size={25} />
                          <div className="badge badge-first-color">Cart</div>
                        </button>
                      </NavLink>
                    </li> */}
                  </ul>
                </div>
              ) : (
                <div>
                  <div className="avatar flex justify-center py-5">
                    <div className="w-24 rounded-full ring ring-second-color  ring-offset-base-100 ring-offset-2">
                      <img
                        src={user?.photoURL}
                        title={user?.displayName}
                        className="mx-auto"
                      />
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
                      <NavLink to="/dashboard/allBanner">All Banner</NavLink>
                    </li>
                    <li className="cursor-pointer  p-2 rounded-xl">
                      <NavLink to="/dashboard/addBanner">Add Banner</NavLink>
                    </li>
                    <li className="cursor-pointer  p-2 rounded-xl">
                      <NavLink to="/dashboard/reservations">
                        Reservations
                      </NavLink>
                    </li>
                    <li className="cursor-pointer  p-2 rounded-xl">
                      <NavLink to="/dashboard/addDoctor">Add Doctor</NavLink>
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
        <div className={`${!isOpen ? "static" : "hidden"} md:flex flex-1`}>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
