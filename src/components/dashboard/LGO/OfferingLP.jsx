import { useGetAllProductQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../loading/Loading";
import Single from "./Single";

const OfferingLP = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No disliked Products found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = [...data]
            ?.sort((a, b) => a?.productPrice - b?.productPrice)
            ?.slice(0, 7)
            ?.map(f => <Single key={f?._id} f={f} offer={true}></Single>);
    }
    return (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-indigo-100">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Your Offers!</h1>

            {
                isLoading ? <Loading></Loading> :
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10  ">
                        {content}
                    </div>
            }
        </div>
    );
};

export default OfferingLP;