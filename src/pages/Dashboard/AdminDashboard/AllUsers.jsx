import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import User from "./User";
const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
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

  const handleChangeRole = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Make this Person Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47ccc8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/role/${user?._id}`);
        if (res.data?.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: "This Person is Admin Now",
            icon: "success",
          });
        }
      }
    });
  };

  const toBase64 = (url) => {
    return axiosPublic
      .get(url, { responseType: "blob" })
      .then((response) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(response.data);
        });
      })
      .catch((error) =>
        console.error("Error converting image to base64:", error)
      );
  };

  const handleDownloadDetails = (user) => {
    // console.log(user);

    toBase64(user?.imageURL).then((base64) => {
      const doc = new jsPDF();
      doc.addImage(base64, "JPEG", 85, 10, 50, 50);

      doc.text(`Name: ${user?.name}`, 10, 80);
      doc.text(`Email: ${user?.email}`, 10, 90);
      doc.text(`BloodGroup: ${user?.bloodGroup}`, 10, 100);
      doc.text(`District: ${user?.district}`, 10, 110);
      doc.text(`Upazila: ${user?.upazila}`, 10, 120);
      doc.save(`${user?.name}-details.pdf`);
    });
  };
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
                  handleChangeRole={handleChangeRole}
                  handleDownloadDetails={handleDownloadDetails}
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
