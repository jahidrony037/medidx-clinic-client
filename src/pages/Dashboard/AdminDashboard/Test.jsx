import PropTypes from "prop-types";
import { useState } from "react";
import UpdateTest from "./UpdateTest";
const Test = ({ test, idx, handleDeleteTest, refetch, isPending }) => {
  const [open, setOpen] = useState(false);
  return (
    <tr>
      <th>
        <label>{idx + 1}</label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-14 h-14">
              <img
                src={test?.testImageURL}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
        </div>
      </td>
      <td>{test.testName}</td>
      <td>{test.testPrice} BDT</td>
      <th className="space-x-5">
        <button
          onClick={() => {
            // handleUpdateTest(test);
            setOpen(true);
          }}
          className="btn bg-first-color text-[#fff]"
        >
          Update
        </button>

        <button
          onClick={() => handleDeleteTest(test)}
          className="btn btn-error text-[#fff]"
        >
          Delete
        </button>
        <UpdateTest
          refetch={refetch}
          setOpen={setOpen}
          open={open}
          test={test}
          isPending={isPending}
        />
      </th>
    </tr>
  );
};

Test.propTypes = {
  test: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  handleDeleteTest: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  isPending: PropTypes.bool,
};

export default Test;
