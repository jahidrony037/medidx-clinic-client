import { Link } from "react-router-dom";

const ChooseCenter = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col gap-5 niramit md:justify-between">
        <div className="md:w-[48%]">
          <h3 className="text-lg text-first-color font-bold text-center md:text-left">About Clinic</h3>
          <h2 className="text-[48px] text-second-color font-bold text-center md:text-left">
            Why Patients Choose <br /> Our Center
          </h2>
          <p className="text-[16px] lora mt-5 text-justify">
            Our diagnostic center is equipped with the latest and most advanced
            medical technology, ensuring accurate and reliable test results.Our
            team comprises highly skilled and experienced doctors, radiologists,
            and technicians who are dedicated to providing the highest level of
            care.We offer a wide range of diagnostic services, from routine
            blood tests to advanced imaging, all under one roof for the
            convenience of our patients.
          </p>
          <Link
            to="/about"
            className="btn bg-first-color btn-lg text-[#ffffff] rounded-full mt-8"
          >
            Read More
          </Link>
        </div>
        <div className="md:w-[48%]">
          <h3 className="text-lg text-first-color font-bold text-center md:text-left">Clinic Skills</h3>
          <h2 className="text-[48px] text-center md:text-left text-second-color font-bold">
            Our Specialization
          </h2>
          <div className="flex  flex-wrap justify-center gap-5 items-center md:justify-between mt-7">
            <div
              className="radial-progress bg-[#fff] text-first-color"
              style={{
                "--value": 85,
                "--size": "12rem",
                "--thickness": "1rem",
              }}
              role="progressbar"
            >
              <span className="text-3xl font-bold text-center">85%</span>
              <span className="text-second-color text-lg font-semibold">
                Neurosurgery
              </span>
            </div>
            <div
              className="radial-progress bg-[#fff] text-first-color"
              style={{
                "--value": 68,
                "--size": "12rem",
                "--thickness": "1rem",
              }}
              role="progressbar"
            >
              <span className="text-3xl font-bold text-center">68%</span>
              <span className="text-second-color text-lg font-semibold">
                MRI-diagnostic
              </span>
            </div>
            <div
              className="radial-progress bg-[#fff] text-first-color"
              style={{
                "--value": 79,
                "--size": "12rem",
                "--thickness": "1rem",
              }}
              role="progressbar"
            >
              <span className="text-3xl font-bold text-center">79%</span>
              <span className="text-second-color text-lg font-semibold">
                {" "}
                Cardiology
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCenter;
