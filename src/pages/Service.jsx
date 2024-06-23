import PropTypes from "prop-types";
const Service = ({ service }) => {
  return (
    <div>
      <div className="py-[35px] px-[5px] rounded-lg  md:h-[200px] bg-base-100 cursor-pointer hover:bg-second-color hover:text-[#ffffff]">
        <img
          src={service?.featureImage}
          alt="feature Image"
          className="w-[80px] h-[80px] mx-auto"
        />
        <p className="text-[18px] text-center mt-[16px] text-second-color font-semibold hover:text-[#ffffff] ">
          {service?.featureName}
        </p>
      </div>
    </div>
  );
};

Service.propTypes = {
  service: PropTypes.object,
};

export default Service;
