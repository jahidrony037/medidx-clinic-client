import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useImageHostURL from "../../../hooks/useImageHostURL";

const AddDoctor = () => {
  const host_url = useImageHostURL();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const { doctorName, doctorDetails, department } = data;

    const imageFile = data.doctorImage[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axiosPublic.post(host_url, formData);
      if (res.data?.success) {
        const image = res.data.data?.display_url;
        const doctorInfo = {
          doctorName: doctorName,
          doctorImage: image,
          department: department,
          doctorDetails: doctorDetails,
        };
        const result = await axiosSecure.post("/addDoctor", doctorInfo);
        if (result?.data?.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Doctor Added Successfully",
            icon: "success",
          });
          reset();
        }
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>MediDX || AddDoctor</title>
      </Helmet>
      <h2 className="text-4xl font-bold md:mt-10 text-first-color lora text-center uppercase">
        Add Doctor
      </h2>

      <div className="mt-20 shadow-lg p-9 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid  grid-cols-1 gap-10 items-center  md:px-1 pr-1">
            {/* Doctor Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Doctor Name</span>
              </label>
              <input
                type="text"
                placeholder="Doctor Name"
                name="name"
                {...register("doctorName", {
                  required: "Doctor Name field is required",
                })}
                className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
              />
              {errors.doctorName?.type === "required" && (
                <p className="text-red">{errors?.doctorName.message}</p>
              )}
            </div>

            {/*doctor image upload field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Doctor Photo</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-accent  focus:outline-none focus:border-px focus:border-first-color w-full"
                {...register("doctorImage", {
                  required: "Doctor Image is required",
                })}
              />
              {errors.doctorImage?.type === "required" && (
                <p className="text-red">{errors?.doctorImage.message}</p>
              )}
            </div>

            {/* Department */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Department</span>
              </label>
              <select
                className="select select-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                {...register("department", { required: true })}
              >
                <option disabled value="default">
                  Select Department
                </option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurosurgery">Neurosurgery</option>
                <option value="Surgery">Surgery</option>
                <option value="Urology">Urology</option>
              </select>
              {errors.department?.type === "required" && (
                <p className="text-red">Department is Required</p>
              )}
            </div>

            {/* Doctor Details */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Doctor Details</span>
              </label>
              <textarea
                className="textarea  textarea-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                placeholder="Test Details"
                {...register("doctorDetails", {
                  required: "Doctor Details is Required",
                })}
              />
              {errors.doctorDetails?.type === "required" && (
                <p className="text-red">{errors?.doctorDetails.message}</p>
              )}
            </div>
          </div>

          <div className="form-control mt-6">
            <button className={`btn  bg-first-color text-[#fff]`}>
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
