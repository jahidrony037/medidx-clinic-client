import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBookingsTest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth() || {};
  const { data, isPending, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookingsTest?email=${user?.email}`);
      return res.data;
    },
  });
  return [data, isPending, refetch];
};

export default useBookingsTest;
