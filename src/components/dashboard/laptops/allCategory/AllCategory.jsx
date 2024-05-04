
import {  useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../../loading/Loading";
import SingleProduct from "./SingleProduct";

const AllCategory = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery();
   

    let content;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No Products found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data?.map((d) => <SingleProduct key={d?._id} d={d}></SingleProduct>)
    }
    return (
        <>
            {
                isLoading ? <Loading></Loading> : <section className="flex flex-col justify-center w-full min-h-screen px-4 py-10 mx-auto sm:px-6 bg-indigo-100 ">
                    <div className="flex flex-wrap items-center justify-between mb-8">
                        <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
                            All Category Laptops
                        </h2>

                    </div>

                    <div className="flex flex-wrap -mx-4">


                        {content}



                    </div>
                </section>
            }
        </>
    );
};

export default AllCategory;
