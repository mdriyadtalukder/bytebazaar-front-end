import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/login/login.png';
import { Helmet } from 'react-helmet-async';
import { useContext, useState } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';
const Login = () => {
    const { logIn, logOut, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const handleLogin = (e) => {
        setLoading(true);
        e.preventDefault();
        setError('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        logIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                if (!result?.user?.emailVerified) {
                    logOut()
                        .then(() => { })
                        .catch(err => console.log(err))
                    e.target.reset();
                    setLoading(false);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Verify Your account first then login",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    console.log(user);
                    setLoading(false);
                    navigate(from, { replace: true });
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Log in successfully!!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }

            })
            .catch((err) => {
                setError(err?.message);
                setLoading(false);
            });


    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user)
                // const userInfo = {
                //     email: result.user?.email,
                //     name: result.user?.displayName,
                // }
                // axios.post('https://bistro-boss-restuarant-server.onrender.com/users', userInfo)
                //     .then(res => {

                //         console.log(res.data)
                //         navigate('/')

                //     })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log in successfully!!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')

            })
            .catch((err) => {
                setError(err?.message);
            });
    }
    return (
        <>
            {loading ? <Loading></Loading> :
                <div className="min-h-screen bg-indigo-100 text-gray-900 flex justify-center">
                    <Helmet>
                        <title>ByteBazaar | Log In</title>
                    </Helmet>
                    <div className="max-w-screen-xl m-0 sm:m-10 bg-base-100 shadow sm:rounded-lg flex justify-center flex-1">
                        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
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
                            <div className="mt-12 flex flex-col items-center">
                                <h1 className="text-2xl xl:text-3xl font-extrabold">
                                    Log In
                                </h1>
                                <div className="w-full flex-1 mt-8">
                                    <div className="flex flex-col items-center">
                                        <button onClick={handleGoogleSignIn}
                                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                            <div className="bg-white p-2 rounded-full">
                                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                    <path
                                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                        fill="#4285f4" />
                                                    <path
                                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                        fill="#34a853" />
                                                    <path
                                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                        fill="#fbbc04" />
                                                    <path
                                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                        fill="#ea4335" />
                                                </svg>
                                            </div>
                                            <span className="ml-4">
                                                Sign Up with Google
                                            </span>
                                        </button>
                                    </div>

                                    <div className="my-12 border-b text-center">
                                        <div
                                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                            Or log in with e-mail
                                        </div>
                                    </div>

                                    <form onSubmit={handleLogin} className="mx-auto max-w-xs">
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white"
                                            type="email" name='email' placeholder="Email" required />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white mt-5"
                                            type="password" name='password' placeholder="Password" required />
                                        {error && <p className='text-center font-bold text-red-600 mt-4'>{error}</p>}
                                        <button
                                            className="mt-5 tracking-wide font-semibold bg-indigo-400 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">
                                                Log In
                                            </span>
                                        </button>
                                    </form>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        <Link to='/forget-password' className=" border-gray-500 border-dotted text-teal-400 font-bold">Forget your password?</Link>
                                    </p>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        New here?
                                        <Link to='/signup' className=" border-gray-500 border-dotted text-teal-400 font-bold"> Sign Up</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-indigo-400 text-center hidden lg:flex">
                            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${img})` }}>
                            </div>
                        </div>
                    </div>
                </div>}

        </>
    );
};
export default Login;