import { MdFavorite } from "react-icons/md";
import { useGetFavoriteQuery } from "../../../RTK-Query/features/favorite/favoriteApi";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import SingleFavorite from "./SingleFavorite";
import Loading from "../../loading/Loading";

const FavoriteProduct = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetFavoriteQuery(user?.email);
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No favorite Products found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data.map(f => <SingleFavorite key={f?._id} f={f}></SingleFavorite>)
    }
    return (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-indigo-100">
            {
                isLoading ? <Loading></Loading> :
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10  ">
                        {content}
                    </div>
            }
        </div>
    );
};

export default FavoriteProduct;