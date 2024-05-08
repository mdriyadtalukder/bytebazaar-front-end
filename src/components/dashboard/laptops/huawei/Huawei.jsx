import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Huawei = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const huawei = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'core-i3', label: 'Core i3', checked: false },
                { value: 'core-i5', label: 'Core i5', checked: false },
            ],
        },
        {
            id: 'processorGeneration',
            name: 'Processor Generation',
            options: [
                { value: '11th', label: '11th (Intel)', checked: false },
            ],
        },
        {
            id: 'ramOptions',
            name: 'RAM',
            options: [
                { value: '8gb', label: '8GB', checked: false },
            ],
        },
        {
            id: 'ssdOptions',
            name: 'Solid-State Drive (SSD)',
            options: [
                { value: '256gb', label: '256GB', checked: false },
                { value: '512gb', label: '512GB', checked: false },
            ],
        },
        {
            id: 'graphicsMemoryOptions',
            name: 'Graphics Memory',
            options: [
                { value: 'shared', label: 'Shared', checked: false },
            ],
        },
        {
            id: 'laptopSeriesOptions',
            name: 'Laptop Series',
            options: [
                { value: 'matebook', label: 'MateBook', checked: false },
            ],
        }
    ];
    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "Huawei")} isError={isError} isLoading={isLoading} error={error} filtering={huawei}  ></AllCategory>

    );
};

export default Huawei;