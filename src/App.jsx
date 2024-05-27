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
import BKash from './components/dashboard/payment/payment/methods/BKash'
import Order from './components/dashboard/orders/Order'
import UpdateName from './authentication/manage/UpdateName'
import UpdatePassword from './authentication/manage/UpdatePassword'
import UpdateImage from './authentication/manage/UpdateImage'

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

          <Route path='user-profile' element={<UserProfile></UserProfile>}></Route>
          <Route path='laptop/:id' element={<ViewLaptop></ViewLaptop>}></Route>
          <Route path='cart' element={<Cart></Cart>}></Route>
          <Route path='favoriteProduct' element={<FavoriteProduct></FavoriteProduct>}></Route>
          <Route path='likedProduct' element={<LikedProduct></LikedProduct>}></Route>
          <Route path='dislikedProduct' element={<DislikedProduct></DislikedProduct>}></Route>

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

          <Route path='addLaptop' element={<Create></Create>}></Route>
          <Route path='editLaptop/:id' element={<Update></Update>}></Route>
          <Route path='users' element={<Users></Users>}></Route>
          <Route path='checkout' element={<Checkout></Checkout>}></Route>
          <Route path='payment' element={<Payment></Payment>}></Route>
          <Route path='card' element={<CreditCard></CreditCard>}></Route>
          <Route path='bkash' element={<BKash></BKash>}></Route>
          <Route path='order' element={<Order></Order>}></Route>
          <Route path='changename' element={<UpdateName></UpdateName>}></Route>
          <Route path='changepassword' element={<UpdatePassword></UpdatePassword>}></Route>
          <Route path='changeimage' element={<UpdateImage></UpdateImage>}></Route>


        </Route>


      </Routes>

      {noNavFooter ? '' : (isLoading && !error?.status) ? '' : <Footer></Footer>}
    </div>
  )
}

export default App
