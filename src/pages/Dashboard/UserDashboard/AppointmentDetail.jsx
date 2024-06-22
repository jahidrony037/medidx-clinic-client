import { PropTypes } from "prop-types";
import { FcCancel } from "react-icons/fc";
import Loader from "../../../components/Loader";

const AppointmentDetail = ({ handleCancelBooking, booking, idx, loading }) => {
  // const axiosSecure = useAxiosSecure();
  // const handleCancelBooking = (bookingTest) => {
  //   Swal.fire({
  //     title: "Are you sure you want to Cancel your booking? ",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#47ccc8",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       const res = await axiosSecure.delete(
  //         `/bookingsTest/${bookingTest?._id}`
  //       );
  //       if (res.data?.deletedCount) {
  //         // refetch();
  //         Swal.fire({
  //           title: "Deleted!",
  //           text: "Your Booking has been Cancel.",
  //           icon: "success",
  //         });
  //       }
  //     }
  //   });
  // };
  if (loading) {
    return <Loader />;
  }

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
      <th>{booking?.paymentStatus}</th>
      {/* <th>
        Not Paid <button className="btn bg-first-color text-[#fff]">pay</button>
      </th> */}
    </tr>
  );
};

AppointmentDetail.propTypes = {
  booking: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
  handleCancelBooking: PropTypes.func,
  loading: PropTypes.bool,
};

export default AppointmentDetail;
