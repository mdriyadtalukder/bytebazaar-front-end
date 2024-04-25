import { FaHome } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
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
                    <li className='font-bold'><Link to='/dashboard/user-profile'>My profile</Link></li>
                    <li className='font-bold'><Link to='/dashboard/acer'>Acer</Link></li>
                    <li className='font-bold'><Link to='/dashboard/apple'>Apple</Link></li>
                    <li className='font-bold'><Link to='/dashboard/asus'>Asus</Link></li>
                    <li className='font-bold'><Link to='/dashboard/dell'>Dell</Link></li>
                    <li className='font-bold'><Link to='/dashboard/hp'>HP</Link></li>
                    <li className='font-bold'><Link to='/dashboard/gigabyte'>Gigabyte</Link></li>
                    <li className='font-bold'><Link to='/dashboard/lenovo'>Lenovo</Link></li>
                    <li className='font-bold'><Link to='/dashboard/msi'>MSI</Link></li>
                    <li className='font-bold'><Link to='/dashboard/microsoft'>Microsoft Surface</Link></li>
                    <li className='font-bold'><Link to='/dashboard/huawei'>Huawei</Link></li>
                    <li className='font-bold'><Link to='/dashboard/razer'>Razer</Link></li>
                    <li className='font-bold'><Link to='/dashboard/samsung'>Samsung</Link></li>
                    <div className="divider"></div>
                    <li className='bg-indigo-400 rounded-md font-bold text-white'><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;