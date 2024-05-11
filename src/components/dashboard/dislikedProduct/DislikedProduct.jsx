import { useContext } from "react";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useGetDislikedProductQuery } from "../../../RTK-Query/features/dislikes/dislikedProductApi";
import SingleDislikedProduct from "./SingleDislikedProduct";
import Loading from "../../loading/Loading";

const DislikedProduct = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetDislikedProductQuery(user?.email);
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No disliked Products found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data.map(f => <SingleDislikedProduct key={f?._id} f={f}></SingleDislikedProduct>)
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

export default DislikedProduct;