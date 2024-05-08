import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Avita = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const avita = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
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
                { value: 'liber', label: 'LIBER', checked: false },
            ],
        }
    ];

    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "Avita")} isError={isError} isLoading={isLoading} error={error} filtering={avita}  ></AllCategory>

    );
};

export default Avita;