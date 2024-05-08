import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "./AllCategory";

const AllLaptops = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()

    return (
       <AllCategory data={data}  isError={isError}  isLoading={isLoading}  error={error}  ></AllCategory>
    );
};

export default AllLaptops;