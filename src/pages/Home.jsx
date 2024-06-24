import Banner from "../components/Banner";
import ChooseCenter from "./ChooseCenter";
import ClinicStat from "./ClinicStat";
import MriScanning from "./MriScanning";
import Services from "./Services";

const Home = () => {
  return (
    <div className="space-y-28">
      <Banner />
      <Services />
      <ChooseCenter />
      <ClinicStat />
      <MriScanning />
    </div>
  );
};

export default Home;
