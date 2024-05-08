import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Msi = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const msi = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'core-i3', label: 'Core i3', checked: false },
                { value: 'core-i5', label: 'Core i5', checked: false },
                { value: 'core-i7', label: 'Core i7', checked: false },
                { value: 'core-ultra-7', label: 'Core Ultra 7', checked: false },
                { value: 'ryzen-5', label: 'Ryzen 5', checked: false },
                { value: 'ryzen-7', label: 'Ryzen 7', checked: false },
            ],
        },
        {
            id: 'processorGeneration',
            name: 'Processor Generation',
            options: [
                { value: '11th', label: '11th (Intel)', checked: false },
                { value: '12th', label: '12th (Intel)', checked: false },
                { value: '13th', label: '13th (Intel)', checked: false },
                { value: 'unmentioned', label: 'Unmentioned', checked: false },
                { value: 'not-applicable', label: 'Not Applicable', checked: false },
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
                { value: '512gb', label: '512GB', checked: false },
            ],
        },
        {
            id: 'graphicsMemoryOptions',
            name: 'Graphics Memory',
            options: [
                { value: '4gb', label: '4GB', checked: false },
                { value: '6gb', label: '6GB', checked: false },
                { value: 'shared', label: 'Shared', checked: false },
            ],
        },
        {
            id: 'laptopSeriesOptions',
            name: 'Laptop Series',
            options: [
                { value: 'cyborg', label: 'Cyborg', checked: false },
                { value: 'modern', label: 'Modern', checked: false },
                { value: 'thin', label: 'Thin', checked: false },
            ],
        }
    ];

    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "MSI")} isError={isError} isLoading={isLoading} error={error} filtering={msi}  ></AllCategory>

    );
};

export default Msi;