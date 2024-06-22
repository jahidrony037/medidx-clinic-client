import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import "../components/css/ModalAnimation.css";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const BookingModal = ({
  //   handleBooking,
  test,
  open,
  setOpen,
  appointmentTime,
  refetch,
}) => {
  const { user } = useAuth() || {};

  //load banner information
  const axiosPublic = useAxiosPublic();
  const {
    data: banner = {},
    // isPending,
  } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/activeBanner");
      return res.data;
    },
  });
  //   refetch();

  const [validCoupon, setValidCoupon] = useState(false);
  const [userCouponCode, setUserCouponCode] = useState("");
  useEffect(() => {
    if (banner?.couponCode === userCouponCode) {
      setValidCoupon(true);
    }
    if (banner?.couponCode !== userCouponCode) {
      setValidCoupon(false);
    }
  }, [banner?.couponCode, userCouponCode]);
  const [payingPrice, setPayingPrice] = useState(null);
  const handleApplyCouponCode = () => {
    const couponRate = banner?.couponRate;
    const testPrice = test?.testPrice;
    const newPrice = testPrice - Math.ceil(testPrice * (couponRate / 100));
    setPayingPrice(newPrice);
    //console.log(payingPrice, testPrice);
    refetch();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setPayingPrice(null);
      }}
      center
      classNames={{
        overlayAnimationIn: "customEnterOverlayAnimation",
        overlayAnimationOut: "customLeaveOverlayAnimation",
        modalAnimationIn: "customEnterModalAnimation",
        modalAnimationOut: "customLeaveModalAnimation",
      }}
      animationDuration={800}
    >
      <div className="p-5 shadow-lg niramit rounded-2xl text-[#313030cf]">
        <p className="text-center font-bold">
          Patient Name: {user?.displayName}
        </p>
        <p>Test Name:{test?.testName} </p>
        <p>Appointment Date: {test?.testDate}</p>
        <p>Time: {appointmentTime}</p>
        <p>Price : {test?.testPrice} BDT</p>
        <p className="text-center">
          use <span className="font-bold">{banner?.couponCode}</span> for{" "}
          {banner?.couponRate}% discount
        </p>
        <div>
          <p>
            For Discount :{" "}
            <input
              className="input input-bordered focus:outline-none focus:border-[1px] focus:border-first-color"
              type="text"
              name="coupon-code"
              onChange={(e) => setUserCouponCode(e.target.value)}
              placeholder="apply discount code"
            />{" "}
            <button
              disabled={validCoupon === false}
              onClick={() => handleApplyCouponCode()}
              className="btn btn-sm bg-first-color text-[#fff]"
            >
              Apply
            </button>
          </p>
        </div>
        <p>Paying Price : {payingPrice || test?.testPrice} BDT</p>

        {/* payments code starts  */}
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              //   handleBooking={handleBooking}
              test={test}
              appointmentTime={appointmentTime}
              payingPrice={payingPrice}
              refetch={refetch}
            />
          </Elements>
        </div>
        {/* <button
        //   onClick={() => handleBooking(test, appointmentTime)}
          className="btn bg-first-color text-[#fff]"
        >
          Pay {payingPrice || test?.testPrice}
        </button> */}
      </div>
    </Modal>
  );
};

BookingModal.propTypes = {
  setOpen: PropTypes.func,
  handleBooking: PropTypes.func,
  open: PropTypes.bool,
  test: PropTypes.object,
  appointmentTime: PropTypes.string,
  refetch: PropTypes.func,
};

export default BookingModal;
