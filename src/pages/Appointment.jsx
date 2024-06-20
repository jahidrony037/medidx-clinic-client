import { useState } from "react";
import AllTest from "./AllTest";
import AppointmentBanner from "./AppointmentBanner";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <AppointmentBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <AllTest selectedDate={selectedDate} />
    </div>
  );
};

export default Appointment;
