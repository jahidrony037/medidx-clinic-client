import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetData = (url) => {
  const axiosPublic = useAxiosPublic();
  const { data,isPending } = useQuery({
    queryKey: ["data", url],
    queryFn: async () => {
      const res = await axiosPublic.get(`${url}`);

      return res.data;
    },
  });

  return { data,isPending };
};

export default useGetData;
