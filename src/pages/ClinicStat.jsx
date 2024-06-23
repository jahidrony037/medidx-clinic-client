import CountUp from "react-countup";

const ClinicStat = () => {
  return (
    <div>
      <div className="">
        <img
          src="https://i.ibb.co/dcRVWX0/removal-ai-7fd5f3d4-3494-41c7-8911-b324a91dfb1a-team-group-7-LA1-SH.png"
          alt="doctor_team"
          className="object-contain w-full"
        />
      </div>
      <div className="rounded-lg bg-[#FFFFFF] md:p-10 md:mx-10  md:-mt-10 sticky z-20">
        <div className=" grid grid-cols-1 md:grid-cols-3 z-80">
          <div className="px-[45px] my-[25px] md:border-r-[1px] md:border-dashed ">
            <h2 className="text-first-color font-bold text-4xl text-center">
              <CountUp end={86} duration={5} />
            </h2>
            <p className="text-center text-second-color text-lg font-bold">
              Qualified doctors
            </p>
          </div>
          <div className="px-[45px] my-[25px] md:border-r-[1px] md:border-dashed ">
            <h2 className="text-first-color font-bold text-4xl text-center">
              <CountUp end={19} duration={5} />
            </h2>
            <p className="text-center text-second-color text-lg font-bold">
              Diagnostic departments
            </p>
          </div>
          <div className="px-[45px] my-[25px]  ">
            <h2 className="text-first-color font-bold text-4xl text-center">
              <CountUp end={27} duration={5} />
            </h2>
            <p className="text-center text-second-color text-lg font-bold">
              Years of experience
            </p>
          </div>
          <div className="px-[45px] my-[25px] md:border-r-[1px] md:border-dashed ">
            <h2 className="text-first-color font-bold text-4xl text-center">
              <CountUp end={50} duration={5} />+
            </h2>
            <p className="text-center text-second-color text-lg font-bold">
              Patients every day
            </p>
          </div>
          <div className="px-[45px] my-[25px] md:border-r-[1px] md:border-dashed ">
            <h2 className="text-first-color font-bold text-4xl text-center">
              <CountUp end={99} duration={5} />%
            </h2>
            <p className="text-center text-second-color text-lg font-bold">
              Diagnosis accuracy
            </p>
          </div>
          <div className="px-[45px] my-[25px]  ">
            <h2 className="text-first-color font-bold text-4xl text-center">
              <CountUp end={6} duration={5} />
            </h2>
            <p className="text-center text-second-color text-lg font-bold">
              Branches in the country
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicStat;
