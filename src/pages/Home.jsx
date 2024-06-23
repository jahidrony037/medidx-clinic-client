import Banner from "../components/Banner";
import ChooseCenter from "./ChooseCenter";
import ClinicStat from "./ClinicStat";
import Services from "./Services";

const Home = () => {
  return (
    <div className="space-y-28">
      <Banner />
      <Services />
      <ChooseCenter />
      <ClinicStat/>
    </div>
  );
};

export default Home;
