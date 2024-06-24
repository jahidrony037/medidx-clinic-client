import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Reservation from "./Reservation";

const Reservations = () => {
  const axiosSecure = useAxiosSecure();
  const [allTests, setAllTests] = useState([]);
  const { loading } = useAuth();
  //   const { data: allTests = [], isPending } = useQuery({
  //     queryKey: ["data"],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get("/allTestName");
  //       return res.data;
  //     },
  //   });
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get("/allTestName");
      setAllTests(res.data);
    };
    fetchData();
  }, [axiosSecure]);

  const [reservations, setReservations] = useState([]);

  const handleClick = async (testName) => {
    // console.log(testName);
    await axiosSecure.get(`/reservations?testName=${testName}`).then((res) => {
      //   console.log(res.data);
      setReservations(res.data);
    });
  };

  const handleCancelReservation = (reservation) => {
    console.log(reservation);
    Swal.fire({
      title: "Are you sure you want to cancel Reservation?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47ccc8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(
          `/bookingsTest/${reservation?._id}`
        );
        if (data?.deletedCount) {
          setReservations(
            reservations?.filter((item) => item?._id !== reservation?._id)
          );
          Swal.fire({
            title: "Canceled!",
            text: "This Reservation has been Cancel",
            icon: "success",
          });
        }
      }
    });
  };

  const handleSearchReservations = async (email) => {
    // console.log(email);
    const { data } = await axiosSecure.get(
      `/reservations/search?email=${email}`
    );
    setReservations(data);
  };

  //   const handleSubmitReport = async (reservation) => {
  //     // console.log("report submitted", reservation);
  //     // const bookingInfo = {
  //     //     reportLink:"https://drive.google.com/file/d/1HDYfUfsLCpJSwPXmYwdpCgItnYkDOC3p/view",
  //     //     reportStatus:"delivered"
  //     // }
  //     // const {data} = await axiosSecure.patch('/bookingTest',bookingInfo);
  //     // console.log(data);
  //   };

  if (loading) {
    <Loader />;
  }

  //   console.log(reservations);
  return (
    <div>
      <h2 className="text-4xl font-bold md:mt-10 text-first-color lora text-center uppercase">
        All RESERVATIONS According to test
      </h2>
      <div className="flex px-5 items-center justify-center gap-5 mt-6">
        {allTests &&
          allTests?.map((test) => (
            <button
              onClick={() => handleClick(test?.testName)}
              className="btn btn-sm bg-first-color text-[#fff]"
              key={test?.testName}
            >
              {test?.testName}
            </button>
          ))}
      </div>
      <div className="mt-10">
        <div className="flex justify-center items-center gap-4 mb-10">
          <p className="font-bold text-first-color text-xl">
            Search by User Email :
          </p>
          <input
            type="text"
            onChange={(e) => handleSearchReservations(e.target.value)}
            className="input input-bordered focus:border-first-color focus:outline-none "
            placeholder="Search by Email"
          />
        </div>
        {reservations?.length ? (
          <div className="border-t-[1px] border-second-color">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Test Name</th>
                    <th>Action</th>
                    <th>Submit</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations &&
                    reservations?.map((reservation, idx) => (
                      <Reservation
                        key={reservation?._id}
                        idx={idx}
                        reservation={reservation}
                        handleCancelReservation={handleCancelReservation}
                        handleSearchReservations={handleSearchReservations}
                        // handleSubmitReport={handleSubmitReport}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-red text-2xl font-bold">
            No Data Found...
          </p>
        )}
      </div>
    </div>
  );
};

export default Reservations;
