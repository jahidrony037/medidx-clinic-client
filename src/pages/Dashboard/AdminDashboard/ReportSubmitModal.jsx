import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import Swal from "sweetalert2";
import "../../../components/css/ModalAnimation.css";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
const ReportSubmitModal = ({ reservation, open, setOpen }) => {
  const axiosSecure = useAxiosSecure();

  const handleSubmitReport = async (event) => {
    event.preventDefault();
    const report = event.target.reportLink.value;
    // console.log(reservation?._id);
    const bookingInfo = {
      reportLink: report,
      reportStatus: "delivered",
    };
    const { data } = await axiosSecure.patch(
      `/reservations/${reservation?._id}`,
      bookingInfo
    );
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "Good job!",
        text: "Report Submitted",
        icon: "success",
      });
    }
  };

  return (
    <Modal
      center
      open={open}
      onClose={() => setOpen(false)}
      classNames={{
        overlayAnimationIn: "customEnterOverlayAnimation",
        overlayAnimationOut: "customLeaveOverlayAnimation",
        modalAnimationIn: "customEnterModalAnimation",
        modalAnimationOut: "customLeaveModalAnimation",
      }}
      animationDuration={800}
    >
      <form
        className="m-10 form-control md:w-[600px]"
        onSubmit={handleSubmitReport}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Write Your Report Link</span>
          </div>
          <input
            type="text"
            name="reportLink"
            required
            placeholder="Report Link"
            className="input input-bordered focus:outline-none w-full focus:border-second-color "
          />
        </label>
        <input
          className="btn bg-second-color text-[#fff] mt-6"
          type="submit"
          value="Submit"
        />
      </form>
    </Modal>
  );
};

ReportSubmitModal.propTypes = {
  reservation: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default ReportSubmitModal;
