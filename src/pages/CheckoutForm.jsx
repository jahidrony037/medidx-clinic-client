import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../components/css/payment.css";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
const CheckoutForm = ({
  //   handleBooking,
  test,
  appointmentTime,
  payingPrice,
  refetch,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth() || {};

  useEffect(() => {
    if (
      (payingPrice && payingPrice > 117) ||
      (test?.testPrice && test?.testPrice > 117)
    ) {
      getClientSecret({ price: payingPrice || test?.testPrice });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payingPrice, test?.price]);

  //get client secret
  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, price);
    console.log(`Client Secret From sever `, data);
    setClientSecret(data?.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //   console.log("[error]", error);
      setCardError(error?.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    //confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError?.message);
      setCardError(confirmError?.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const { testName, _id, testPrice, testImageURL, testDate } = test;
      const bookingInfo = {
        email: user?.email,
        userName: user?.displayName,
        testId: _id,
        testName: testName,
        testPrice: new Number(testPrice),
        testImageURL: testImageURL,
        appointmentDate: testDate,
        testTime: appointmentTime,
        transactionId: paymentIntent.id,
        bookingDate: new Date(),
        reportStatus: "pending",
        paymentStatus: "paid",
      };
      console.log("bookingInfo from 104", bookingInfo);
      if (paymentIntent.id) {
        const res = await axiosSecure.post("/bookingsTest", bookingInfo);
        if (res.data.acknowledge === false) {
          toast.error(`${res.data?.message} please try another day`);
        }
        if (res.data?.insertedId) {
          refetch();
          Swal.fire({
            title: "Your Booking Successfully Done",
            icon: "success",
          });
        }
      }
    }
    setProcessing(false);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <CardElement
          className="input"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#47ccc8",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          //   onClick={() => handleBooking(test, appointmentTime)}
          className="paying-btn"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? (
            <ImSpinner9 size={24} className="animate-spin m-auto" />
          ) : (
            `Pay ${payingPrice || test?.testPrice}`
          )}
        </button>
      </form>
      {cardError && <p className="text-red ml-8">{cardError}</p>}
    </>
  );
};

CheckoutForm.propTypes = {
  handleBooking: PropTypes.func,
  test: PropTypes.object,
  appointmentTime: PropTypes.string,
  payingPrice: PropTypes.number,
  refetch: PropTypes.func,
};

export default CheckoutForm;
