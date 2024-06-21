import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useBookingsTest from "../hooks/useBookingsTest";

const Cart = () => {
  // const { user } = useAuth();
  const [cart, isPending, refetch] = useBookingsTest();
  const totalPrice = cart?.reduce((sum, item) => {
    return item.testPrice + sum;
  }, 0);
  //   console.log(totalPrice);
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure you want to Cancel your booking?",
      text: "You Want to Delete this ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#47ccc8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/bookingsTest/${id}`)
          .then((res) => {
            // console.log(res.data);
            if (res.data) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your booking has been canceled.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };
  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-evenly">
        <h3 className="text-4xl text-black">Total Items : {cart.length}</h3>
        <h3 className="text-4xl text-black">Total Price : ${totalPrice} </h3>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="btn bg-first-color text-[#fff]">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="active-row cursor-pointer">
              <th>
                <label>NO</label>
              </th>
              <th>Email</th>
              <th>Test Name</th>
              <th>Appointment Date</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, i) => (
              <tr key={i} className="cursor-pointer hover">
                <td>{i + 1}</td>
                <td>{item?.email}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.testImageURL} alt={item?.testName} />
                      </div>
                    </div>
                    <div>{item?.testName}</div>
                  </div>
                </td>
                <td>{item?.appointmentDate}</td>
                <td>$ {item.testPrice}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost"
                  >
                    <MdDelete size={30} className="text-red-600" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
