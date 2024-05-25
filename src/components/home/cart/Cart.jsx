import { useGetCartQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import SingleCart from "./SingleCart";
import Loading from "../../loading/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import {  useNavigate } from "react-router-dom";
import { useDeleteCheckoutMutation, useGetCheckoutQuery } from "../../../RTK-Query/features/checkout/checkoutApi";

const Cart = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetCartQuery(user?.email);
    const { data: check, isLoading: checkLoading } = useGetCheckoutQuery(user?.email);
    const [deleteCheckout] = useDeleteCheckoutMutation();
    const navigate = useNavigate('');


    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No Cart found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data?.map((d) => <SingleCart key={d?._id} d={d}></SingleCart>)
    }

    const clickCheckout = (e) => {
        e.preventDefault();
        if (check[0]?._id) {
            deleteCheckout(check[0]?._id);
        }
        navigate('/dashboard/checkout');

    }
    let totalPrice = 0;
    let totalQuantity = 0;

    for (let i = 0; i < data?.length; i++) {
        totalPrice = totalPrice + Number(data[i]?.productPrice) * Number(data[i]?.quantity);
        totalQuantity = totalQuantity + Number(data[i]?.quantity)
    }

    return (
        <div className="bg-indigo-100 h-full w-full py-8">
            {
                isLoading ? <Loading></Loading> : checkLoading ? <Loading></Loading> :
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-3/4 ">
                                <div className="bg-base-100 rounded-lg shadow-md p-6 mb-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-left font-bold">Product</th>
                                                <th className="text-left font-bold">Price</th>
                                                <th className="text-left font-bold">Quantity</th>
                                                <th className="text-left font-bold">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {content}

                                        </tbody>
                                    </table>
                                </div>



                            </div>
                            <div className="md:w-1/4">
                                <div className="bg-base-100 rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-bold mb-4">Summary</h2>
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span><span className="font-bold text-2xl">৳</span>{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Shipping</span>
                                        <span><span className="font-bold text-2xl">৳</span>{totalQuantity * 10}</span>
                                    </div>

                                    <div className="flex justify-between mb-2 border-t-2 border-indigo-400">
                                        <span className="font-bold">Total</span>
                                        <p className="font-bold me-2"><span className="font-bold text-2xl">৳</span>{(totalQuantity * 10) + totalPrice}</p>
                                    </div>
                                    <button onClick={clickCheckout} className="bg-indigo-400 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Cart;