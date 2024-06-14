import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Test from "./Test";

const AllTests = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: tests = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["data", "tests"],
    enabled: !loading && !!user && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get("/allTests");
      return res.data;
    },
  });
  // console.log(tests);

  const handleDeleteTest = async (test) => {
    Swal.fire({
      title: "Are you sure to Delete Test?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47ccc8",
      cancelButtonColor: "#d33",
      confirmButtonText: "confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/allTests/${test?._id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  return (
    <div>
      <h2 className="text-4xl mt-10 font-bold text-first-color lora text-center uppercase">
        ALL AVailable Tests
      </h2>
      {isPending ? (
        <Loader />
      ) : (
        <div className="mt-20 niramit">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <span>No</span>
                    </label>
                  </th>
                  <th>Test Image</th>
                  <th>Test Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                  <th>Reservations</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test, idx) => (
                  <Test
                    key={test._id}
                    idx={idx}
                    test={test}
                    handleDeleteTest={handleDeleteTest}
                    // handleUpdateTest={handleUpdateTest}
                    refetch={refetch}
                    isPending={isPending}
                  />
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTests;
