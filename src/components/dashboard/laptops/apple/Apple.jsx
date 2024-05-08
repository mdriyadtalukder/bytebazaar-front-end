import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Apple = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "Apple")} isError={isError} isLoading={isLoading} error={error}  ></AllCategory>

    );
};

export default Apple;