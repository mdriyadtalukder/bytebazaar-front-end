import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Chuwi = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const chuwi = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'core-n100', label: 'Core N100', checked: false },
                { value: 'core-i3', label: 'Core i3', checked: false },
                { value: 'intel-celeron', label: 'Intel Celeron', checked: false },
            ],
        },
        {
            id: 'processorGeneration',
            name: 'Processor Generation',
            options: [
                { value: '12th', label: '12th (Intel)', checked: false },
                { value: '12th-standard', label: '12th Standard (Intel)', checked: false },
                { value: 'not-applicable', label: 'Not Applicable', checked: false },
            ],
        },
        {
            id: 'ramOptions',
            name: 'RAM',
            options: [
                { value: '8gb', label: '8GB', checked: false },
                { value: '12gb', label: '12GB', checked: false },
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
                { value: 'shared', label: 'Shared', checked: false },
            ],
        },
        {
            id: 'laptopSeriesOptions',
            name: 'Laptop Series',
            options: [
                { value: 'corebook', label: 'CoreBook', checked: false },
                { value: 'gemibook', label: 'GemiBook', checked: false },
                { value: 'herobook', label: 'HeroBook', checked: false },
                { value: 'minibook', label: 'MiniBook', checked: false },
            ],
        }
    ];
    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "Chuwi")} isError={isError} isLoading={isLoading} error={error} filtering={chuwi}  ></AllCategory>

    );
};

export default Chuwi;