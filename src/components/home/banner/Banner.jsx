import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img from '../../../assets/banner/business-2846221_1280.jpg';
import img2 from '../../../assets/banner/coffee-1284041_1280.jpg';
import img3 from '../../../assets/banner/computer-4484282_1280.jpg';
import img4 from '../../../assets/banner/dog-4977599_1280.jpg';
import img5 from '../../../assets/banner/home-office-1867761_1280.jpg';
import img6 from '../../../assets/banner/office-1730939_1280 (1).jpg';
import img7 from '../../../assets/banner/wordpress-923188_1280.jpg';
import img8 from '../../../assets/banner/workplace-2303851_1280.jpg';
import { useContext } from 'react';
import { AuthContext } from '../../../authentication/authProvider/AuthProvider';
import { useGetFavoriteQuery } from '../../../RTK-Query/features/favorite/favoriteApi';
import Loading from '../../loading/Loading';

const Banner = () => { //1026,1824
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetFavoriteQuery(user?.email);
    return (
        <>
            {isLoading ? <Loading></Loading> :
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        (!user?.email || data?.length === 0) ? <>
                            <SwiperSlide className='bannerSwiper sm:w-screen h-screen'><img className='bannerImg sm:w-screen h-screen' src={img} alt="" /></SwiperSlide>
                            <SwiperSlide className='bannerSwiper sm:w-screen h-screen'><img className='bannerImg sm:w-screen h-screen' src={img2} alt="" /></SwiperSlide>
                            <SwiperSlide className='bannerSwiper sm:w-screen h-screen'><img className='bannerImg sm:w-screen h-screen' src={img3} alt="" /></SwiperSlide>
                            <SwiperSlide className='bannerSwiper sm:w-screen h-screen'><img className='bannerImg sm:w-screen h-screen' src={img4} alt="" /></SwiperSlide>
                            <SwiperSlide className='bannerSwiper sm:w-screen h-screen'><img className='bannerImg sm:w-screen h-screen' src={img5} alt="" /></SwiperSlide>
                            <SwiperSlide className='bannerSwiper sm:w-screen h-screen'><img className='bannerImg sm:w-screen h-screen' src={img6} alt="" /></SwiperSlide>
                            <SwiperSlide className='bannerSwiper sm:w-screen h-screen'><img className='bannerImg sm:w-screen h-screen' src={img7} alt="" /></SwiperSlide>
                            <SwiperSlide className='bannerSwiper sm:w-screen h-screen'><img className='bannerImg sm:w-screen h-screen' src={img8} alt="" /></SwiperSlide>
                        </> :
                            data?.map(d => <SwiperSlide key={d?._id} className='bannerSwiper sm:w-screen h-screen'>
                                <img className='bannerImg sm:w-screen h-screen' src={d?.productImage} alt="" />
                                <p className='text-3xl -mt-16 text-black text-center font-bold uppercase'>BDT- {d?.productPrice}</p>
                            </SwiperSlide>)
                    }



                </Swiper>}

        </>
    );
};

export default Banner;