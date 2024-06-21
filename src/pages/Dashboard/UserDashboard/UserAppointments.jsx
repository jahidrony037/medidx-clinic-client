import Loader from "../../../components/Loader";
import useBookingsTest from "../../../hooks/useBookingsTest";
import AppointmentDetail from "./AppointmentDetail";

const UserAppointments = () => {
  // const { user } = useAuth() || {};
  const [bookings, isPending, refetch] = useBookingsTest();
  // console.log(bookings);
  if (isPending) {
    return <Loader />;
  }
  return (
    <div>
      <h2 className="text-center text-5xl font-bold text-first-color lora">
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
                  refetch={refetch}
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
