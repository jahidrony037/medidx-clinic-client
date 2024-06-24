import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loader from "./../components/Loader";
import Doctor from "./Doctor";

const Doctors = () => {
  const axiosPublic = useAxiosPublic();
  const { data: doctors = [], isPending } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/doctors");
      return res.data;
    },
  });
  if (isPending) {
    return <Loader />;
  }
  return (
    <div>
      <h2 className="text-center text-4xl font-bold lora text-first-color">
        All Doctors
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mt-10">
        {doctors &&
          doctors?.map((doctor) => (
            <Doctor key={doctor?._id} doctor={doctor} />
          ))}
      </div>
    </div>
  );
};

export default Doctors;
