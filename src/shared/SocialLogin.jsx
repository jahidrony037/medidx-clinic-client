import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth() || {};
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleSocialLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success(`${user.displayName} Login Successful`);
          navigate("/");
        }
        const userInfo = {
          email: user?.email,
          name: user?.displayName,
          status: "active",
        };
        if (user) {
          axiosPublic
            .post("/users", userInfo)
            .then((res) => {
              // console.log(res.data);
              if (res.data?.acknowledged) {
                toast.success("Login in Successfully done!");
                navigate("/");
              }
            })
            .catch((err) => toast.error(err.message));
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="flex justify-center">
      <button onClick={handleSocialLogin} className="btn">
        <FcGoogle size={35} /> Login in With Google
      </button>
    </div>
  );
};

export default SocialLogin;
