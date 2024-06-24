import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ResultRow from "./ResultRow";

const UserTestResult = () => {
  const axiosSecure = useAxiosSecure();
  const [allTestResult, setAllTestResult] = useState([]);
  const { user, loading } = useAuth() || {};
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosSecure.get(
        `/testResults?email=${user?.email}`
      );
      setAllTestResult(data);
    };

    fetchData();
  }, [axiosSecure, user?.email]);
  if (loading) {
    <Loader />;
  }

  return (
    <div>
      <h2 className="text-center text-5xl font-bold lora md:mt-10 text-first-color">
        USER TEST RESULTS
      </h2>
      <div className="mt-10">
        <div className="overflow-x-auto niramit">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>NO</label>
                </th>
                <th>Email</th>
                <th>Test Name</th>
                <th>Appointment Date</th>
                <th>Test Result</th>
              </tr>
            </thead>

            <tbody>
              {allTestResult &&
                allTestResult?.map((result, idx) => (
                  <ResultRow idx={idx} key={result?._id} result={result} />
                ))}
            </tbody>
          </table>
          {!allTestResult.length && (
            <p className="text-2xl text-red font-bold text-center">
              No Data Found...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTestResult;
