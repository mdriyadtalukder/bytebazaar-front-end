import { useGetCoinsProductsQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../loading/Loading";
import SingleCoinProduct from "./SingleCoinProduct";

const CoinsProducts = () => {
    const { data, isError, isLoading, error } = useGetCoinsProductsQuery();

    let content;

    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No Products found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data.map(d => <SingleCoinProduct d={d} key={d?._id}></SingleCoinProduct>)
    }
    return (
        <section className="flex flex-col justify-center w-full min-h-screen px-4 py-10 mx-auto sm:px-6 bg-indigo-100 ">
            {
                isLoading ? <Loading></Loading> :
                    <div className="flex flex-wrap -mx-4">
                        {content}
                    </div>
            }
        </section>
    );
};

export default CoinsProducts;