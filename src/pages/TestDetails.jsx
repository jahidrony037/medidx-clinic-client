import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TestDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth() || {};

  const {
    data: test = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["data", "test"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allTests/${id}`);
      return res.data;
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  if (isPending) {
    return <Loader />;
  }
  // console.log(test);

  const handleBooking = async (data) => {
    // console.log(data);
    const { testName, _id, testPrice, testImageURL, testDate } = test;
    const bookingInfo = {
      email: user?.email,
      userName: user?.displayName,
      testId: _id,
      testName: testName,
      testPrice: new Number(testPrice),
      testImageURL: testImageURL,
      appointmentDate: testDate,
      testTime: data?.slots,
    };
    // console.log(bookingInfo);
    const res = await axiosSecure.post("/bookingsTest", bookingInfo);
    if (res.data.acknowledge === false) {
      toast.error(`${res.data?.message} please try another day`);
    }
    if (res.data?.insertedId) {
      refetch();
      Swal.fire({
        title: "Your Booking Successfully Done",
        text: "Please pay amount and confirm your booking",
        icon: "success",
      });
    }
  };

  return (
    <div>
      <div className="flex md:flex-row gap-7 flex-col niramit">
        <div className="md:w-[40%]">
          <img
            src={test?.testImageURL}
            alt={`${test?.testName} image`}
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="md:w-[50%] space-y-6">
          <p>
            <span className="font-bold">Name :</span> {test?.testName}
          </p>
          <p>
            <span className="font-bold">Price :</span> {test?.testPrice} BDT
          </p>
          <p>
            <span className="font-bold">Date :</span>
            {test?.testDate}
          </p>
          <form onSubmit={handleSubmit(handleBooking)} className="space-y-6">
            <p>
              <span className="font-bold">
                Slots:{" "}
                {test?.slots.length > 1 ? (
                  <select
                    {...register("slots", { required: "Time is Required" })}
                    className="select select-accent w-full max-w-xs"
                  >
                    {test?.slots?.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                ) : (
                  "No More Slot Today TRY Another Day"
                )}{" "}
                {errors.slots?.type === "required" && (
                  <p className="text-red">{errors?.slots.message}</p>
                )}
              </span>
            </p>

            <p className="font-bold">
              {test?.slots?.length}
              <span>
                {" "}
                {test?.slots.length > 1 ? "spaces" : "space"} available
              </span>
            </p>

            <p>
              <span className="font-bold">Details: </span>
              {test?.testDetails}
            </p>
            <button
              className={`btn bg-first-color text-[#fff] ${
                test?.slots?.length < 1 ? "btn-disabled" : ""
              }`}
              // onClick={() => handleBooking(test)}
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
