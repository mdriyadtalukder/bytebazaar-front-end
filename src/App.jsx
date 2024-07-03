import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/home/home/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Login from './authentication/login/Login'
import Signup from './authentication/signup/Signup'
import ForgetPassword from './authentication/forgetPassword/ForgetPassword'
import Dashboard from './components/dashboard/dashboard/Dashboard'
import Asus from './components/dashboard/laptops/asus/Asus'
import Infinix from './components/dashboard/laptops/infinix/Infinix'
import Avita from './components/dashboard/laptops/avita/Avita'
import Msi from './components/dashboard/laptops/msi/Msi'
import Microsoft from './components/dashboard/laptops/microsoft/Microsoft'
import Lenovo from './components/dashboard/laptops/lenovo/Lenovo'
import Huawei from './components/dashboard/laptops/huawei/Huawei'
import Hp from './components/dashboard/laptops/hp/Hp'
import Gigabyte from './components/dashboard/laptops/gigabyte/Gigabyte'
import Dell from './components/dashboard/laptops/dell/Dell'
import Acer from './components/dashboard/laptops/acer/Acer'
import Apple from './components/dashboard/laptops/apple/Apple'
import UserProfile from './components/dashboard/userProfile/UserProfile'
import { useGetReviewsQuery } from './RTK-Query/features/reviews/reviewsApi'
import Loading from './components/loading/Loading'
import Chuwi from './components/dashboard/laptops/chuwi/Chuwi'
import Cart from './components/home/cart/Cart'
import FavoriteProduct from './components/home/favoriteProduct/FavoriteProduct'
import ViewLaptop from './components/dashboard/laptops/viewLaptop/ViewLaptop'
import AllLaptops from './components/dashboard/laptops/allCategory/AllLaptops'
import Create from './components/dashboard/laptops/cu/create/Create'
import Update from './components/dashboard/laptops/cu/update/Update'
import LikedProduct from './components/dashboard/likedProduct/LikedProduct'
import DislikedProduct from './components/dashboard/dislikedProduct/DislikedProduct'
import Users from './components/dashboard/users/Users'
import Checkout from './components/dashboard/payment/checkout/Checkout'
import Payment from './components/dashboard/payment/payment/Payment'
import CreditCard from './components/dashboard/payment/payment/methods/CreditCard'
import Order from './components/dashboard/orders/Order'
import UpdateName from './authentication/manage/UpdateName'
import UpdatePassword from './authentication/manage/UpdatePassword'
import UpdateImage from './authentication/manage/UpdateImage'
import PrivateRouter from './authentication/routers/PrivateRouter'
import AdminRouter from './authentication/routers/AdminRouter'
import LatestLP from './components/dashboard/LGO/LatestLP'
import GamingLP from './components/dashboard/LGO/GamingLP'
import OfferingLP from './components/dashboard/LGO/OfferingLP'
import CombineOrder from './components/dashboard/orders/CombineOrder'

function App() {
  const location = useLocation();
  const { isLoading, error } = useGetReviewsQuery();
  const noNavFooter = location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname.includes('forget-password') || location.pathname.includes('dashboard');


  return (
    <div className='bg-indigo-100 h-screen'>
      {noNavFooter ? '' : (isLoading && !error?.status) ? <Loading></Loading> : <Navbar></Navbar>}
      <Routes>
        {(!isLoading || error?.status) && <Route path='/' element={<Home></Home>}></Route>}
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/forget-password' element={<ForgetPassword></ForgetPassword>}></Route>

        <Route path='/dashboard' element={<Dashboard></Dashboard>}>

          <Route path='user-profile' element={<PrivateRouter><UserProfile></UserProfile></PrivateRouter>}></Route>
          <Route path='laptop/:id' element={<ViewLaptop></ViewLaptop>}></Route>
          <Route path='cart' element={<PrivateRouter><Cart></Cart></PrivateRouter>}></Route>
          <Route path='favoriteProduct' element={<PrivateRouter><FavoriteProduct></FavoriteProduct></PrivateRouter>}></Route>
          <Route path='likedProduct' element={<PrivateRouter><LikedProduct></LikedProduct></PrivateRouter>}></Route>
          <Route path='dislikedProduct' element={<PrivateRouter><DislikedProduct></DislikedProduct></PrivateRouter>}></Route>

          <Route path='acer' element={<Acer></Acer>}></Route>
          <Route path='apple' element={<Apple></Apple>}></Route>
          <Route path='asus' element={<Asus></Asus>}></Route>
          <Route path='dell' element={<Dell></Dell>}></Route>
          <Route path='gigabyte' element={<Gigabyte></Gigabyte>}></Route>
          <Route path='hp' element={<Hp></Hp>}></Route>
          <Route path='huawei' element={<Huawei></Huawei>}></Route>
          <Route path='lenovo' element={<Lenovo></Lenovo>}></Route>
          <Route path='microsoft' element={<Microsoft></Microsoft>}></Route>
          <Route path='msi' element={<Msi></Msi>}></Route>
          <Route path='avita' element={<Avita></Avita>}></Route>
          <Route path='infinix' element={<Infinix></Infinix>}></Route>
          <Route path='chuwi' element={<Chuwi></Chuwi>}></Route>
          <Route path='all-category-laptop' element={<AllLaptops></AllLaptops>}></Route>

          <Route path='latest' element={<LatestLP></LatestLP>}></Route>
          <Route path='gaming' element={<GamingLP></GamingLP>}></Route>
          <Route path='offering' element={<OfferingLP></OfferingLP>}></Route>


          <Route path='addLaptop' element={<AdminRouter><Create></Create></AdminRouter>}></Route>
          <Route path='editLaptop/:id' element={<AdminRouter><Update></Update></AdminRouter>}></Route>
          <Route path='users' element={<AdminRouter><Users></Users></AdminRouter>}></Route>
          <Route path='usersOrderList' element={<AdminRouter><CombineOrder></CombineOrder></AdminRouter>}></Route>

          <Route path='checkout' element={<PrivateRouter><Checkout></Checkout></PrivateRouter>}></Route>
          <Route path='payment' element={<PrivateRouter><Payment></Payment></PrivateRouter>}></Route>
          <Route path='card' element={<PrivateRouter><CreditCard></CreditCard></PrivateRouter>}></Route>
          <Route path='order' element={<PrivateRouter><Order></Order></PrivateRouter>}></Route>
          <Route path='changename' element={<PrivateRouter><UpdateName></UpdateName></PrivateRouter>}></Route>
          <Route path='changepassword' element={<PrivateRouter><UpdatePassword></UpdatePassword></PrivateRouter>}></Route>
          <Route path='changeimage' element={<PrivateRouter><UpdateImage></UpdateImage></PrivateRouter>}></Route>



        </Route>


      </Routes>

      {noNavFooter ? '' : (isLoading && !error?.status) ? '' : <Footer></Footer>}
    </div>
  )
}

export default App
