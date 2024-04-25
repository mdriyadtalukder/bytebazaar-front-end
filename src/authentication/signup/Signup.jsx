import { Link } from 'react-router-dom';
import img from '../../assets/signup/signup.png'
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const Signup = () => {
    const { signUp, updateUserProfile, sentEmailVerify, logOut } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSignup = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError('');

        //---------in imgbb update image-------------------------
        const forms = new FormData(e.target); //ei vabeo data neye jai input field theke
        const image = forms.get('image');
        const data = new FormData();
        data.append('image', image)
        const res = await axios.post(image_hosting_api, data)
        //-----------------------------------------------------------

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = res?.data?.data?.display_url;

        signUp(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);


                updateUserProfile(name, photo)
                    .then(() => {
                        // const userInfo = {
                        //     name, email
                        // }
                        // axios.post('https://bistro-boss-restuarant-server.onrender.com/users', userInfo)
                        //     .then(res => {
                        //         if (res.data.insertedId) {
                        //             console.log("User profile info updated!")
                        //             e.target.reset();
                        //             naviage('/')
                        //         }
                        //     })

                    })
                    .catch(err => setError(err))
                sentEmailVerify()
                    .then(() => {
                        logOut()
                            .then(() => { })
                            .catch(err => console.log(err))
                        e.target.reset();
                    })
                    .catch(err => console.log(err))
                setLoading(false);
                Swal.fire({
                    position: "top-start",
                    icon: "success",
                    title: "Send a mail for verifying your account to your email then login!!",
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
            {loading ? <Loading></Loading> :
                <div className="min-h-screen bg-indigo-100 dark:bg-gray-900">
                    <Helmet>
                        <title>ByteBazaar | Sign Up</title>
                    </Helmet>
                    <div className="mx-auto">
                        <div className="flex justify-center px-6 py-12">

                            <div className="w-full xl:w-3/4 lg:w-11/12 flex">

                                <div className="flex-1 bg-indigo-400 text-center hidden lg:flex"
                                    style={{ backgroundImage: `url(${img})` }}></div>

                                <div className="w-full lg:w-7/12 bg-base-100 dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
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
                                    <h1 className="text-2xl xl:text-3xl font-extrabold text-center">Create an Account!</h1>
                                    <form onSubmit={handleSignup} className="px-8 pt-6 pb-8 mb-4 bg-base-100 dark:bg-gray-800 rounded">
                                        <div className="mb-4 md:flex md:justify-between">
                                            <div className="mb-4 md:mr-2 md:mb-0">
                                                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                                                    Name
                                                </label>
                                                <input
                                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="name"
                                                    type="text"
                                                    placeholder="Name"
                                                    name='name' required
                                                />
                                            </div>
                                            <div className="md:ml-2">
                                                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="lastName">
                                                    Email
                                                </label>
                                                <input
                                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    name='email' required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                                Upload a file
                                            </label>
                                            <label className="block">
                                                <span className="sr-only">Choose profile photo</span>
                                                <input type="file" name='image' onChange="loadFile(event)" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-indigo-400 hover:file:bg-violet-100" required />
                                            </label>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                                Password
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                name='password' required
                                            />
                                        </div>
                                        {error && <p className='text-center font-bold text-red-600 mb-4'>Error</p>}

                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-indigo-400 rounded-full hover:bg-indigo-400  dark:bg-indigo-400  dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Sign Up
                                        </button>

                                    </form>
                                    <hr className="mb-6 border-t" />
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Already have account?
                                        <Link to='/login' className=" border-gray-500 border-dotted text-teal-400 font-bold"> Log In!</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default Signup;