import { useContext } from "react";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authentication/authProvider/AuthProvider";
import { useGetCartQuery, useGetCoinQuery } from "../../RTK-Query/features/allProduct/allProductApi";
import { useGetFavoriteQuery } from "../../RTK-Query/features/favorite/favoriteApi";
import { getDashboard, getNavbar } from "../../RTK-Query/features/allProduct/allProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { TfiGift } from "react-icons/tfi";
import { GiTwoCoins } from "react-icons/gi";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { data: favorites, isLoading: loadings, error: err } = useGetFavoriteQuery(user?.email);
    const { data, isLoading, isError, error } = useGetCartQuery(user?.email);
    const { dashboard, navbar } = useSelector(state => state.allProduct)
    const { data: coin } = useGetCoinQuery(user?.email);
    const isFloat = Number(coin?.coins) === coin?.coins && coin?.coins % 1 !== 0;

    const dispatch = useDispatch();
    let totalQuantity = 0;

    for (let i = 0; i < data?.length; i++) {
        totalQuantity = totalQuantity + Number(data[i]?.quantity);
    }


    const handleLogOut = () => {
        logOut()
            .then(() => {
            })
            .catch(err => console.log(err))
    }
    const handleClick = (name) => {

        dispatch(getNavbar(''));
        dispatch(getDashboard(name))
    }
    const handleHome = (name) => {
        dispatch(getNavbar(name));
        dispatch(getDashboard(''))
    }
    return (
        <div className="fixed z-10 bg-opacity-80 bg-base-100 w-screen pe-5">
            {/* <div className="navbar">

                <label id='input' className="input w-full input-bordered flex input-accent items-center ga ">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>

            </div> */}


            <div className="navbar shadow-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1]  p-2 shadow bg-base-100 rounded-box w-52">

                            <li onClick={() => handleHome("Home")} className={` me-1 ${navbar === 'Home' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} ><Link to='/'>Home</Link></li>
                            <li className={` me-1 ${dashboard === 'My profile' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('My profile')}><Link to='/dashboard/user-profile'>Dashboard</Link></li>
                            <li className={` me-1 ${dashboard === 'Acer' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Acer')} ><Link to='/dashboard/acer'>Acer</Link></li>
                            <li className={` me-1 ${dashboard === 'Apple' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Apple')}><Link to='/dashboard/apple'>Apple</Link></li>
                            <li className={` me-1 ${dashboard === 'Asus' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Asus')} ><Link to='/dashboard/asus'>Asus</Link></li>
                            <li className={` me-1 ${dashboard === 'Avita' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Avita')} ><Link to='/dashboard/avita'>Avita</Link></li>
                            <li className={` me-1 ${dashboard === 'Chuwi' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Chuwi')} ><Link to='/dashboard/chuwi'>Chuwi</Link></li>
                            <li className={` me-1 ${dashboard === 'Dell' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Dell')} ><Link to='/dashboard/dell'>Dell</Link></li>
                            <li className={` me-1 ${dashboard === 'Gigabyte' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Gigabyte')} ><Link to='/dashboard/gigabyte'>Gigabyte</Link></li>
                            <li className={` me-1 ${dashboard === 'HP' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('HP')} ><Link to='/dashboard/hp'>HP</Link></li>
                            <li className={` me-1 ${dashboard === 'Huawei' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Huawei')} ><Link to='/dashboard/huawei'>Huawei</Link></li>
                            <li className={` me-1 ${dashboard === 'Infinix' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Infinix')} ><Link to='/dashboard/infinix'>Infinix</Link></li>
                            <li className={` me-1 ${dashboard === 'Lenovo' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Lenovo')} ><Link to='/dashboard/lenovo'>Lenovo</Link></li>
                            <li className={` me-1 ${dashboard === 'MSI' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('MSI')} ><Link to='/dashboard/msi'>MSI</Link></li>
                            <li className={` me-1 ${dashboard === 'Microsoft Surface' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Microsoft Surface')} ><Link to='/dashboard/microsoft'>Microsoft Surface</Link></li>

                        </ul>
                    </div>
                    <Link to='/' onClick={() => handleHome("Home")} className="text-xl font-bold uppercase">
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
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        <li onClick={() => handleHome("Home")} className={` me-1 ${navbar === 'Home' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} ><Link to='/'>Home</Link></li>
                        <li className={` me-1 ${dashboard === 'Acer' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Acer')} ><Link to='/dashboard/acer'>Acer</Link></li>
                        <li className={` me-1 ${dashboard === 'Apple' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Apple')}><Link to='/dashboard/apple'>Apple</Link></li>
                        <li className={` me-1 ${dashboard === 'Asus' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Asus')} ><Link to='/dashboard/asus'>Asus</Link></li>
                        <li className={` me-1 ${dashboard === 'Avita' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Avita')} ><Link to='/dashboard/avita'>Avita</Link></li>
                        <li className={` me-1 ${dashboard === 'Chuwi' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Chuwi')} ><Link to='/dashboard/chuwi'>Chuwi</Link></li>
                        <li className={` me-1 ${dashboard === 'Dell' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Dell')} ><Link to='/dashboard/dell'>Dell</Link></li>
                        <li className={` me-1 ${dashboard === 'Gigabyte' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Gigabyte')} ><Link to='/dashboard/gigabyte'>Gigabyte</Link></li>
                        <li className={` me-1 ${dashboard === 'HP' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('HP')} ><Link to='/dashboard/hp'>HP</Link></li>
                        <li className={` me-1 ${dashboard === 'Huawei' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Huawei')} ><Link to='/dashboard/huawei'>Huawei</Link></li>
                        <li className={` me-1 ${dashboard === 'Infinix' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Infinix')} ><Link to='/dashboard/infinix'>Infinix</Link></li>
                        <li className={` me-1 ${dashboard === 'Lenovo' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Lenovo')} ><Link to='/dashboard/lenovo'>Lenovo</Link></li>
                        <li className={` me-1 ${dashboard === 'MSI' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('MSI')} ><Link to='/dashboard/msi'>MSI</Link></li>
                        <li className={` me-1 ${dashboard === 'Microsoft Surface' && 'bg-indigo-400 rounded-md font-bold text-white'} font-bold`} onClick={() => handleClick('Microsoft Surface')} ><Link to='/dashboard/microsoft'>Microsoft Surface</Link></li>


                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        user && <>

                            <Link to='/dashboard/offering' >
                                <div className="indicator">
                                    <TfiGift className="h-7 w-7 text-pink-600"></TfiGift>
                                    <span className="badge bg-red-600 text-white font-bold badge-sm indicator-item"></span>
                                </div>
                            </Link>
                            <Link to='/dashboard/cart' className="pe-4 ps-4">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge bg-red-600 text-white font-bold badge-sm indicator-item">{totalQuantity}</span>
                                </div>
                            </Link>
                            <Link to='/dashboard/favoriteProduct' className="pe-4">
                                <div className="indicator">
                                    <MdFavorite className="h-7 w-7 text-pink-600"></MdFavorite>
                                    <span className="badge bg-red-600 text-white font-bold badge-sm indicator-item">{favorites?.length || 0}</span>
                                </div>
                            </Link>
                            <div className="pe-4">
                                <div className="indicator">
                                    <GiTwoCoins className="h-9 w-9 text-yellow-600"></GiTwoCoins>
                                    <span className="badge bg-red-600 text-white font-bold badge-sm indicator-item">{isFloat ? coin?.coins.toFixed(2) : coin?.coins}</span>
                                </div>
                            </div>
                        </>
                    }

                    {
                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} className=" rounded-full avatar border-2 border-teal-400 ">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li className={` ${dashboard === 'My profile' && 'bg-indigo-400 rounded-md font-bold text-white'}`} onClick={() => handleClick('My profile')}><Link to='/dashboard/user-profile'>{user?.displayName} (Profile)</Link></li>
                                <li className={`  ${dashboard === 'My profile' && 'bg-indigo-400 rounded-md font-bold text-white'}`} onClick={() => handleClick('My profile')}><Link to='/dashboard/user-profile'>Dashboard</Link></li>
                                <li onClick={handleLogOut}><a>Log Out</a></li>

                            </ul>
                        </div> :
                            <Link to='/login'> <button className=" p-2 rounded-lg bg-teal-400 text-white font-bold me-4">Log In</button></Link>

                    }
                </div>
            </div>

        </div>
    );
};

export default Navbar;

