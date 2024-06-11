import PropTypes from "prop-types";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import UserInfoModal from "../../../components/UserInfoModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const User = ({ user, idx, handleChangeStatus }) => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const handleViewDetails = (id) => {
    setOpen(true);
    axiosSecure
      .get(`/users/${id}`)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <tr className="cursor-pointer hover text-second-color">
      <th>
        <label>{idx + 1}</label>
      </th>
      <td>
        <div>
          <div className="font-bold">{user?.name}</div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-4">
          <p
            className={
              user?.status === "active"
                ? "text-green font-bold"
                : "text-red font-bold"
            }
          >
            {user?.status}
          </p>
          <button
            onClick={() => {
              handleChangeStatus(user);
              //   setToggleStatus(!toggleStatus);
            }}
            className="btn"
            // id="user-status"
          >
            {user?.status === "active" ? "blocked" : "active"}
          </button>
        </div>
      </td>
      <th className="uppercase">
        {user?.role ? user?.role : <MdGroups2 title="Make Admin" size={30} />}
      </th>
      <th>
        <button
          onClick={() => handleViewDetails(user?._id)}
          className="btn btn-ghost"
        >
          See Info
        </button>
        <UserInfoModal
          userDetails={userDetails}
          open={open}
          setOpen={setOpen}
        />
      </th>
      <th>
        <button
          //   onClick={() => handleDownloadDetails(user._id)}
          className="btn btn-ghost"
        >
          <FaFileDownload size={30} />
          Download Details
        </button>
      </th>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object,
  idx: PropTypes.number,
  handleChangeStatus: PropTypes.func,
  setToggleStatus: PropTypes.func,
  toggleStatus: PropTypes.bool,
};

export default User;
