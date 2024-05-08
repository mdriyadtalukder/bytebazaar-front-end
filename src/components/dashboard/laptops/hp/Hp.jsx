import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "../allCategory/AllCategory";

const Hp = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const hp = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'core-i3', label: 'Core i3', checked: false },
                { value: 'core-i5', label: 'Core i5', checked: false },
                { value: 'core-i7', label: 'Core i7', checked: false },
                { value: 'intel-celeron', label: 'Intel Celeron', checked: false },
                { value: 'amd-athlon', label: 'AMD Athlon', checked: false },
                { value: 'ryzen-3', label: 'Ryzen 3', checked: false },
                { value: 'ryzen-5', label: 'Ryzen 5', checked: false },
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
                { value: '4gb', label: '4GB', checked: false },
                { value: '8gb', label: '8GB', checked: false },
                { value: '16gb', label: '16GB', checked: false },
            ],
        },
        {
            id: 'ssdOptions',
            name: 'Solid-State Drive (SSD)',
            options: [
                { value: '1tb', label: '1TB', checked: false },
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
                { value: '14', label: '14', checked: false },
                { value: '15', label: '15', checked: false },
                { value: '15s', label: '15s', checked: false },
                { value: 'pavilion', label: 'Pavilion', checked: false },
                { value: 'probook', label: 'ProBook', checked: false },
                { value: 'spectre', label: 'Spectre', checked: false },
                { value: 'victus', label: 'Victus', checked: false },
            ],
        }
    ];
    return (
        <AllCategory data={data?.filter(d => d?.productGeneral?.productBrand === "HP")} isError={isError} isLoading={isLoading} error={error} filtering={hp}  ></AllCategory>

    );
};

export default Hp;