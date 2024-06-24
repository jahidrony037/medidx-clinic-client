import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AppointmentDetail from "./AppointmentDetail";

const UserAppointments = () => {
  // const { user } = useAuth() || {};
  const [bookings, setBookings] = useState([]);

  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/bookingsTest?email=${user?.email}`);
      setBookings(res.data);
    };
    fetchData();
  }, [user?.email, axiosSecure]);

  // const {
  //   data: bookings = [],
  //   isPending,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["data"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/bookingsTest?email=${user?.email}`);
  //     return res.data;
  //   },
  // });

  // console.log(bookings);

  const handleCancelBooking = (bookingTest) => {
    Swal.fire({
      title: "Are you sure you want to Cancel your booking? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47ccc8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `/bookingsTest/${bookingTest?._id}`
        );
        if (res.data?.deletedCount) {
          // refetch();
          setBookings(
            bookings.filter((booking) => booking?._id !== bookingTest?._id)
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your Booking has been Cancel.",
            icon: "success",
          });
        }
      }
    });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h2 className="text-center text-5xl font-bold md:mt-10 text-first-color lora">
        USER APPOINTMENTS
      </h2>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>NO</label>
                </th>
                <th>Email</th>
                <th>Test Name</th>
                <th>Appointment Date</th>
                <th>Time</th>
                <th>Action</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bookings?.map((booking, idx) => (
                <AppointmentDetail
                  key={booking?._id}
                  booking={booking}
                  idx={idx}
                  loading={loading}
                  handleCancelBooking={handleCancelBooking}
                  // refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAppointments;
