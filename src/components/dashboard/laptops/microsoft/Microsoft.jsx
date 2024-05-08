import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Microsoft = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const microsoft = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'core-i3', label: 'Core i3', checked: false },
                { value: 'core-i5', label: 'Core i5', checked: false },
                { value: 'core-i7', label: 'Core i7', checked: false },
            ],
        },
        {
            id: 'processorGeneration',
            name: 'Processor Generation',
            options: [
                { value: '10th', label: '10th (Intel)', checked: false },
                { value: '11th', label: '11th (Intel)', checked: false },
                { value: '12th', label: '12th (Intel)', checked: false },
                { value: '13th', label: '13th (Intel)', checked: false },
            ],
        },
        {
            id: 'ramOptions',
            name: 'RAM',
            options: [
                { value: '8gb', label: '8GB', checked: false },
                { value: '16gb', label: '16GB', checked: false },
                { value: '32gb', label: '32GB', checked: false },
            ],
        },
        {
            id: 'ssdOptions',
            name: 'Solid-State Drive (SSD)',
            options: [
                { value: '1tb', label: '1TB', checked: false },
                { value: '128gb', label: '128GB', checked: false },
                { value: '256gb', label: '256GB', checked: false },
                { value: '512gb', label: '512GB', checked: false },
            ],
        },
        {
            id: 'graphicsMemoryOptions',
            name: 'Graphics Memory',
            options: [
                { value: '6gb', label: '6GB', checked: false },
                { value: 'shared', label: 'Shared', checked: false },
            ],
        },
        {
            id: 'laptopSeriesOptions',
            name: 'Laptop Series',
            options: [
                { value: 'surface-go', label: 'Surface Go', checked: false },
                { value: 'surface-laptop', label: 'Surface Laptop', checked: false },
                { value: 'surface-pro', label: 'Surface Pro', checked: false },
            ],
        }
    ];
    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "Microsoft")} isError={isError} isLoading={isLoading} error={error} filtering={microsoft}  ></AllCategory>

    );
};

export default Microsoft;