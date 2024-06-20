import { useTheme } from "@emotion/react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import "../../../components/css/ModalAnimation.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useImageHostURL from "../../../hooks/useImageHostURL";
const UpdateTest = ({ test, open, setOpen, refetch, isPending }) => {
  const host_url = useImageHostURL();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  const slots = [
    "08.00 AM - 08.30 AM",
    "08.30 AM - 09.00 AM",
    "09.00 AM - 9.30 AM",
    "09.30 AM - 10.00 AM",
    "10.00 AM - 10.30 AM",
    "10.30 AM - 11.00 AM",
    "11.00 AM - 11.30 AM",
    "11.30 AM - 12.00 AM",
    "1.00 PM - 1.30 PM",
    "1.30 PM - 2.00 PM",
    "2.00 PM - 2.30 PM",
    "2.30 PM - 3.00 PM",
    "3.00 PM - 3.30 PM",
    "3.30 PM - 4.00 PM",
    "4.00 PM - 4.30 PM",
    "4.30 PM - 5.00 PM",
  ];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography?.fontWeightRegular
          : theme.typography?.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const handleUpdateTest = async (data) => {
    // console.log(data);
    const { testName, testPrice, testDetails, slots, testDate } = data;
    const imageFile = data.testImage[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axiosPublic.post(host_url, formData);
      if (res.data?.success) {
        const image = res.data.data?.display_url;
        const TestInfo = {
          testName: testName,
          testPrice: new Number(testPrice),
          testDetails: testDetails,
          slots: slots,
          testImageURL: image,
          testDate: format(testDate, "PP"),
        };
        const result = await axiosSecure.patch(
          `/allTests/${test?._id}`,
          TestInfo
        );
        // console.log(result.data);
        if (result?.data?.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success",
            text: "Test Updated Successfully",
            icon: "success",
          });
        }
      }
    }
  };
  return (
    <div>
      {isPending ? (
        <Loader />
      ) : (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          center
          classNames={{
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
          }}
          animationDuration={800}
        >
          <h2 className="text-center uppercase text-4xl font-bold  lora text-first-color ">
            Details of a TEST
          </h2>
          <form onSubmit={handleSubmit(handleUpdateTest)}>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-10 items-center  md:px-1 pr-1">
              {/* Test Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Test Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Test Name"
                  defaultValue={test?.testName}
                  {...register("testName", {
                    required: "Test Name field is required",
                  })}
                  className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                />
                {errors.testName?.type === "required" && (
                  <p className="text-red">{errors?.testName.message}</p>
                )}
              </div>

              {/* image upload field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Test Photo</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-accent  focus:outline-none focus:border-px focus:border-first-color w-full"
                  {...register("testImage", {
                    required: "Test Image is required",
                  })}
                />
                {errors.testImage?.type === "required" && (
                  <p className="text-red">{errors?.testImage.message}</p>
                )}
              </div>

              {/* Test Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Test Price</span>
                </label>
                <input
                  type="text"
                  placeholder="Test Price"
                  defaultValue={test?.testPrice}
                  {...register("testPrice", {
                    required: "Test Price field is required",
                  })}
                  className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                />
                {errors.testPrice?.type === "required" && (
                  <p className="text-red">{errors?.testPrice.message}</p>
                )}
              </div>

              {/* Test Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Test Date</span>
                </label>
                <input
                  type="date"
                  placeholder="Select Date"
                  defaultValue={test?.testDate.split("T")[0]}
                  {...register("testDate", {
                    required: "Test Date field is required",
                  })}
                  className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                />
                {errors.testDate?.type === "required" && (
                  <p className="text-red">{errors?.testDate.message}</p>
                )}
              </div>

              {/* Test Slots */}
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Test Slots</span>
                </label>
                <input
                  type="number"
                  placeholder="Test Price"
                  defaultValue={test?.slots || 0}
                  {...register("slots", {
                    required: "Slots field is required",
                  })}
                  className="input input-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                />
                {errors.slots?.type === "required" && (
                  <p className="text-red">{errors?.slots.message}</p>
                )}
              </div> */}
            </div>

            {/* Slots Test */}
            <div className="mt-10">
              <Controller
                name="slots"
                control={control}
                type="text"
                defaultValue={[]}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="slot-label">Select Slots</InputLabel>
                    <Select
                      {...field}
                      {...register("slots", { required: "Slots are required" })}
                      labelId="slot-label"
                      id="slots"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      defaultValue={test?.slots.forEach((slot) => {
                        slot;
                      })}
                      input={
                        <OutlinedInput id="slot-label" label="Select Slots" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {slots?.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              {errors.slots?.type === "required" && (
                <p className="text-red">{errors?.slots.message}</p>
              )}
            </div>

            {/* Test Details */}
            <div className="form-control mt-10">
              <label className="label">
                <span className="label-text">Test Details</span>
              </label>
              <textarea
                defaultValue={test?.testDetails}
                className="textarea  textarea-bordered w-full focus:outline-none focus:border-px focus:border-first-color"
                placeholder="Test Details"
                {...register("testDetails", {
                  required: "Test Details is Required",
                })}
              />
              {errors.testDetails?.type === "required" && (
                <p className="text-red">{errors?.testDetails.message}</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button className={`btn  bg-first-color `}>
                <span className="text-[#fff]">UPDATE TEST</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

UpdateTest.propTypes = {
  test: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  isPending: PropTypes.bool,
};

export default UpdateTest;
