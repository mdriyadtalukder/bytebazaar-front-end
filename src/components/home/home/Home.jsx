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
                data?.length === 0 ? '' : <>
                    <Title title='Your liked products'></Title>
                    <LikedProduct></LikedProduct>
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