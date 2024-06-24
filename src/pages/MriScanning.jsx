const MriScanning = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 niramit">
      <div>
        <h2 className="text-[48px] text-first-color font-bold text-center md:text-left">
          The Most Modern
        </h2>
        <h2 className="text-[48px] text-second-color font-bold mt-4 text-center md:text-left">
          MRI Scanner Testing
        </h2>
        <p className="lora text-lg mt-7 text-justify">
          Magnetic Resonance Imaging (MRI) is a medical imaging technique used
          to create detailed images of the organs and tissues in the body. MRI
          scanners employ strong magnetic fields, radio waves, and field
          gradients to generate images.
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 mt-8">
          <div className="flex flex-row justify-between gap-4">
            <img src="https://i.ibb.co/LQbysqn/neuro.png" alt="brain" />
            <div>
              <h3 className="text-[24px] font-bold text-second-color">
                Brain and Vessels
              </h3>
              <p className="lora text-lg">
                Pellentesque erat erat, dapibus non laoreet eu, tincidunt quis
                ante.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <img src="https://i.ibb.co/LQbysqn/neuro.png" alt="brain" />
            <div>
              <h3 className="text-[24px] font-bold text-second-color">
                Mammary Gland
              </h3>
              <p className="lora text-lg">
                Pellentesque erat erat, dapibus non laoreet eu, tincidunt quis
                ante.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <img src="https://i.ibb.co/L9L6kBC/ortho.png" alt="brain" />
            <div>
              <h3 className="text-[24px] font-bold text-second-color">
                Spine and Joints
              </h3>
              <p className="lora text-lg">
                Pellentesque erat erat, dapibus non laoreet eu, tincidunt quis
                ante.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <img src="https://i.ibb.co/LQbysqn/neuro.png" alt="brain" />
            <div>
              <h3 className="text-[24px] font-bold text-second-color">
                Internal organs
              </h3>
              <p className="lora text-lg">
                Pellentesque erat erat, dapibus non laoreet eu, tincidunt quis
                ante.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className=" btn rounded-full bg-second-color text-[#fff] mt-10 ">
            Send Request
          </button>
        </div>
      </div>
      <div>
        <img
          src="https://i.ibb.co/nscDmx4/overlay-mri-doctor.png"
          alt="mri"
          className="object-center w-full"
        />
      </div>
    </div>
  );
};

export default MriScanning;
