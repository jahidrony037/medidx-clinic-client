import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="mx-auto flex items-center justify-center min-h-screen">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"   
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
