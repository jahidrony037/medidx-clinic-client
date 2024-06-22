import PropTypes from "prop-types";
import { useState } from "react";
import ReportSubmitModal from "./ReportSubmitModal";
const Reservation = ({
  reservation,
  idx,
  handleCancelReservation,
//   handleSubmitReport,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <tr className="cursor-pointer hover">
      <th>{idx + 1}</th>
      <td>
        <div>
          <div>
            <div className="font-bold">{reservation?.userName}</div>
          </div>
        </div>
      </td>
      <td className="font-bold text-first-color">{reservation?.email}</td>
      <td>{reservation?.testName}</td>
      <th>
        <button
          onClick={() => handleCancelReservation(reservation)}
          className="btn btn-error text-[#fff] btn-sm"
        >
          cancel reservation
        </button>
      </th>
      <th>
        <button
          onClick={() => {
            // handleSubmitReport(reservation),
            setOpen(true);
          }}
          className="btn bg-second-color text-[#fff] btn-sm"
        >
          Submit Report
        </button>
      </th>
      <ReportSubmitModal
        reservation={reservation}
        open={open}
        setOpen={setOpen}
      />
    </tr>
  );
};

Reservation.propTypes = {
  reservation: PropTypes.object,
  idx: PropTypes.number,
  handleCancelReservation: PropTypes.func,
  handleSearchReservations: PropTypes.func,
  handleSubmitReport: PropTypes.func,
};

export default Reservation;
