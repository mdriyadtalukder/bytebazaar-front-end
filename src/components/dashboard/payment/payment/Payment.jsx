import { useContext } from "react";
import { useDeleteCheckoutMutation, useGetCheckoutQuery } from "../../../../RTK-Query/features/checkout/checkoutApi";
import { AuthContext } from "../../../../authentication/authProvider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAddCoinMutation, useDecreaseLaptopMutation, useEditCoinMutation, useGetAllProductQuery, useGetCartQuery, useGetCoinQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import { useAddPaymentMutation, useDeleteBkashSuccessMutation, useGetBkashSucessQuery } from "../../../../RTK-Query/features/payment/paymentApi";
import axios from "axios";
import Loading from "../../../loading/Loading";

const Payment = () => {
    const { user } = useContext(AuthContext);
    const { data: check, isLoading: checkLoading } = useGetCheckoutQuery(user?.email);
    const [deleteCheckout] = useDeleteCheckoutMutation();
    const { data: cart } = useGetCartQuery(user?.email);
    const [addPayment] = useAddPaymentMutation();
    const [decreaseLaptop] = useDecreaseLaptopMutation();
    const { data: laptops } = useGetAllProductQuery();
    const { data: success } = useGetBkashSucessQuery();
    const [deleteBkashSuccess] = useDeleteBkashSuccessMutation();

    const { data: coin } = useGetCoinQuery(user?.email);
    const [addCoin] = useAddCoinMutation();
    const [editCoin] = useEditCoinMutation();

    let totalPrice = 0;
    let totalQuantity = 0;

    for (let i = 0; i < cart?.length; i++) {
        totalPrice = totalPrice + Number(cart[i]?.productPrice) * Number(cart[i]?.quantity);
        totalQuantity = totalQuantity + Number(cart[i]?.quantity)
    }
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                const payment = {
                    email: user?.email,
                    name: check[0]?._id && check[0]?.name,
                    address: check[0]?._id && check[0]?.address,
                    city: check[0]?._id && check[0]?.city,
                    number: check[0]?._id && check[0]?.number,
                    transactionId: 'N/A',
                    price: totalPrice + 50,
                    date: new Date(),
                    cartIds: cart.map(c => c?._id),
                    menuItemIds: cart.map(c => c?.cartId),
                    cartItems: cart,
                    status: 'Pending',
                    method: 'Cash On Delivery'

                }

                const result = await addPayment(payment).unwrap();
                console.log('payment saved id', result?.result?.insertedId);
                if (result?.result?.insertedId) {
                    for (let i = 0; i < cart?.length; i++) {
                        const laptop = laptops?.find(c => c?._id === cart[i]?.cartId);
                        decreaseLaptop({
                            id: cart[i]?.cartId,
                            data: {
                                productQuantity: Number(laptop?.productQuantity) - Number(cart[i].quantity)
                            }
                        })
                    }

                    if (check[0]?._id) {
                        deleteCheckout(check[0]?._id);
                    }
                    if (coin?._id) {
                        editCoin({
                            id: coin?._id,
                            data: {
                                coins: Number(coin?.coins) + (Number(totalPrice / 1000))
                            }
                        })
                    }
                    else {
                        addCoin({
                            email: user?.email,
                            coins: Number(totalPrice) / 1000,
                        })
                    }
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you! Payment has completed successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });

    }

    const bKashPayment = async () => {
        try {
            const { data } = await axios.post('https://bytebazaar-back-end.onrender.com/api/bkash/payment/create',
                {
                    amount: totalPrice,
                    orderId: 1,
                    email: user?.email,
                    name: check[0]?._id && check[0]?.name,
                    address: check[0]?._id && check[0]?.address,
                    city: check[0]?._id && check[0]?.city,
                    number: check[0]?._id && check[0]?.number,
                    date: new Date(),
                    cartIds: cart.map(c => c?._id),
                    menuItemIds: cart.map(c => c?.cartId),
                    cartItems: cart,
                    method: 'BKash',
                })
            window.location.href = data.bkashURL;
            console.log(data)


        } catch (error) {
            console.log(error.response.data)
        }

    }

    return (

        <>
            {checkLoading ? <Loading></Loading> :
                <div className=" w-full h-full bg-indigo-100 flex justify-center items-center">
                    <div className=" w-1/2 text-center p-6 rounded-lg shadow-lg  bg-base-100">
                        <button onClick={clickCash} className=" p-3 me-2 bg-teal-400 rounded-lg text-white font-bold">Cash On Delivery</button>
                        <Link to='/dashboard/card'><button className=" p-3 me-2 bg-indigo-400 rounded-lg text-white font-bold">Credit Card</button></Link>
                        <button onClick={bKashPayment} className=" p-3 me-2 bg-pink-400 rounded-lg text-white font-bold">BKash</button>
                    </div>
                </div>
            }
        </>

    );
};

export default Payment;