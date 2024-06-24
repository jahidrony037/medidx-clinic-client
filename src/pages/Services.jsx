import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loader from "./../components/Loader";
import Service from "./Service";
const Services = () => {
  const axiosPublic = useAxiosPublic();
  const { data: services = [], isPending } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features");
      return res.data;
    },
  });
  //   console.log(services?.length);
  if (isPending) {
    return <Loader />;
  }
  return (
    <div>
      <h2 className="text-4xl font-bold uppercase text-first-color text-center lora">
        our services
      </h2>

      <div className="grid md:grid-cols-12 grid-cols-1 gap-10 items-center justify-center  mt-10">
        <div className="bg-first-color px-6 py-10 rounded-xl niramit md:col-span-4 h-[470px] space-y-10">
          <h2 className="text-[40px] font-bold text-[#fff]">
            World leader <br />
            <span className="text-second-color">in diagnostics</span>
          </h2>
          <p className="text-second-color lora text-[16px]">
            Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus
            purus, pharetra quis tempus id, feugiat a augue.
          </p>

          <Link
            to="/allTest"
            className="md:px-5 px-2 md:py-2 py-1 relative rounded-full  group overflow-hidden font-medium bg-second-color text-white inline-block border-[#fff]  border-[1px] w-full text-center text-[#fff]"
          >
            {" "}
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#fff]  group-hover:h-full opacity-90  group-hover:border-[1px] group-hover:rounded"></span>
            <span className="relative group-hover:text-second-color font-bold">
              Choose diagnostic
            </span>
          </Link>
        </div>

        <div className="grid  md:grid-cols-4 md:items-center grid-cols-2 gap-4 md:col-span-8 md:h-[472px] p-6 rounded bg-base-200">
          {services &&
            services?.map((service) => (
              <Service key={service?._id} service={service} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
