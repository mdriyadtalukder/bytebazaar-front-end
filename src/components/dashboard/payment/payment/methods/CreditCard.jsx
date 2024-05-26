import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../CheckOutForm";

//add publishable key!
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const CreditCard = () => {
    return (


        <div className="w-full h-full bg-indigo-100 p-4 flex justify-center items-center">
            <div className="bg-base-100 w-full rounded-lg shadow-lg p-2 ">
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>


    );
};

export default CreditCard;