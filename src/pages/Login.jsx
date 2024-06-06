import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { loginUser } = useAuth() || {};
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    console.log(email, password);
    loginUser(email, password)
      .then((res) => {
        const user = res.user;
        if (user) {
          console.log(user);
          toast.success(`${user.displayName} Login Successful`);
          navigate("/");
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="bg-[url('https://i.postimg.cc/cJpdWzZf/7c9a76326c730978ec22e7193f67109f.png')] bg-center bg-no-repeat bg-cover niramit">
      <Helmet>
        <title>MediDX | Login</title>
      </Helmet>
      <div className="hero min-h-screen">
        <div className="flex md:flex-row flex-col justify-between shadow-2xl items-center md:px-[100px]">
          <div className="text-center lg:text-left md:w-[48%] w-full">
            <img
              src="https://i.ibb.co/nscDmx4/overlay-mri-doctor.png"
              alt="login-image"
              className="object-cover"
            />
          </div>
          <div className="md:w-[48%] w-full">
            <h1 className="text-[40px] font-bold text-center text-first-color ">
              Login
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body w-full"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  name="email"
                  className="input input-bordered w-full focus:outline-none focus:border-first-color"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red">{errors?.email.message}</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-red">example: example32@gmail.com</p>
                )}
              </div>
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
                  className="input input-bordered w-full focus:outline-none focus:border-first-color"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red">{errors?.password.message}</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red">
                    password should be 6 character long and contain at least one
                    upper case letter
                  </p>
                )}
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-first-color">Login</button>
              </div>
            </form>
            <div>
              <label className="label">
                <p className="mx-auto text-second-color">
                  <small>New Here?</small>{" "}
                  <Link
                    to={"/signUP"}
                    className="label-text-alt link link-hover text-second-color"
                  >
                    Create a New Account
                  </Link>
                </p>
              </label>
            </div>
            <div className="divider">OR</div>
            <div className="py-5">{/* <SocialLogin></SocialLogin> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
