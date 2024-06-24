import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useImageHostURL from "../../../hooks/useImageHostURL";

const AddBanner = () => {
  const host_url = useImageHostURL();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const {
      bannerName,
      bannerTitle,
      bannerDescription,
      couponCode,
      couponRate,
      bannerActive,
    } = data;
    // console.log(data);
    const imageFile = data.bannerImage[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axiosPublic.post(host_url, formData);
      if (res.data?.success) {
        const image = res.data.data?.display_url;
        const bannerInfo = {
          bannerName: bannerName,
          bannerTitle: bannerTitle,
          bannerImageURL: image,
          bannerDescription: bannerDescription,
          couponCode: couponCode,
          couponRate: couponRate,
          bannerActive: bannerActive,
        };
        const result = await axiosSecure.post("/addBanner", bannerInfo);
        // console.log(result.data);
        if (result?.data?.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Banner Added Successfully",
            icon: "success",
          });
        }
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>MediDX || AddBanner</title>
      </Helmet>
      <h2 className="text-4xl font-bold md:mt-10 text-first-color lora text-center uppercase">
        Here Add Banner
      </h2>
      <div className="mt-10 shadow-lg p-9 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-10 items-center  md:px-1 pr-1">
            {/* Banner Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Banner Name</span>
              </label>
              <input
                type="text"
                placeholder="Banner Name"
                {...register("bannerName", {
                  required: "Banner Name field is required",
                })}
                className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              />
              {errors.bannerName?.type === "required" && (
                <p className="text-red">{errors?.bannerName.message}</p>
              )}
            </div>

            {/* image upload field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Banner Photo</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-accent  focus:outline-none focus:border-px focus:border-first-color w-full"
                {...register("bannerImage", {
                  required: "Banner Image is required",
                })}
              />
              {errors.bannerImage?.type === "required" && (
                <p className="text-red">{errors?.bannerImage.message}</p>
              )}
            </div>

            {/* Banner Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Banner Title</span>
              </label>
              <input
                type="text"
                placeholder="Banner Title"
                {...register("bannerTitle", {
                  required: "Banner Title field is required",
                })}
                className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              />
              {errors.bannerTitle?.type === "required" && (
                <p className="text-red">{errors?.bannerTitle.message}</p>
              )}
            </div>

            {/* Coupon Code Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon Code Name</span>
              </label>
              <input
                type="text"
                placeholder="Coupon Code"
                {...register("couponCode", {
                  required: "Coupon Code  field is required",
                })}
                className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              />
              {errors.couponCode?.type === "required" && (
                <p className="text-red">{errors?.couponCode.message}</p>
              )}
            </div>

            {/* Coupon Rate */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon Rate</span>
              </label>
              <input
                type="number"
                placeholder="Coupon Rate"
                {...register("couponRate", {
                  required: "Coupon Rate  field is required",
                })}
                className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              />
              {errors.couponRate?.type === "required" && (
                <p className="text-red">{errors?.couponRate.message}</p>
              )}
            </div>

            {/* Banner Status */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Banner Active</span>
              </label>
              <select
                className="select select-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                {...register("bannerActive", { required: true })}
              >
                <option disabled defaultValue={"Select Banner Status"}>
                  Select Banner Status
                </option>
                <option value="False">False</option>
                <option value="True">True</option>
              </select>
              {errors?.bannerActive?.type === "required" && (
                <p className="text-red">This field is Required</p>
              )}
            </div>
          </div>
          {/* Banner Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Banner Description</span>
            </label>
            <textarea
              className="textarea  textarea-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              placeholder="Banner Description"
              {...register("bannerDescription", {
                required: "Banner Description is Required",
              })}
            />
            {errors.bannerDescription?.type === "required" && (
              <p className="text-red">{errors?.bannerDescription?.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button className={`btn  bg-first-color `}>
              <span className="text-[#fff]">Add Banner</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
