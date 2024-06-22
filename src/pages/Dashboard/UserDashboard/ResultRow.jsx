import PropTypes from "prop-types";
import { GoDownload } from "react-icons/go";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const ResultRow = ({ result, idx }) => {
  const axiosSecure = useAxiosSecure();
  const handleDownloadResult = async (result) => {
    // console.log("Result Download kora hobe ", result);
    const { data } = await axiosSecure.get(`/downloadResult/${result?._id}`);
    // console.log(data);
    const url = data;
    const fileName = `${result?.testName}.pdf`;
    // console.log(fileName);
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error("Report link not found");
    }
  };
  return (
    <tr className="hover">
      <th>
        <label>{idx + 1}</label>
      </th>

      <td>{result?.email}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={result?.testImageURL} alt={result?.testName} />
            </div>
          </div>
          <div>{result?.testName}</div>
        </div>
      </td>
      <td>{result?.appointmentDate}</td>
      <th>
        {result && result?.reportStatus === "pending" ? (
          "pending"
        ) : (
          <button
            onClick={() => handleDownloadResult(result)}
            className="btn text-[#fff] bg-first-color"
          >
            DownLoad Result
            <GoDownload size={30} className="cursor-pointer" />
          </button>
        )}
      </th>
      {/* <th>
        Not Paid <button className="btn bg-first-color text-[#fff]">pay</button>
      </th> */}
    </tr>
  );
};

ResultRow.propTypes = {
  result: PropTypes.object,
  idx: PropTypes.number,
};

export default ResultRow;
