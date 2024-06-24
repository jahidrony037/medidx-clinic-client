import { Link, useNavigate, useRouteError } from "react-router-dom";
import "./Errorpage.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div>
      <div className="mt-[100px]">
        <section className="page_404 container mx-auto">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">404</h1>
                  </div>

                  <div className="contant_box_404">
                    <h3 className="h2 text-4xl">Look like {`you're`} lost</h3>
                    <p className="text-4xl mb-5">
                      the page you are looking for {error.statusText}!
                    </p>
                    <div className="flex  items-center justify-center gap-5">
                      <Link
                        onClick={() => navigate("/")}
                        className="px-5 py-2 relative rounded  group overflow-hidden font-medium bg-purple-50 text-[#47ccc8] inline-block border-[1px] border-second-color"
                      >
                        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#47ccc8] group-hover:h-full opacity-90"></span>
                        <span className="relative group-hover:text-[#fff] font-bold">
                          Go Home
                        </span>
                      </Link>
                      <span className="text-4xl"> or </span>
                      <Link
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 relative rounded  group overflow-hidden font-medium bg-purple-50 text-[#47ccc8] inline-block border-[1px] border-second-color"
                      >
                        <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#47ccc8] group-hover:h-full opacity-90"></span>
                        <span className="relative group-hover:text-[#fff] font-bold">
                          Go Back
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ErrorPage;
