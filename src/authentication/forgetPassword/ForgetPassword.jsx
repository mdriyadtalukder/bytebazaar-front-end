import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../../components/loading/Loading";

const ForgetPassword = () => {
    const { forgetPassword } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleForgetPassword = (e) => {
        setLoading(true)
        e.preventDefault();
        setError('');
        const form = e.target;
        const email = form.email.value;
        forgetPassword(email)
            .then(() => {
                setLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sent a mail to your email for changing your password!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                setError(err);
                setLoading(false)

            });
    }

    return (
        <>
            {
                loading ? <Loading></Loading> :
                    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
                        <Helmet>
                            <title>ByteBazaar | Forget password</title>
                        </Helmet>
                        <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-indigo-400 dark:border-indigo-400 border-2 border-indigo-400">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <div className='text-center'>
                                        <Link to='/' className="text-xl font-bold uppercase">
                                            <span className='text-indigo-400'>B</span>
                                            <span className='text-teal-400'>y</span>
                                            <span className='text-indigo-400'>t</span>
                                            <span className='text-teal-400'>e</span>
                                            <span className='text-indigo-400'>b</span>
                                            <span className='text-teal-400'>a</span>
                                            <span className='text-indigo-400'>z</span>
                                            <span className='text-teal-400'>a</span>
                                            <span className='text-indigo-400'>a</span>
                                            <span className='text-teal-400'>r</span>
                                        </Link>

                                    </div>
                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember your password? <Link to='/login' className="text-teal-400 decoration-2 font-medium" >Login here</Link>
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <form onSubmit={handleForgetPassword}>
                                        <div className="grid gap-y-4">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                                <div className="relative">
                                                    <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-indigo-100 rounded-md text-sm focus:border-indigo-400 focus:ring-blue-500 shadow-sm focus:outline-none focus:shadow-outline" required aria-describedby="email-error" />
                                                </div>
                                                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                            </div>
                                            {error && <p className='text-center font-bold text-red-600 '>{error}</p>}
                                            <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-400 text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-indigo-400">Reset password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
            }
        </>
    );
};

export default ForgetPassword;