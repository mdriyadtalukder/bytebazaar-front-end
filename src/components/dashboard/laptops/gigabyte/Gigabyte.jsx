import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Gigabyte = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const gigabyte = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'core-i5', label: 'Core i5', checked: false },
                { value: 'core-i7', label: 'Core i7', checked: false },
            ],
        },
        {
            id: 'processorGeneration',
            name: 'Processor Generation',
            options: [
                { value: '12th', label: '12th (Intel)', checked: false },
                { value: '13th', label: '13th (Intel)', checked: false },
                { value: '14th', label: '14th (Intel)', checked: false },
            ],
        },
        {
            id: 'ramOptions',
            name: 'RAM',
            options: [
                { value: '8gb', label: '8GB', checked: false },
                { value: '16gb', label: '16GB', checked: false },
            ],
        },
        {
            id: 'ssdOptions',
            name: 'Solid-State Drive (SSD)',
            options: [
                { value: '1tb', label: '1TB', checked: false },
                { value: '512gb', label: '512GB', checked: false },
            ],
        },
        {
            id: 'graphicsMemoryOptions',
            name: 'Graphics Memory',
            options: [
                { value: '6gb', label: '6GB', checked: false },
                { value: '8gb', label: '8GB', checked: false },
            ],
        },
        {
            id: 'laptopSeriesOptions',
            name: 'Laptop Series',
            options: [
                { value: 'aero', label: 'AERO', checked: false },
                { value: 'aorus', label: 'AORUS', checked: false },
                { value: 'gaming', label: 'Gaming', checked: false },
            ],
        }
    ];
    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "Gigabyte")} isError={isError} isLoading={isLoading} error={error} filtering={gigabyte}  ></AllCategory>

    );
};

export default Gigabyte;