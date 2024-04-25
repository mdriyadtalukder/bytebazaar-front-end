import { Helmet } from "react-helmet-async";
import Banner from "../banner/Banner";
import Brand from "../brand/Brand";
import BrandProduct from "../brandProduct/BrandProduct";
import GamingLaptop from "../gamingLaptop/GamingLaptop";
import GetProduct from "../getProduct/GetProduct";
import Reviews from "../reviews/Reviews";

const Home = () => {
    return (
        <div className="bg-indigo-100">
             <Helmet>
                <title>ByteBazaar | Home</title>
            </Helmet>
            <Banner></Banner>
            <Brand></Brand>
            <GetProduct></GetProduct>
            <BrandProduct></BrandProduct>
            <GamingLaptop></GamingLaptop>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;