import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBookingsTest = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth() || {};
  const {
    data: bookings,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["data"],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookingsTest?email=${user?.email}`);
      // console.log(res.data);
      return res.data;
    },
  });
  return [bookings, isPending, refetch];
};

export default useBookingsTest;
