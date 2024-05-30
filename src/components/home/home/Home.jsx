import { Helmet } from "react-helmet-async";
import Banner from "../banner/Banner";
import Brand from "../brand/Brand";
import BrandProduct from "../brandProduct/BrandProduct";
import GamingLaptop from "../gamingLaptop/GamingLaptop";
import GetProduct from "../getProduct/GetProduct";
import Reviews from "../reviews/Reviews";
import LikedProduct from "../../dashboard/likedProduct/LikedProduct";
import Title from "../../title/Title";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useGetLikedProductQuery } from "../../../RTK-Query/features/likes/likedProductApi";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useContext(AuthContext);
    const { data } = useGetLikedProductQuery(user?.email);

    return (
        <div className="bg-indigo-100 w-full">
            <Helmet>
                <title>ByteBazaar | Home</title>
            </Helmet>
            <Banner></Banner>
            <Brand></Brand>
            {
                (!user && data?.length === 0) ? '' : <>
                    <Title title='Your liked products'></Title>
                    <LikedProduct home={true}></LikedProduct>
                    {
                        data?.length >= 4 && <div className="flex justify-center items-center mb-3">
                            <Link to='/dashboard/likedProduct'>
                                <button className="p-3 rounded-lg bg-indigo-400 text-white font-bold me-4">See more</button>
                            </Link>
                        </div>
                    }
                </>
            }
            <GetProduct></GetProduct>
            <BrandProduct></BrandProduct>
            <GamingLaptop></GamingLaptop>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;