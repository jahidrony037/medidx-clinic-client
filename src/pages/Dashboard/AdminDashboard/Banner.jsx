import PropTypes from "prop-types";
const Banner = ({
  idx,
  banner,
  handleDeleteBanner,
  handleBannerStatusChange,
}) => {
  return (
    <tr className="cursor-pointer hover text-second-color">
      <th>
        <label>{idx + 1}</label>
      </th>
      <td>
        <div>
          <div className="font-bold uppercase">{banner?.bannerName}</div>
        </div>
      </td>
      <th>{banner?.bannerTitle}</th>
      <th className="uppercase">{banner?.couponCode}</th>
      <td>{banner?.couponRate} %</td>
      <th
        className={`${
          banner?.bannerActive === "True" ? "text-green" : "text-red"
        }`}
      >
        <span className="pr-2">{banner?.bannerActive}</span>
        <button
          title={`${
            banner?.bannerActive === "True"
              ? "can you stop showing on ui?"
              : "can you show on ui?"
          }`}
          onClick={() => handleBannerStatusChange(banner)}
          className="btn bg-first-color btn-xs"
        >
          <span className="text-[#fff]">
            {banner?.bannerActive === "True" ? "False" : "True"}
          </span>
        </button>
      </th>

      <th>
        <button
          onClick={() => handleDeleteBanner(banner)}
          className="btn btn-error"
        >
          <span className="text-[#fff]">Delete</span>
        </button>
      </th>
    </tr>
  );
};

Banner.propTypes = {
  banner: PropTypes.object.isRequired,
  idx: PropTypes.number,
  handleDeleteBanner: PropTypes.func.isRequired,
  handleBannerStatusChange: PropTypes.func.isRequired,
};

export default Banner;
