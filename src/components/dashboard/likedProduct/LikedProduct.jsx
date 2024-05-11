import { useContext } from "react";
import Loading from "../../loading/Loading";
import SingleLikedProduct from "./SingleLikedProduct";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useGetLikedProductQuery } from "../../../RTK-Query/features/likes/likedProductApi";

const LikedProduct = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetLikedProductQuery(user?.email);
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No liked Products found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data.map(f => <SingleLikedProduct key={f?._id} f={f}></SingleLikedProduct>)
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

export default LikedProduct;