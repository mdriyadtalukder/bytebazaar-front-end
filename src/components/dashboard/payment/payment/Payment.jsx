import { useContext } from "react";
import { useDeleteCheckoutMutation, useGetCheckoutQuery } from "../../../../RTK-Query/features/checkout/checkoutApi";
import { AuthContext } from "../../../../authentication/authProvider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Payment = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading } = useGetCheckoutQuery(user?.email);
    const [deleteCheckout] = useDeleteCheckoutMutation();
    const clickCash = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "for cash on delivery, shipping charge is BDT-50 ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm order!"
        }).then((result) => {
            if (result.isConfirmed) {
                if (data[0]?._id) {
                    deleteCheckout(data[0]?._id);
                }
                Swal.fire({
                    title: "ordered!",
                    text: `Your order has placed successfully!!`,
                    icon: "success"
                });
            }
        });

    }
    return (

        <div className=" w-full h-full bg-indigo-100 flex justify-center items-center">
            <div className=" w-1/2 text-center p-6 rounded-lg shadow-lg  bg-base-100">
                <button onClick={clickCash} className=" p-3 me-2 bg-teal-400 rounded-lg text-white font-bold">Cash On Delivery</button>
                <Link to='/dashboard/card'><button className=" p-3 me-2 bg-indigo-400 rounded-lg text-white font-bold">Credit Card</button></Link>
                <Link to='/dashboard/bkash'><button className=" p-3 me-2 bg-pink-400 rounded-lg text-white font-bold">BKash</button></Link>
            </div>
        </div>

    );
};

export default Payment;