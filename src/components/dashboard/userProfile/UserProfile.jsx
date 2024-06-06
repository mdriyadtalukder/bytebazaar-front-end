import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../../loading/Loading";
import { FaCartShopping, FaGift } from "react-icons/fa6";
import { MdSell } from "react-icons/md";
import { useGetAllPaymentQuery } from "../../../RTK-Query/features/payment/paymentApi";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { useGetUserQuery } from "../../../RTK-Query/features/users/usersApi";

const UserProfile = () => {
    const { user, logOut, deletedUser } = useContext(AuthContext);
    const { data, isLoading } = useGetAllPaymentQuery();
    const { data: userRole, isLoading: userRoleLoading } = useGetUserQuery(user?.email);


    const navigate = useNavigate('');

    const formatNumber = (num) => {
        if (num >= 1e7) {
            return (num / 1e7).toFixed(2) + ' Cr';
        } else if (num >= 1e5) {
            return (num / 1e5).toFixed(2) + ' Lakh';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + ' K';
        }
        return num.toString();
    };
    const totalProductPrice = data?.reduce((acc, product) => acc + Number(product?.price), 0);

    const totalRevenueUSD = totalProductPrice / 117.30;

    let revenue = formatNumber(totalRevenueUSD);
    const totalEarn = totalProductPrice / 4;
    const totalearning = totalEarn / 117.30;

    let earn = formatNumber(totalearning);


    const pendingProducts = data?.filter(product => product.status === 'Pending');
    // Calculate the total price of pending products
    const totalPriceOfPendingProducts = pendingProducts?.reduce((total, product) => total + product?.price, 0);
    const totalPending = totalPriceOfPendingProducts / 117.30;
    let pending = formatNumber(totalPending);


    const handleDeleteUser = user => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, user delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                deletedUser()
                    .then(() => {
                        logOut()
                            .then(() => {
                            })
                            .catch(err => console.log(err))
                        Swal.fire({
                            title: `${user?.name} deleted succesfully!`,
                            text: "user deleted.",
                            icon: "success"
                        });
                        navigate('/login')
                    })
                    .catch(err => console.log(err))


            }
        });

    }
    const datas = [
        {
            "name": "2023",
            "Total Revenue": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Revenue": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Revenue": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Revenue": Number(totalRevenueUSD),
            "Total Earning": Number(totalearning)
        },
        {
            "name": "2023",
            "Total Revenue": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Revenue": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Revenue": 0,
            "Total Earning": 0
        }
    ]

    const data2 = [
        {
            "name": "2023",
            "Total Pending": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Pending": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Pending": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Pending": Number(totalPending),
            "Total Earning": Number(totalearning)
        },
        {
            "name": "2023",
            "Total Pending": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Pending": 0,
            "Total Earning": 0
        },
        {
            "name": "2023",
            "Total Pending": 0,
            "Total Earning": 0
        }
    ]
    return (
        <>
            {
                (user?.email || isLoading || userRoleLoading) ? <>
                    {userRole?.length > 0 && userRole[0].role === 'admin' && (
                        <div className="bg-base-100 w-full h-full">
                            <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20">
                                <div className="relative p-6 flex justify-between items-center rounded-2xl text-white font-bold bg-indigo-300 shadow-2xl dark:bg-gray-800">
                                    <div className="space-y-2">
                                        <div
                                            className="flex items-center text-2xl space-x-2 rtl:space-x-reverse  font-medium  dark:text-gray-400">
                                            <span className="uppercase">Revenue</span>
                                        </div>

                                        <div className="text-4xl dark:text-gray-100">
                                            ${revenue}
                                        </div>

                                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-lg font-medium ">

                                            <span>Total revenue</span>


                                        </div>
                                    </div>
                                    <div className="bg-base-100 bg-opacity-30 p-5 rounded-full">
                                        <FaCartShopping className="text-5xl " />
                                    </div>


                                </div>

                                <div className="relative p-6 flex justify-between items-center rounded-2xl text-white font-bold bg-pink-300 shadow-2xl dark:bg-gray-800">
                                    <div className="space-y-2">
                                        <div
                                            className="flex items-center text-2xl space-x-2 rtl:space-x-reverse  font-medium  dark:text-gray-400">
                                            <span className="uppercase">Earning</span>
                                        </div>

                                        <div className="text-4xl dark:text-gray-100">
                                            ${earn}
                                        </div>

                                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-lg font-medium ">

                                            <span>Total earning</span>


                                        </div>
                                    </div>
                                    <div className="bg-base-100 bg-opacity-30 p-5 rounded-full">
                                        <FaGift className="text-5xl " />
                                    </div>


                                </div>


                                <div className="relative p-6 flex justify-between items-center rounded-2xl text-white font-bold bg-teal-300 shadow-2xl dark:bg-gray-800">
                                    <div className="space-y-2">
                                        <div
                                            className="flex items-center text-2xl space-x-2 rtl:space-x-reverse  font-medium  dark:text-gray-400">
                                            <span className="uppercase">Sales Orders</span>
                                        </div>

                                        <div className="text-4xl dark:text-gray-100">
                                            {data?.length}
                                        </div>

                                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-lg font-medium ">

                                            <span>Total sales orders</span>


                                        </div>
                                    </div>
                                    <div className="bg-base-100 bg-opacity-30 p-5 rounded-full">
                                        <MdSell className="text-5xl " />
                                    </div>


                                </div>

                            </div>
                            <div className="flex justify-center items-center mt-3">
                                <BarChart width={730} height={400} data={datas}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Total Revenue" fill="#8884d8" />
                                    <Bar dataKey="Total Earning" fill="#f472b6" />
                                </BarChart>
                            </div>
                        </div>
                    )}

                    {userRole?.length > 0 && userRole[0].role === 'seller' && (<div className="bg-gray-100 w-full h-full ">
                        <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20">
                            <div className="relative p-6 flex  justify-between items-center rounded-2xl text-black font-bold bg-base-100 shadow-2xl dark:bg-gray-800">
                                <div className="space-y-2 ">
                                    <div
                                        className="flex items-center text-2xl space-x-2 rtl:space-x-reverse  font-medium  dark:text-gray-400">
                                        <span className="uppercase">Pending</span>
                                    </div>

                                    <div className="text-4xl dark:text-gray-100">
                                        ${pending}
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-lg font-medium ">

                                        <span>Total pending</span>


                                    </div>
                                </div>



                            </div>

                            <div className="relative p-6 flex justify-between items-center rounded-2xl text-black font-bold bg-base-100 shadow-2xl dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center text-2xl space-x-2 rtl:space-x-reverse  font-medium  dark:text-gray-400">
                                        <span className="uppercase">Earning</span>
                                    </div>

                                    <div className="text-4xl dark:text-gray-100">
                                        ${earn}
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-lg font-medium ">

                                        <span>Total earning</span>


                                    </div>
                                </div>



                            </div>


                            <div className="relative p-6 flex justify-between items-center rounded-2xl text-black font-bold bg-base-100 shadow-2xl dark:bg-gray-800">
                                <div className="space-y-2">
                                    <div
                                        className="flex items-center text-2xl space-x-2 rtl:space-x-reverse  font-medium  dark:text-gray-400">
                                        <span className="uppercase">Sales Orders</span>
                                    </div>

                                    <div className="text-4xl dark:text-gray-100">
                                        {data?.length}
                                    </div>

                                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-lg font-medium ">

                                        <span>Total sales orders</span>


                                    </div>
                                </div>



                            </div>

                        </div>
                        <div className="flex justify-center items-center mt-3">
                            <BarChart width={730} height={400} data={data2}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Total Pending" fill="#8884d8" />
                                <Bar dataKey="Total Earning" fill="#f472b6" />
                            </BarChart>
                        </div>
                    </div>)}

                    <section className={`${(userRole?.length > 0 && userRole[0].role) ? 'bg-gray-100' : 'bg-indigo-100'} w-full    dark:bg-gray-900 pt-8`}>
                        <div className="flex flex-col">
                            <div
                                className={`mx-auto mt-3 mb-3 flex justify-center w-[141px] h-[141px] rounded-full bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${user?.photoURL})` }}>

                                <div className="bg-white rounded-full w-6 h-6 text-center ml-28 mt-4">

                                    <input type="file" name="profile" id="upload_profile" hidden required />

                                    <label htmlFor="upload_profile" className="inline-flex items-center">
                                        <Link to='/dashboard/changeimage'><svg data-slot="icon" className="w-5 h-5 text-indigo-400" fill="none" strokeWidth="1.5"
                                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                            </path>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                            </path>
                                        </svg></Link>
                                    </label>
                                </div>
                            </div>

                            <div
                                className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">



                                <div className="w-full mt-4 my-auto py-6 flex flex-col justify-center gap-2">
                                    <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-between items-center bg-base-100 rounded-lg shadow-lg p-3">
                                        <div className="w-full">
                                            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                                <div className="flex justify-between pb-3">
                                                    <div>
                                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                                                        <dd className="text-lg font-semibold">{user?.displayName}</dd>
                                                    </div>
                                                    <div className="flex flex-col pb-3 text-indigo-400 font-bold">
                                                        <Link to='/dashboard/changename'>Edit name</Link>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between pb-3">
                                                    <div className="flex flex-col pb-3 text-indigo-400 font-bold">
                                                        <Link to='/dashboard/changepassword'>Change password</Link>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col py-3">
                                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                                    <dd className="text-lg font-semibold">{user?.email}</dd>
                                                </div>
                                                <div className="flex justify-between pb-3">
                                                    <button onClick={handleDeleteUser} className="bg-gray-200 hover:bg-gray-200 text-red-500 font-bold p-1 rounded mt-2">Delete Account</button>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>


                                </div>



                            </div>
                        </div>
                    </section>
                </> : <Loading></Loading>
            }

        </>
    );
};

export default UserProfile;