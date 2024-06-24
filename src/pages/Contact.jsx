import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>MediDX || Contact</title>
      </Helmet>
      <div className="bg-[url('https://i.ibb.co/ypBSgK4/doctors.png')] bg-no-repeat bg-center bg-cover h-[570px] md:h-[700px] grid grid-cols-12 md:pl-4 rounded-3xl text-white niramit">
        <div className="md:col-span-5 col-span-12 space-y-8">
          <h2 className="lg:text-4xl text-2xl font-medium pb-2 text-center md:text-left md:pt-10 pt-2">
            Get your Appointment
          </h2>
          <p>
            Get in touch with us and our experts and developers would love to
            contribute their expertise and insights and help you today.
          </p>
          <div className="space-y-5">
            <div className="flex gap-5 ">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full max-w-xs focus:outline-none focus:border-first-color"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full max-w-xs focus:outline-none focus:border-first-color"
              />
            </div>
            <div className="flex gap-5">
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs focus:outline-none focus:border-first-color"
              />
              <input
                type="number"
                placeholder="Mobile"
                className="input input-bordered w-full max-w-xs focus:outline-none focus:border-first-color"
              />
            </div>
            <div>
              <textarea
                placeholder="Your message"
                className="textarea textarea-bordered textarea-lg w-full focus:outline-none focus:border-first-color"
              ></textarea>
            </div>
            <div>
              <button className="px-5 py-2 w-[217px] relative rounded  group overflow-hidden font-medium bg-purple-50 text-[#fff] inline-block border-[1px] border-second-color">
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-second-color group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white font-bold">
                  Send Email
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="md:col-span-7 col-span-0"></div>
      </div>
    </div>
  );
};

export default Contact;
