import { format } from "date-fns";
import PropTypes from "prop-types";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse justify-center items-center">
          <img
            src={`https://i.ibb.co/nscDmx4/overlay-mri-doctor.png`}
            alt="clinic"
            className="lg:max-w-lg md:max-w-md sm:max-w-sm rounded-lg lg:mt-56 shadow-2xl"
          />
          <div className="lg:mr-[325px] md:ml-[100px]sm:w-full lg:mt-56">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
            <p className="text-first-color font-bold">
              You Have Selected Date: {format(selectedDate, "PP")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AppointmentBanner.propTypes = {
  selectedDate: PropTypes.object,
  setSelectedDate: PropTypes.func,
};

export default AppointmentBanner;
