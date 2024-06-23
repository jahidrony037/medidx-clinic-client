import Banner from "../components/Banner";
import ChooseCenter from "./ChooseCenter";
import Services from "./Services";

const Home = () => {
  return (
    <div className="space-y-24">
      <Banner />
      <Services />
      <ChooseCenter />
    </div>
  );
};

export default Home;
