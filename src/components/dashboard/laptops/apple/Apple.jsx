import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Apple = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery();
    const apple = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'apple-m1', label: 'Apple M1', checked: false },
                { value: 'apple-m2', label: 'Apple M2', checked: false },
                { value: 'apple-m3', label: 'Apple M3', checked: false },
            ],
        },
        {
            id: 'processorGeneration',
            name: 'Processor Generation',
            options: [
                { value: 'not-applicable', label: 'Not Applicable', checked: false },
            ],
        },
        {
            id: 'ramOptions',
            name: 'RAM',
            options: [
                { value: '8gb', label: '8GB', checked: false },
                { value: '16gb', label: '16GB', checked: false },
                { value: '18gb', label: '18GB', checked: false },
                { value: '24gb', label: '24GB', checked: false },
                { value: '32gb', label: '32GB', checked: false },
                { value: '36gb', label: '36GB', checked: false },
                { value: '48gb', label: '48GB', checked: false },
                { value: '64gb', label: '64GB', checked: false },
                { value: '128gb', label: '128GB', checked: false },
            ],
        },
        {
            id: 'ssdOptions',
            name: 'Solid-State Drive (SSD)',
            options: [
                { value: '1tb', label: '1TB', checked: false },
                { value: '2tb', label: '2TB', checked: false },
                { value: '4tb', label: '4TB', checked: false },
                { value: '8tb', label: '8TB', checked: false },
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
                { value: 'macbook-air', label: 'MacBook Air', checked: false },
                { value: 'macbook-pro', label: 'MacBook Pro', checked: false },
            ],
        }
    ];
    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "Apple")} isError={isError} isLoading={isLoading} error={error} filtering={apple} ></AllCategory>

    );
};

export default Apple;