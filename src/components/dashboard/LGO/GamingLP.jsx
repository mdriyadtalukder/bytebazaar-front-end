import { useGetAllProductQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../loading/Loading";
import Single from "./Single";

const GamingLP = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No disliked Products found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data
            .filter(f => f.productName.toLowerCase().includes('gaming'))
            .map(f => <Single key={f?._id} f={f}></Single>);
    }
    return (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-indigo-100">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Gaming laptops!</h1>

            {
                isLoading ? <Loading></Loading> :
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10  ">
                        {content}
                    </div>
            }
        </div>
    );
};

export default GamingLP;