import { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import "./css/Banner.css";
const Banner = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const axiosPublic = useAxiosPublic();
  const [banner, setBanner] = useState(null);
  // const {
  //   data: banner = {},
  //   // isPending,
  // } = useQuery({
  //   queryKey: ["data"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/activeBanner");
  //     return res.data;
  //   },
  // });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosPublic.get("/activeBanner");
      setBanner(res.data);
    };
    fetchData();
  }, [axiosPublic]);
  // console.log(banner);
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
            <div className="md:pt-[20%] pt-[5%]">
              <h2 className="lg:text-[75px] md:text-[40px] text-xl text-[#fff]  text-center font-bold leading-snug mb-2">
                {banner?.bannerTitle && banner?.bannerTitle?.split(" ")[0]}
                <span className="text-first-color pl-3">
                  {banner?.bannerTitle && banner?.bannerTitle?.split(" ")[1]}
                </span>
              </h2>
              <div className="flex items-center justify-center gap-5 bg-[#fff] rounded-full md:h-20 h-12 md:w-[40%] w-[90%] m-auto py-6">
                <h2 className="text-center text-first-color font-bold md:text-xl">
                  CouponCode : {banner?.couponCode}
                </h2>
                <h2 className="text-first-color font-bold md:text-xl">
                  For Discount {banner?.couponRate} %
                </h2>
              </div>
            </div>
            <p className="lg:text-lg text-xs lg:leading-7 text-[#fff] md:w-[50%] mx-auto mt-1">
              {banner?.bannerDescription}
            </p>
            <Link to={"/allTest"} className="btn bg-first-color text-[#fff]">
              Explore Tests
            </Link>
          </div>
          <div>
            <img
              src={banner?.bannerImageURL}
              alt=""
              className="object-center w-full"
            />
          </div>
        </div>
        {/* <div className="  h-full w-full niramit">
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
        </div> */}
        {/* </AwesomeSlider> */}
      </AutoplaySlider>
    </div>
  );
};

export default Banner;
