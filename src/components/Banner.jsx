import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "react-awesome-slider/dist/styles.css";
import "./css/Banner.css";
const Banner = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div>
      <AutoplaySlider play={true} cancelOnInteraction={false} interval={3000}>
        {/* <AwesomeSlider
              autoPlay={true}
              animation="cubeAnimation"
              organicArrows={"true"}
              interval={3000}
              cancelOnInteraction={false}
            > */}
        <div className="h-full w-full niramit">
          <div className="space-y-6 absolute text-center bg-second-color bg-opacity-25 h-full">
            <div className="pt-[20%]">
              <h2 className="lg:text-[75px] md:text-[40px] text-xl text-[#fff]  text-center font-bold leading-snug">
                Diagnostic <span className="text-first-color">Center</span>
              </h2>
            </div>
            <p className="lg:text-lg text-xs lg:leading-7 text-[#fff] w-[50%] mx-auto">
              Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus
              purus, pharetra quis tempus id, feugiat a augue. Etiam condimentum
              aliquam odio, ut consectetur enim. Nullam metus purus, pharetra
              quis tempus id, feugiat a augue.
            </p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/z4C6Jzx/diagonistic-center.jpg"
              alt=""
              className="object-center w-full"
            />
          </div>
        </div>
        <div className="  h-full w-full niramit">
          <div className="space-y-6 absolute text-center bg-second-color bg-opacity-25 h-full">
            <div className="pt-[20%]">
              <h2 className="lg:text-[75px] md:text-[40px] text-xl text-[#fff]  text-center font-bold leading-snug">
                Computer <span className="text-first-color">Diagnostics</span>
              </h2>
            </div>
            <p className="lg:text-lg text-xs lg:leading-7 text-[#fff] w-[50%] mx-auto">
              Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus
              purus, pharetra quis tempus id, feugiat a augue. Etiam condimentum
              aliquam odio, ut consectetur enim. Nullam metus purus, pharetra
              quis tempus id, feugiat a augue.
            </p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/C6GhZ86/computer-diagonistics.jpg"
              alt=""
              className="object-center w-full"
            />
          </div>
        </div>
        <div className="h-full w-full niramit">
          <div className="space-y-6 absolute text-center bg-second-color bg-opacity-25 h-full">
            <div className="pt-[20%]">
              <h2 className="lg:text-[75px] md:text-[40px] text-xl text-[#fff]  text-center font-bold leading-snug">
                Medical <span className="text-first-color">Laboratory</span>
              </h2>
            </div>
            <p className="lg:text-lg text-xs lg:leading-7 text-[#fff] w-[50%] mx-auto">
              Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus
              purus, pharetra quis tempus id, feugiat a augue. Etiam condimentum
              aliquam odio, ut consectetur enim. Nullam metus purus, pharetra
              quis tempus id, feugiat a augue.
            </p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/g3HVbZj/medical-labratory.jpg"
              alt=""
              className="w-full object-center"
            />
          </div>
        </div>
        <div className="h-full w-full niramit">
          <div className="space-y-6 absolute text-center bg-second-color bg-opacity-25 h-full">
            <div className="pt-[20%]">
              <h2 className="lg:text-[75px] md:text-[40px] text-xl text-[#fff]  text-center font-bold leading-snug">
                Leading <span className="text-first-color">Doctors</span>
              </h2>
            </div>
            <p className="lg:text-lg text-xs lg:leading-7 text-[#fff] w-[50%] mx-auto">
              Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus
              purus, pharetra quis tempus id, feugiat a augue. Etiam condimentum
              aliquam odio, ut consectetur enim. Nullam metus purus, pharetra
              quis tempus id, feugiat a augue.
            </p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/2nNtqvK/leading-doctors.jpg"
              alt=""
              className="object-center w-full"
            />
          </div>
        </div>
        {/* </AwesomeSlider> */}
      </AutoplaySlider>
    </div>
  );
};

export default Banner;
