import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useGetData from "../hooks/useGetData";
import SocialLogin from "../shared/SocialLogin";

const SignUP = () => {
  const { data: districts = [] } = useGetData("/districts");
  const { data: upazila = [] } = useGetData("/upazila");
  const navigate = useNavigate();
  const { createUser, updateUser, LogOut } = useAuth() || {};

  const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_host_url = import.meta.env.VITE_IMAGE_HOST_URL;
  const host_url = `${image_host_url}?key=${image_api_key}`;
  // console.log(host_url);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // password and confirmPassword handle
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    "password & confirm password must be same"
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  // console.log(password, confirmPassword);

  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setConfirmPasswordError("password & confirm password must be same");
      }
      if (password === confirmPassword) {
        setConfirmPasswordError("");
      }
    }
  }, [password, confirmPassword]);

  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    // console.log(data);
    const { email, password, name, bloodGroup, district, upazila } = data;
    const imageFile = data.image[0];
    // console.log(imageFile);
    if (data.password !== confirmPassword) {
      toast.error("password & confirm Password must be same");
      return setConfirmPasswordError(
        "password & confirm Password must be same"
      );
    }
    setConfirmPasswordError("");
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axiosPublic.post(host_url, formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });
      // console.log(typeof res.data.success);
      if (res.data?.success) {
        const image = res.data.data?.display_url;
        // console.log("image uploaded", image);

        const userInfo = {
          email: email,
          name: name,
          status: "active",
          imageURL: image,
          bloodGroup: bloodGroup,
          district: district,
          upazila: upazila,
        };

        createUser(email, password)
          .then((res) => {
            const user = res.user;
            if (user) {
              updateUser(name, image)
                .then(() => {
                  axiosPublic
                    .post("/users", userInfo)
                    .then((res) => {
                      if (res.data?.acknowledged) {
                        LogOut()
                          .then(() => {
                            navigate("/login");
                            reset();
                            Swal.fire({
                              title: "Congratulations",
                              text: "User Create Successfully!",
                              icon: "success",
                            });
                          })
                          .catch((err) => toast.error(err.message));
                      }
                    })
                    .catch((err) => {
                      if (err) {
                        return console.log(err.message);
                      }
                    });
                })
                .catch((err) => toast.error(err.message));
            }
          })
          .catch((err) => toast.error(err.message));
      }
    }
  };

  return (
    <div className="bg-[url('https://i.postimg.cc/cJpdWzZf/7c9a76326c730978ec22e7193f67109f.png')] bg-center bg-no-repeat bg-cover niramit">
      <Helmet>
        <title>MediDX | SignUP</title>
      </Helmet>
      <div className=" shadow-2xl md:px-28 py-6">
        <h1 className="text-[40px] font-bold text-center lora text-first-color">
          REGISTRATION HERE
        </h1>
        <div className="flex md:flex-row flex-col-reverse justify-between shadow-2xl items-center md:px-[100px]">
          <div className="md:w-[48%] w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body w-full"
            >
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red">{errors?.email.message}</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-red">example: example32@gmail.com</p>
                )}
              </div>

              {/* Blood Group Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  className="select select-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
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

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: /^(?=.*[A-Z]).{6,}$/,
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red">{errors?.password?.message}</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red">
                    password should be 6 char long and contain one upper case
                    letter
                  </p>
                )}

                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  {...register("confirmPassword", { required: true })}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirmPassword"
                  className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                />
                {errors.confirmPassword?.type === "required" && (
                  <p className="text-red">password is required</p>
                )}
                <p className="text-red">{confirmPasswordError}</p>
              </div>

              <div className="form-control mt-6">
                <button
                  // className={`btn ${
                  //   samePassword ? "" : "btn-disabled"
                  // } bg-[#D1A054]`}

                  className={`btn  bg-first-color text-white`}
                >
                  Sign UP
                </button>
              </div>
            </form>
            <div>
              <label className="label">
                <p className="text-center mx-auto text-second-color">
                  <small>Already Registered?</small>
                  <Link
                    to="/login"
                    className="label-text-alt link link-hover text-second-color"
                  >
                    Go to login
                  </Link>
                </p>
              </label>
            </div>
            <div className="divider">OR</div>
            <div className="py-5">
              <SocialLogin />
            </div>
          </div>

          <div className="text-center lg:text-left md:w-[48%] w-full">
            <img
              src="https://i.ibb.co/nscDmx4/overlay-mri-doctor.png"
              alt="login-image"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUP;
