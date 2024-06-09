import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin = [], isPending: adminLoading } = useQuery({
    queryKey: ["data", "isAdmin"],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin?email=${user?.email}`);
      return res.data;
    },
  });

  return [isAdmin, adminLoading];
};

export default useAdmin;
