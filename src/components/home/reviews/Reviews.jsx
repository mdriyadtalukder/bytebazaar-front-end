import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import img from '../../../assets/banner/business-2846221_1280.jpg'
import { Rating } from '@smastrom/react-rating';
import Title from '../../title/Title';

const Reviews = () => {
    return (
        <div className='bg-indigo-100 p-10'>
            <Title title='Customer Review'></Title>

            <Swiper autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }} navigation={true} modules={[Autoplay, Navigation]} className="mySwiper p-10 grid grid-cols-1 lg:w-[400px] md:w-[400px]  sm:w-screen">
                <SwiperSlide className='bg-teal-100 col me-2 p-10 flex flex-col justify-center shadow-lg rounded-lg items-center ' >


                    <div><img className='reviewImg border-2 border-indigo-400' src={img} alt="" /></div>
                    <h3 className=' font-bold text-indigo-400 mt-2 text-2xl'>Md Riyad Talukder</h3><br />
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={3}
                        readOnly
                    /><br></br>
                    <p >Bought this laptop to do minor office tasks and was surprised by how efficient it is. Can even play some games on it (at medium graphics). Definitely one of the best purchases. </p>


                </SwiperSlide><SwiperSlide className='bg-teal-100 col me-2 p-10 flex flex-col justify-center shadow-lg rounded-lg items-center ' >


                    <div><img className='reviewImg border-2 border-indigo-400' src={img} alt="" /></div>
                    <h3 className=' font-bold text-indigo-400 mt-2 text-2xl'>Md Riyad Talukder</h3><br />
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={3}
                        readOnly
                    /><br></br>
                    <p >Bought this laptop to do minor office tasks and was surprised by how efficient it is. Can even play some games on it (at medium graphics). Definitely one of the best purchases. </p>


                </SwiperSlide><SwiperSlide className='bg-teal-100 col me-2 p-10 flex flex-col justify-center shadow-lg rounded-lg items-center ' >


                    <div><img className='reviewImg border-2 border-indigo-400' src={img} alt="" /></div>
                    <h3 className=' font-bold text-indigo-400 mt-2 text-2xl'>Md Riyad Talukder</h3><br />
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={3}
                        readOnly
                    /><br></br>
                    <p >Bought this laptop to do minor office tasks and was surprised by how efficient it is. Can even play some games on it (at medium graphics). Definitely one of the best purchases. </p>


                </SwiperSlide><SwiperSlide className='bg-teal-100 col me-2 p-10 flex flex-col justify-center shadow-lg rounded-lg items-center ' >


                    <div><img className='reviewImg border-2 border-indigo-400' src={img} alt="" /></div>
                    <h3 className=' font-bold text-indigo-400 mt-2 text-2xl'>Md Riyad Talukder</h3><br />
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={3}
                        readOnly
                    /><br></br>
                    <p >Bought this laptop to do minor office tasks and was surprised by how efficient it is. Can even play some games on it (at medium graphics). Definitely one of the best purchases. </p>


                </SwiperSlide><SwiperSlide className='bg-teal-100 col me-2 p-10 flex flex-col justify-center shadow-lg rounded-lg items-center ' >


                    <div><img className='reviewImg border-2 border-indigo-400' src={img} alt="" /></div>
                    <h3 className=' font-bold text-indigo-400 mt-2 text-2xl'>Md Riyad Talukder</h3><br />
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={3}
                        readOnly
                    /><br></br>
                    <p >Bought this laptop to do minor office tasks and was surprised by how efficient it is. Can even play some games on it (at medium graphics). Definitely one of the best purchases. </p>


                </SwiperSlide><SwiperSlide className='bg-teal-100 col me-2 p-10 flex flex-col justify-center shadow-lg rounded-lg items-center ' >


                    <div><img className='reviewImg border-2 border-indigo-400' src={img} alt="" /></div>
                    <h3 className=' font-bold text-indigo-400 mt-2 text-2xl'>Md Riyad Talukder</h3><br />
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={3}
                        readOnly
                    /><br></br>
                    <p >Bought this laptop to do minor office tasks and was surprised by how efficient it is. Can even play some games on it (at medium graphics). Definitely one of the best purchases. </p>


                </SwiperSlide>



            </Swiper>

            
        </div>
    );
};

export default Reviews;