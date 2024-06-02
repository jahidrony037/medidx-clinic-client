import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";

const TopBar = () => {
  return (
    <>
      <div className="flex items-center justify-evenly md:justify-start md:pl-9 h-[53px] gap-5 md:gap-10">
        <div className="flex items-center gap-2">
          <FaPhoneSquareAlt className="text-second-color" />
          <p className="lora text-first-color md:text-lg text-[8px]">
            Hotline:{" "}
            <span className="text-second-color"> +3 (092) 508-38-01 </span>{" "}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaLocationDot className="text-second-color" />
          <p className="lora text-first-color md:text-lg text-[8px]">
            Address:
            <span className="text-second-color">
              {" "}
              23, Medical Str., Dhaka
            </span>{" "}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <IoTime className="text-second-color" />
          <p className="lora text-first-color md:text-lg text-[8px]">
            Mon-Sat:
            <span className="text-second-color"> 8:00AM - 7:00PM </span>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default TopBar;
