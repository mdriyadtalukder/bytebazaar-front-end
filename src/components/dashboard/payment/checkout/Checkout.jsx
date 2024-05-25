import { useContext } from "react";
import { AuthContext } from "../../../../authentication/authProvider/AuthProvider";
import { useAddCheckoutMutation } from "../../../../RTK-Query/features/checkout/checkoutApi";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const [addCheckout, { isLoading, error }] = useAddCheckoutMutation()
    const navigate = useNavigate('');

    const handleCheckout = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name?.value;
        const address = form.address?.value;
        const city = form.city?.value;
        const num = form.num?.value;
        addCheckout({
            name: name,
            email: user?.email,
            address: address,
            city: city,
            number: num
        })
        Swal.fire({
            position: "top-start",
            icon: "success",
            title: "Checkout has submitted successfully",
            showConfirmButton: false,
            timer: 1500
        });
        navigate('/dashboard/payment')
    }
    return (
        <div className="bg-indigo-100 dark:bg-gray-900 w-full">
            <div className="w-full max-w-3xl mx-auto p-8">
                <form onSubmit={handleCheckout} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>

                        <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-white mb-1">Name</label>
                            <input name='name' type="text" id="name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                        </div>


                        <div className="mt-4">
                            <label htmlFor="address" className="block text-gray-700 dark:text-white mb-1">Address</label>
                            <input name='address' type="text" id="address" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                        </div>


                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">City</label>
                                <input name='city' type="text" id="city" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                            </div>
                            <div>
                                <label htmlFor="num" className="block text-gray-700 dark:text-white mb-1">Phone number</label>
                                <input name='num' type="tel" id="num" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="bg-teal-400 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Place Order</button>

                </form>
                {error && <p className="font-bold text-red-500 text-center">{error}</p>}
                <Link to='/dashboard/payment'>Payment</Link>

            </div>

        </div >
    );
};

export default Checkout;