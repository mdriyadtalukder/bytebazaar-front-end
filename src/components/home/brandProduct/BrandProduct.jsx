import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import img from '../../../assets/laptop-names/mac book.jpg';
import img2 from '../../../assets/laptop-names/hp.jpg';
import img3 from '../../../assets/laptop-names/infinix.jpg';
import img4 from '../../../assets/laptop-names/dell.jpg';
import img5 from '../../../assets/laptop-names/acer.jpg';
import img6 from '../../../assets/laptop-names/asus.jpg';
import img7 from '../../../assets/laptop-names/huawei.jpeg';
import img8 from '../../../assets/laptop-names/lenovo.jpg';
import img9 from '../../../assets/laptop-names/Microsoft.jpg';
import img10 from '../../../assets/laptop-names/MSI.png';
import img11 from '../../../assets/laptop-names/avita.jpg';
import img12 from '../../../assets/laptop-names/gigabyte.png';
import img13 from '../../../assets/laptop-names/chuwi.jpg';
import Title from '../../title/Title';

const BrandProduct = () => {
    return (
        <div className='bg-indigo-100 p-10'>
            <Title title='Order Online'></Title>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper bg-base-100 shadow-lg rounded-lg p-10"
            >
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg flex justify-center items-center border-indigo-400 '  >
                    <div className=''>
                        <img src={img} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>apple</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg  flex justify-center items-center border-indigo-400  '>
                    <div>
                        <img src={img2} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>hp</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg flex justify-center items-center border-indigo-400   ' >
                    <div>
                        <img src={img3} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>Infinix</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg flex justify-center items-center border-indigo-400   ' >
                    <div>
                        <img src={img4} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>dell</p>

                    </div>
                </SwiperSlide>

                <SwiperSlide className='h-[350px] w-[300px] border-2 rounded-lg flex justify-center items-center border-indigo-400   ' >
                    <div>
                        <img src={img5} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>acer</p>
                    </div>

                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg  flex justify-center items-center border-indigo-400  ' >
                    <div>
                        <img src={img6} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>asus</p>
                    </div>

                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg  flex justify-center items-center border-indigo-400  ' >
                    <div>
                        <img src={img7} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>huawei</p>

                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg  flex justify-center items-center border-indigo-400  ' >
                    <div>
                        <img src={img8} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>lenovo</p>

                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg  flex justify-center items-center border-indigo-400  ' >
                    <div>
                        <img src={img9} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>microsoft</p>
                    </div>

                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg flex justify-center items-center border-indigo-400   ' >
                    <div>
                        <img src={img10} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>msi</p>
                    </div>

                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg  flex justify-center items-center border-indigo-400  ' >
                    <div>
                        <img src={img11} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>avita</p>
                    </div>

                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg  flex justify-center items-center border-indigo-400  ' >
                    <div>
                        <img src={img12} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>gigabyte</p>
                    </div>

                </SwiperSlide>
                <SwiperSlide className='h-[350px] w-[300px]  border-2 rounded-lg  flex justify-center items-center border-indigo-400  ' >
                    <div>
                        <img src={img13} className='h-[250px] w-[200px] shadow-lg rounded border-2 border-teal-400' />
                        <p className='text-2xl -mt-16 text-indigo-400 text-center font-bold uppercase'>Chuwi</p>
                    </div>

                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default BrandProduct;