import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Dell = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const dell = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'core-i3', label: 'Core i3', checked: false },
                { value: 'core-i5', label: 'Core i5', checked: false },
                { value: 'core-i7', label: 'Core i7', checked: false },
                { value: 'ryzen-3', label: 'Ryzen 3', checked: false },
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
                { value: '256gb', label: '256GB', checked: false },
                { value: '512gb', label: '512GB', checked: false },
            ],
        },
        {
            id: 'graphicsMemoryOptions',
            name: 'Graphics Memory',
            options: [
                { value: '2gb', label: '2GB', checked: false },
                { value: '6gb', label: '6GB', checked: false },
                { value: 'shared', label: 'Shared', checked: false },
            ],
        },
        {
            id: 'laptopSeriesOptions',
            name: 'Laptop Series',
            options: [
                { value: 'g-series', label: 'G Series', checked: false },
                { value: 'inspiron', label: 'Inspiron', checked: false },
                { value: 'latitude', label: 'Latitude', checked: false },
                { value: 'vostro', label: 'Vostro', checked: false },
            ],
        }

    ];
    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "Dell")} isError={isError} isLoading={isLoading} error={error} filtering={dell} ></AllCategory>

    );
};

export default Dell;