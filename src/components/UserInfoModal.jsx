import PropTypes from "prop-types";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../components/css/ModalAnimation.css";
const UserInfoModal = ({ userDetails, open, setOpen }) => {
  //   console.log(userDetails);
  const { name, imageURL, district, upazila, bloodGroup } = userDetails;
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      center
      classNames={{
        overlayAnimationIn: "customEnterOverlayAnimation",
        overlayAnimationOut: "customLeaveOverlayAnimation",
        modalAnimationIn: "customEnterModalAnimation",
        modalAnimationOut: "customLeaveModalAnimation",
      }}
      animationDuration={800}
    >
      <h2 className="text-center uppercase text-4xl font-bold  lora text-first-color ">
        Details of a user
      </h2>
      <div className="md:p-24 p-20 text-second-color flex md:flex-row flex-col md:justify-between  md:items-center items-stretch gap-6 shadow-2xl">
        <div>
          <img
            src={imageURL}
            alt={`${name} image`}
            className="object-cover h-60 w-full rounded-box"
          />
        </div>
        <div className="space-y-7">
          <p className=" text-2xl font-semibold uppercase">Name: {name}</p>
          <p className="text-xl font-semibold">Blood Group : {bloodGroup}</p>
          <p className="text-xl font-semibold"> District: {district}</p>
          <p className="text-xl font-semibold">Upazila: {upazila}</p>
        </div>
      </div>
    </Modal>
  );
};

UserInfoModal.propTypes = {
  userDetails: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default UserInfoModal;
