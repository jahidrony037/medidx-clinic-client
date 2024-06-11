import PropTypes from "prop-types";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import UserInfoModal from "../../../components/UserInfoModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const User = ({
  user,
  idx,
  handleChangeStatus,
  handleChangeRole,
  handleDownloadDetails,
}) => {
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
          <div className="font-bold uppercase">{user?.name}</div>
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
            }}
            className="btn"
          >
            {user?.status === "active" ? "blocked" : "active"}
          </button>
        </div>
      </td>
      <th className="uppercase">
        {user?.role ? (
          user?.role
        ) : (
          <button
            onClick={() => handleChangeRole(user)}
            className="btn"
            title="Make Admin"
          >
            <MdGroups2 title="Make Admin" size={30} />
          </button>
        )}
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
          onClick={() => handleDownloadDetails(user)}
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
  handleChangeRole: PropTypes.func,
  handleDownloadDetails: PropTypes.func,
};

export default User;
