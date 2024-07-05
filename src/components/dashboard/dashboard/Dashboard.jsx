import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useGetCartQuery, useGetCoinQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../loading/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useGetFavoriteQuery } from "../../../RTK-Query/features/favorite/favoriteApi";
import { useDispatch, useSelector } from "react-redux";
import { getAModel, getDashboard, getGeneration, getMemory, getModels, getNavbar, getRam, getSSD, getSeries, getType } from "../../../RTK-Query/features/allProduct/allProductSlice";
import { useGetUserQuery } from "../../../RTK-Query/features/users/usersApi";
import { TfiGift } from "react-icons/tfi";
import { GiTwoCoins } from "react-icons/gi";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { data: favorites, isLoading: loadings, error: err } = useGetFavoriteQuery(user?.email);
    const { data, isLoading, error } = useGetCartQuery(user?.email);
    const { data: admin, isLoading: adminLoading, error: er } = useGetUserQuery(user?.email);
    const { dashboard } = useSelector(state => state.allProduct);
    const { data: coin } = useGetCoinQuery(user?.email);
    const isFloat = Number(coin?.coins) === coin?.coins && coin?.coins % 1 !== 0;
    const dispatch = useDispatch();
    let totalQuantity = 0;

    for (let i = 0; i < data?.length; i++) {
        totalQuantity = totalQuantity + Number(data[i]?.quantity);
    }
    const handleClick = (name) => {
        dispatch(getType(''))

        dispatch(getGeneration(''))

        dispatch(getRam(''))

        dispatch(getSSD(''))

        dispatch(getMemory(''))

        dispatch(getSeries(''))
        dispatch(getAModel('All'))
        dispatch(getModels(''))
        dispatch(getDashboard(name))
    }
    const handleHome = (name) => {
        dispatch(getNavbar(name));
        dispatch(getDashboard(name))
    }

    return (
        <>
            {
                (isLoading && !error?.status) ? <Loading></Loading> : (loadings && !err?.status) ? <Loading></Loading> : (adminLoading && !er?.status) ? <Loading></Loading> :
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
                            <ul className="menu p-4 w-80 min-h-full bg-indigo-200">
                                {/* Sidebar content here */}
                                <div className="flex justify-evenly items-center">
                                    <Link to='/' onClick={() => handleHome("Home")} className="text-xl font-bold uppercase mt-4 mb-4 flex justify-center items-center">
                                        <FaHome className="h-8 w-8 text-black font-bold"></FaHome>
                                    </Link>

                                    {
                                        user && <>
                                            <Link to='/dashboard/offering' >
                                                <div className="indicator">
                                                    <TfiGift className="h-7 w-7 text-pink-600"></TfiGift>
                                                    <span className="badge bg-red-600 text-white font-bold badge-sm indicator-item"></span>
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
                                            <Link to='/dashboard/coinsproducts' className="indicator">
                                                <GiTwoCoins className="h-7 w-7 text-yellow-600"></GiTwoCoins>
                                                <span className="badge bg-red-600 text-white font-bold badge-sm indicator-item">{isFloat ? coin?.coins.toFixed(2) : coin?.coins || 0}</span>
                                            </Link>


                                        </>
                                    }

                                </div>
                                {
                                    user && <li className={` mt-2 ${dashboard === 'My profile' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('My profile')}><Link to='/dashboard/user-profile'>My profile</Link></li>

                                }
                                <li className={` mt-2 ${dashboard === 'All Category Laptop' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('All Category Laptop')} ><Link to='/dashboard/all-category-laptop'>All Category Laptop</Link></li>
                                <li className={` mt-2 ${dashboard === 'Acer' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Acer')} ><Link to='/dashboard/acer'>Acer</Link></li>
                                <li className={` mt-2 ${dashboard === 'Apple' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Apple')}><Link to='/dashboard/apple'>Apple</Link></li>
                                <li className={` mt-2 ${dashboard === 'Asus' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Asus')} ><Link to='/dashboard/asus'>Asus</Link></li>
                                <li className={` mt-2 ${dashboard === 'Avita' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Avita')} ><Link to='/dashboard/avita'>Avita</Link></li>
                                <li className={` mt-2 ${dashboard === 'Chuwi' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Chuwi')} ><Link to='/dashboard/chuwi'>Chuwi</Link></li>
                                <li className={` mt-2 ${dashboard === 'Dell' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Dell')} ><Link to='/dashboard/dell'>Dell</Link></li>
                                <li className={` mt-2 ${dashboard === 'Gigabyte' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Gigabyte')} ><Link to='/dashboard/gigabyte'>Gigabyte</Link></li>
                                <li className={` mt-2 ${dashboard === 'HP' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('HP')} ><Link to='/dashboard/hp'>HP</Link></li>
                                <li className={` mt-2 ${dashboard === 'Huawei' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Huawei')} ><Link to='/dashboard/huawei'>Huawei</Link></li>
                                <li className={` mt-2 ${dashboard === 'Infinix' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Infinix')} ><Link to='/dashboard/infinix'>Infinix</Link></li>
                                <li className={` mt-2 ${dashboard === 'Lenovo' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Lenovo')} ><Link to='/dashboard/lenovo'>Lenovo</Link></li>
                                <li className={` mt-2 ${dashboard === 'MSI' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('MSI')} ><Link to='/dashboard/msi'>MSI</Link></li>
                                <li className={` mt-2 ${dashboard === 'Microsoft Surface' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Microsoft Surface')} ><Link to='/dashboard/microsoft'>Microsoft Surface</Link></li>
                                <li className={` mt-2 ${dashboard === 'Latest Laptop' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Latest Laptop')} ><Link to='/dashboard/latest'>Latest Laptop</Link></li>
                                <li className={` mt-2 ${dashboard === 'Gaming Laptop' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Microsoft Surface')} ><Link to='/dashboard/gaming'>Gaming Laptop</Link></li>
                                <div className="divider"></div>

                                <li onClick={() => handleHome("Home")} className={` mt-2 ${dashboard === 'Home' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`}><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>

                                {admin?.length > 0 && (admin[0].role === 'admin' || admin[0].role === 'seller') && <>
                                    <li className={`mt-2 ${dashboard === 'Add Laptop' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Add Laptop')}>
                                        <Link to='/dashboard/addLaptop'>Add Laptop</Link>
                                    </li>
                                    <li className={`mt-2 ${dashboard === 'Users Order List' && 'bg-indigo-400 rounded-md text-white'} font-bold`} onClick={() => handleClick('Users Order List')}>
                                        <Link to='/dashboard/usersOrderList'>Users Order List</Link>
                                    </li>
                                    <li className={`mt-2 ${dashboard === "Users Buyed Coin's Products" && 'bg-indigo-400 rounded-md text-white'} font-bold`} onClick={() => handleClick("Users Buyed Coin's Products")}>
                                        <Link to='/dashboard/allpurchase'>Users Buyed Coin's Products</Link>
                                    </li>

                                </>}

                                {admin?.length > 0 && admin[0].role === 'admin' && (

                                    <li className={`mt-2 ${dashboard === 'Users' && 'bg-indigo-400 rounded-md text-white'} font-bold`} onClick={() => handleClick('Users')}>
                                        <Link to='/dashboard/users'>Users</Link>
                                    </li>


                                )}

                                {
                                    user && <>
                                        <li className={` mt-2 ${dashboard === 'Liked Laptop' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Liked Laptop')} ><Link to='/dashboard/likedProduct'>Liked Laptop</Link></li>
                                        <li className={` mt-2 ${dashboard === 'Disliked Laptop' && 'bg-indigo-400 rounded-md  text-white'} font-bold`} onClick={() => handleClick('Disliked Laptop')} ><Link to='/dashboard/dislikedProduct'>Disliked Laptop</Link></li>
                                        <li className={` mt-2 ${dashboard === "Coin's Products" && 'bg-indigo-400 rounded-md  text-white'} font-bold`} onClick={() => handleClick("Coin's Products")} ><Link to='/dashboard/coinsproducts'>Coin's Products</Link></li>
                                        <li className={` mt-2 ${dashboard === "Buyed Coin's Products" && 'bg-indigo-400 rounded-md  text-white'} font-bold`} onClick={() => handleClick("Buyed Coin's Products")} ><Link to='/dashboard/purchase'>Buyed Coin's Products</Link></li>
                                        <li className={` mt-2 ${dashboard === 'Orders' && 'bg-indigo-400 rounded-md  text-white'} font-bold`} onClick={() => handleClick('Orders')} ><Link to='/dashboard/order'>Orders</Link></li>
                                    </>
                                }


                            </ul>

                        </div>
                    </div>
            }
        </>
    );
};

export default Dashboard;