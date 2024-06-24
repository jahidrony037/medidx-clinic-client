import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Banner from "./Banner";

const AllBanner = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: banners = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["data", "banners"],
    enabled: !loading && !!user && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get("/allBanners");
      return res.data;
    },
  });

  const handleBannerStatusChange = (banner) => {
    Swal.fire({
      title:
        banner?.bannerActive === "False"
          ? "Are you sure this banner only show on Banner"
          : "Are you sure you do not see this banner?",
      text:
        banner?.bannerActive === "False"
          ? "other value all will be false"
          : "this value will be false",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47ccc8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      const bannerStatus = {
        bannerStatus: banner?.bannerActive === "True" ? "False" : "True",
      };
      //   console.log(bannerStatus);
      if (result.isConfirmed) {
        const result = await axiosSecure.patch(
          `/allBanners/${banner?._id}`,
          bannerStatus
        );
        // console.log(result.data);
        if (result.data?.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            icon: "success",
          });
        }
      }
    });
  };

  const handleDeleteBanner = (banner) => {
    // console.log(banner);
    Swal.fire({
      title: "Are you sure to Delete Banner?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47ccc8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.delete(`/allBanners/${banner?._id}`);
        // console.log(result.data);
        if (result.data?.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Banner has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>MediDX || AllBanner</title>
      </Helmet>
      <h2 className="text-4xl font-bold md:mt-10 text-first-color lora text-center uppercase">
        AlL BANNERS
      </h2>
      {isPending ? (
        <Loader />
      ) : (
        <div>
          <div className="overflow-x-auto niramit mt-10">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-left text-first-color">
                  <th>No.</th>
                  <th>Banner Name</th>
                  <th>Banner Title</th>
                  <th>Banner Coupon Code</th>
                  <th>Banner Rate</th>
                  <th>Banner Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {banners?.map((banner, idx) => (
                  <Banner
                    key={banner?._id}
                    idx={idx}
                    banner={banner}
                    handleDeleteBanner={handleDeleteBanner}
                    handleBannerStatusChange={handleBannerStatusChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBanner;
