import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, isLoading, show, setShow, LogOut } = useAuth() || {};

  const handleLogOut = () => {
    // console.log("click the handleLogOut btn");
    LogOut()
      .then(() => {
        toast.success("log out successful");
      })
      .catch((err) => toast.error(err.message));
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/allTest">All Test</NavLink>
      </li>

      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/updateProfile">Update Profile</NavLink>
        </li>
      )}
    </>
  );
  return (
    <nav>
      <div className="navbar bg-base-100 niramit  z-10 sticky bg-transparent bg-opacity-40 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">MediDX</a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 ">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {isLoading ? (
            // <FadeLoader size={10} color="first-color" />
            <p>loading</p>
          ) : (
            <div>
              {user ? (
                <div>
                  <div
                    className="dropdown dropdown-end"
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn border-[1px] border-[#fff]  btn-circle avatar"
                    >
                      <div
                        data-tooltip-id="profile-image"
                        data-tooltip-content={`${user?.providerData[0]?.displayName}`}
                        className="w-10 rounded-full"
                      >
                        <img
                          alt="user-photo"
                          src={`${user?.providerData[0]?.photoURL}`}
                        />
                        {/* <Tooltip
                          id="profile-image"
                          className="z-10"
                          style={{ backgroundColor: "first-color" }}
                        /> */}
                      </div>
                    </div>
                    {!show ? null : (
                      <ul
                        tabIndex={0}
                        className="z-[1] flex flex-col  p-2 shadow bg-base-100 rounded-box absolute right-0 space-y-5"
                      >
                        <li className="w-40">
                          <Link to="" className="flex justify-between text-xs">
                            {user?.providerData[0]?.email}
                          </Link>
                        </li>

                        <li className="w-40">
                          <button
                            onClick={() => handleLogOut()}
                            className="md:px-[20px] px-[8px] md:py-2 py-1 relative rounded  group overflow-hidden font-medium bg-second-color text-white inline-block border-[#fff]  border-[1px] w-full text-center text-[#fff]"
                          >
                            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#fff]  group-hover:h-full opacity-90 group-hover:border-second-color group-hover:border-[1px] group-hover:rounded"></span>
                            <span className="relative group-hover:text-second-color font-bold">
                              LogOut
                            </span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="md:px-5 px-2 md:py-2 py-1 relative rounded  group overflow-hidden font-medium bg-second-color text-white inline-block border-[#fff]  border-[1px] w-full text-center text-[#fff]"
                >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#fff]  group-hover:h-full opacity-90 group-hover:border-second-color group-hover:border-[1px] group-hover:rounded"></span>
                  <span className="relative group-hover:text-second-color font-bold">
                    Login
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
