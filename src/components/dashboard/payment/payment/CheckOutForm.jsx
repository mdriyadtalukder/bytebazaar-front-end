import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../authentication/authProvider/AuthProvider";
import Swal from "sweetalert2";
import { useAddPaymentMutation, useAddStripeMutation } from "../../../../RTK-Query/features/payment/paymentApi";
import { useDecreaseLaptopMutation, useGetAllProductQuery, useGetCartQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDeleteCheckoutMutation, useGetCheckoutQuery } from "../../../../RTK-Query/features/checkout/checkoutApi";

const CheckOutForm = () => {
    const { user } = useContext(AuthContext)
    const { data: check, isLoading: checkLoading } = useGetCheckoutQuery(user?.email);
    const [deleteCheckout] = useDeleteCheckoutMutation();
    const [decreaseLaptop] = useDecreaseLaptopMutation();
    const { data: laptops } = useGetAllProductQuery();

    const [error, setError] = useState('')
    const navigate = useNavigate('')
    // const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { data: cart } = useGetCartQuery(user?.email);
    const [addStripe, { data }] = useAddStripeMutation();
    const [addPayment] = useAddPaymentMutation();




    let totalPrice = 0;
    let totalQuantity = 0;

    for (let i = 0; i < cart?.length; i++) {
        totalPrice = totalPrice + Number(cart[i]?.productPrice) * Number(cart[i]?.quantity);
        totalQuantity = totalQuantity + Number(cart[i]?.quantity)
    }
    //console.log(totalPrice)

    useEffect(() => {
        if (totalPrice > 0) {
            addStripe({ price: totalPrice });
        }

    }, [addStripe, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error?.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(data?.clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })


        if (confirmError) {
            console.log('[confirm error]', confirmError);

        } else {
            console.log('[payment Intent]', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent?.id);
                console.log('transaction ID: ', paymentIntent?.id)

                const payment = {
                    email: user?.email,
                    name: check[0]?._id && check[0]?.name,
                    address: check[0]?._id && check[0]?.address,
                    city: check[0]?._id && check[0]?.city,
                    number: check[0]?._id && check[0]?.number,
                    transactionId: paymentIntent?.id,
                    price: totalPrice,
                    date: new Date(),
                    cartIds: cart.map(c => c?._id),
                    menuItemIds: cart.map(c => c?.cartId),
                    cartItems: cart,
                    status: 'Accepted',
                    method: 'Credit Card'

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

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you! Payment has completed successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                //navigate('/dashboard/booking');



            }
        }


    }
    //console.log(data?.clientSecret)
    //console.log(result?.result?.insertedId)
    
    return (
        <>
            <form className="w-1/2 mx-auto border-2 p-10" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary mt-2" type="submit" disabled={!stripe || !data?.clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600 font-bold">Your transaction ID: {transactionId}</p>}
            </form>
            {/* <button onClick={handler}>lllll</button> */}
        </>

    );
};

export default CheckOutForm;