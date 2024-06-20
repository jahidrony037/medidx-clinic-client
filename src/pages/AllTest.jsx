import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import PropTypes from "prop-types";
import "react-day-picker/dist/style.css";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "./../components/Loader";
const AllTest = ({ selectedDate }) => {
  const date = format(selectedDate, "PP");
  // console.log(date);
  const axiosSecure = useAxiosSecure();
  const { data: tests = [], isPending } = useQuery({
    queryKey: ["data", date],
    queryFn: async () => {
      const res = await axiosSecure.get(`/availableTests?date=${date}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loader />;
  }

  if (!tests.length) {
    return (
      <p className="font-bold text-3xl lora text-center ">
        Sorry NO Data Found...
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mt-10 text-first-color lora text-center uppercase">
        All Available Tests
      </h2>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-5  mt-10 items-center px-7">
        {tests.map((test) => (
          <div key={test?._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={test?.testImageURL}
                className="object-fit h-64 w-full  rounded-lg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{test?.testName}</h2>
              <p>Price : {test?.testPrice} BDT</p>
              <p>Date: {test?.testDate.split("T")[0]}</p>
              {/* <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Slots</span>
                </div>
                <select className="select select-bordered focus:outline-none focus:border-first-color w-full">
                  <option disabled selected>
                    Select Slots
                  </option>
                  {test?.slots.map((slot, i) => (
                    <option key={i}>{slot}</option>
                  ))}
                </select>
              </label> */}
              <p className="font-bold">
                {test?.slots.length}
                <span className="ml-1">
                  {test?.slots?.length > 1 ? "spaces" : "space"} available
                </span>
              </p>
              <p>Details: {test?.testDetails.slice(0, 50)}...</p>
              <div className="card-footer">
                <Link
                  to={`/testDetails/${test?._id}`}
                  className="btn btn-block bg-first-color text-[#fff]"
                >
                  Show Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AllTest.propTypes = {
  selectedDate: PropTypes.object,
};

export default AllTest;
