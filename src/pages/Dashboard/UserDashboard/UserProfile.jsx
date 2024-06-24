import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useGetData from "../../../hooks/useGetData";

const UserProfile = () => {
  const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_host_url = import.meta.env.VITE_IMAGE_HOST_URL;
  const host_url = `${image_host_url}?key=${image_api_key}`;

  const { data: districts = [] } = useGetData("/districts");
  const { data: upazila = [] } = useGetData("/upazila");

  const { user, loading, updateUser } = useAuth() || {};
  //   console.log(user.email);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: person = {}, refetch } = useQuery({
    queryKey: ["data", "person"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  const { name, email, _id } = person;

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = data.image[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axiosPublic.post(host_url, formData);
      if (res.data?.success) {
        const image = res.data.data?.display_url;
        const userInfo = {
          name: data.name,
          imageURL: image,
          bloodGroup: data?.bloodGroup,
          district: data?.district,
          upazila: data?.upazila,
        };
        updateUser(data?.name, image)
          .then(async () => {
            const res = await axiosSecure.patch(`/users/${_id}`, userInfo);
            // console.log(res.data);
            if (res.data?.modifiedCount > 0) {
              Swal.fire({
                title: "Congratulations",
                text: "Your Data Update Successfully Done",
                icon: "success",
              });
              refetch();
              navigate("/");
            }
          })
          .catch((err) => toast.error(err.message));
      }
    }
  };
  return (
    <div className="mt-[68px] niramit">
      <h2 className="text-center text-first-color md:mt-10 text-4xl font-bold lora leading-relaxed">
         Your Profile
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              defaultValue={name}
              {...register("name", { required: "name field is required" })}
              className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
            />
            {errors.name?.type === "required" && (
              <p className="text-red">{errors?.name.message}</p>
            )}
          </div>

          {/* image upload field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Avatar/Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-accent  focus:outline-none focus:border-px focus:border-first-color w-full"
              {...register("image", { required: "image is required" })}
            />
            {errors.image?.type === "required" && (
              <p className="text-red">{errors?.image.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              disabled
              defaultValue={email}
              className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
            />
          </div>

          {/* Blood Group Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select
              className="select select-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              defaultValue={person?.bloodGroup}
              {...register("bloodGroup", { required: true })}
            >
              <option disabled value="default">
                Select Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup?.type === "required" && (
              <p className="text-red">Blood Group is Required</p>
            )}
          </div>
          {/* Select Districts  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Districts</span>
            </label>
            <select
              className="select select-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              defaultValue={person?.district}
              {...register("district", {
                required: "District is Required",
              })}
            >
              <option disabled value="default">
                Select Districts
              </option>
              {districts.map((district) => (
                <option key={district._id} value={`${district.name}`}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district?.type === "required" && (
              <p className="text-red">{errors?.district?.message}</p>
            )}
          </div>

          {/* Select Upazila  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Upazila</span>
            </label>
            <select
              className="select select-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              defaultValue={person?.upazila}
              {...register("upazila", { required: "Upazila Required" })}
            >
              <option disabled value="default">
                Select Upazila
              </option>
              {upazila.map((item) => (
                <option key={item.id} value={`${item.name}`}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.upazila?.type === "required" && (
              <p className="text-red">{errors?.upazila?.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              // className={`btn ${
              //   samePassword ? "" : "btn-disabled"
              // } bg-[#D1A054]`}

              className={`btn  bg-first-color text-white`}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
