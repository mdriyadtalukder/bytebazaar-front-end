import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import Title from '../../title/Title';
import { useGetReviewsQuery } from '../../../RTK-Query/features/reviews/reviewsApi';

const Reviews = () => {
    const { data: reviews, isError, isLoading, error } = useGetReviewsQuery();
    console.log(reviews?.length, isLoading, isError, error)
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && reviews?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No reviews found!!</p>
    if (!isLoading && !isError && reviews?.length > 0) {
        content = <Swiper autoplay={{
            delay: 1000,
            disableOnInteraction: false,
        }} navigation={true} modules={[Autoplay, Navigation]} className="mySwiper p-10 grid grid-cols-1 lg:w-[400px] md:w-[400px]  sm:w-screen">
            {
                reviews?.map((review) => <SwiperSlide key={review?._id} className='bg-teal-100 col me-2 p-10 flex flex-col justify-center shadow-lg rounded-lg items-center ' >


                    <div><img className='reviewImg border-2 border-indigo-400' src={review?.image} alt="" /></div>
                    <h3 className=' font-bold text-indigo-400 mt-2 text-2xl'>{review?.name}</h3><br />
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={review?.Rating}
                        readOnly
                    /><br></br>
                    <p >{review?.review} </p>


                </SwiperSlide>)
            }
        </Swiper>
    }
    return (
        <div className='bg-indigo-100 p-10'>
            <Title title='Customer Review'></Title>


            {content}

        </div>
    );
};

export default Reviews;