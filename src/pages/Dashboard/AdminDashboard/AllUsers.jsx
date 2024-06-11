import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import User from "./User";
const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users, refetch } = useQuery({
    queryKey: ["data", "users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const handleChangeStatus = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Change the User Status",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47ccc8",
      cancelButtonColor: "#d33",
      confirmButtonText: "confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = user?.status === "active" ? "blocked" : "active";
        const status = { status: newStatus };
        axiosSecure.patch(`/users/status/${user?._id}`, status).then((res) => {
          if (res.data?.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "User Status Changed",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // const handleDownloadDetails = (id) => {
  //   console.log(id, "amr details dekhte chaise");
  // };
  return (
    <div className="niramit">
      <h2 className="text-center text-4xl font-bold lora text-first-color">
        All USERS
      </h2>
      <div>
        <div className="overflow-x-auto niramit">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-left text-first-color">
                <th>No.</th>
                <th>Name</th>
                <th>User Status</th>
                <th>Role</th>
                <th>Info</th>
                <th>About</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, idx) => (
                <User
                  key={user?._id}
                  idx={idx}
                  user={user}
                  handleChangeStatus={handleChangeStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
