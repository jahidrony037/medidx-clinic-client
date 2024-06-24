import PropTypes from "prop-types";
const Doctor = ({ doctor }) => {
  return (
    <div className="card bg-base-100 shadow-xl niramit">
      <figure className="px-10 pt-10">
        <img src={doctor?.doctorImage} alt="doctor" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{doctor?.doctorName}</h2>
        <h2 className="text-[#fff] bg-first-color rounded-full font-bold p-3">
          {doctor?.department}
        </h2>
        <p>{doctor?.doctorDetails}</p>
      </div>
    </div>
  );
};
Doctor.propTypes = {
  doctor: PropTypes.object,
};

export default Doctor;
