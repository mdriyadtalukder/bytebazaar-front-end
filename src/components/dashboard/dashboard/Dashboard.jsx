import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useGetCartQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../loading/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useGetFavoriteQuery } from "../../../RTK-Query/features/favorite/favoriteApi";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { data: favorites, isLoading: loadings, error: err } = useGetFavoriteQuery(user?.email);
    const { data, isLoading, error } = useGetCartQuery(user?.email);

    let totalQuantity = 0;

    for (let i = 0; i < data?.length; i++) {
        totalQuantity = totalQuantity + Number(data[i]?.quantity);
    }

    return (
        <>
            {
                (isLoading && !error?.status) ? <Loading></Loading> : (loadings && !err?.status) ? <Loading></Loading> :
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-start justify-start">

                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className=" text-indigo-400 inline-block w-6 h-6 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16">

                                    </path>
                                </svg>
                            </label>
                            <Outlet></Outlet>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-indigo-200 text-base-content">
                                {/* Sidebar content here */}
                                <div className="flex justify-evenly items-center">
                                    <Link to='/' className="text-xl font-bold uppercase mt-4 mb-4 flex justify-center items-center">
                                        <div>
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
                                        </div>
                                    </Link>

                                    <Link to='/dashboard/cart' className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge bg-red-600 text-white font-bold badge-sm indicator-item">{totalQuantity}</span>
                                    </Link>


                                    <Link to='/dashboard/favoriteProduct' className="indicator">
                                        <MdFavorite className="h-7 w-7 text-pink-600"></MdFavorite>
                                        <span className="badge bg-red-600 text-white font-bold badge-sm indicator-item">{favorites?.length || 0}</span>
                                    </Link>

                                </div>
                                <li className='font-bold'><Link to='/dashboard/user-profile'>My profile</Link></li>
                                <li className='font-bold'><Link to='/dashboard/all-category-laptop'>All Category Laptop</Link></li>
                                <li className='font-bold'><Link to='/dashboard/acer'>Acer</Link></li>
                                <li className='font-bold'><Link to='/dashboard/apple'>Apple</Link></li>
                                <li className='font-bold'><Link to='/dashboard/asus'>Asus</Link></li>
                                <li className='font-bold'><Link to='/dashboard/avita'>Avita</Link></li>
                                <li className='font-bold'><Link to='/dashboard/chuwi'>Chuwi</Link></li>
                                <li className='font-bold'><Link to='/dashboard/dell'>Dell</Link></li>
                                <li className='font-bold'><Link to='/dashboard/gigabyte'>Gigabyte</Link></li>
                                <li className='font-bold'><Link to='/dashboard/hp'>HP</Link></li>
                                <li className='font-bold'><Link to='/dashboard/huawei'>Huawei</Link></li>
                                <li className='font-bold'><Link to='/dashboard/infinix'>Infinix</Link></li>
                                <li className='font-bold'><Link to='/dashboard/lenovo'>Lenovo</Link></li>
                                <li className='font-bold'><Link to='/dashboard/msi'>MSI</Link></li>
                                <li className='font-bold'><Link to='/dashboard/microsoft'>Microsoft Surface</Link></li>
                                <div className="divider"></div>
                                <li className='bg-indigo-400 rounded-md font-bold text-white'><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                                <li className='font-bold'><Link to='/dashboard/addLaptop'>Add Laptop</Link></li>

                            </ul>

                        </div>
                    </div>
            }
        </>
    );
};

export default Dashboard;