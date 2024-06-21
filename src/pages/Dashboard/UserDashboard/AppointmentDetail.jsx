import { PropTypes } from "prop-types";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AppointmentDetail = ({ booking, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();
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
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your Booking has been Cancel.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <tr className="active-row cursor-pointer">
      <th>
        <label>{idx + 1}</label>
      </th>

      <td>{booking?.email}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={booking?.testImageURL} alt={booking?.testName} />
            </div>
          </div>
        </div>
      </td>
      <td>{booking?.appointmentDate}</td>
      <td>{booking?.testTime}</td>
      <th>
        <button onClick={() => handleCancelBooking(booking)} className="btn">
          Cancel Booking
          <FcCancel size={30} className="cursor-pointer" />
        </button>
      </th>
    </tr>
  );
};

AppointmentDetail.propTypes = {
  booking: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default AppointmentDetail;
