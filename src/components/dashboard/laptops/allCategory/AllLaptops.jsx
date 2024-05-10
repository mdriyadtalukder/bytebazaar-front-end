import { useGetAllProductQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import AllCategory from "./AllCategory";

const AllLaptops = () => {
    const { data, isError, isLoading, error } = useGetAllProductQuery()
    const allLaptop = [
        {
            id: 'processorType',
            name: 'Processor Type',
            options: [
                { value: 'apple-m1', label: 'Apple M1', checked: false },
                { value: 'apple-m2', label: 'Apple M2', checked: false },
                { value: 'apple-m3', label: 'Apple M3', checked: false },
                { value: 'core-n100', label: 'Core N100', checked: false },
                { value: 'core-i3', label: 'Core i3', checked: false },
                { value: 'core-i5', label: 'Core i5', checked: false },
                { value: 'core-i7', label: 'Core i7', checked: false },
                { value: 'core-ultra-7', label: 'Core Ultra 7', checked: false },
                { value: 'core-i9', label: 'Core i9', checked: false },
                { value: 'intel-celeron', label: 'Intel Celeron', checked: false },
                { value: 'amd-athlon', label: 'AMD Athlon', checked: false },
                { value: 'ryzen-3', label: 'Ryzen 3', checked: false },
                { value: 'ryzen-5', label: 'Ryzen 5', checked: false },
                { value: 'ryzen-7', label: 'Ryzen 7', checked: false },
                { value: 'ryzen-9', label: 'Ryzen 9', checked: false },
            ],
        },
        {
            id: 'processorGeneration',
            name: 'Processor Generation',
            options: [
                { value: '10th', label: '10th (Intel)', checked: false },
                { value: '11th', label: '11th (Intel)', checked: false },
                { value: '12th', label: '12th (Intel)', checked: false },
                { value: '12th-standard', label: '12th Standard (Intel)', checked: false },
                { value: '13th', label: '13th (Intel)', checked: false },
                { value: '14th', label: '14th (Intel)', checked: false },
                { value: 'unmentioned', label: 'Unmentioned', checked: false },
                { value: 'not-applicable', label: 'Not Applicable', checked: false },
            ],
        },
        {
            id: 'ramOptions',
            name: 'RAM',
            options: [
                { value: '4gb', label: '4GB', checked: false },
                { value: '8gb', label: '8GB', checked: false },
                { value: '12gb', label: '12GB', checked: false },
                { value: '16gb', label: '16GB', checked: false },
                { value: '18gb', label: '18GB', checked: false },
                { value: '24gb', label: '24GB', checked: false },
                { value: '32gb', label: '32GB', checked: false },
                { value: '36gb', label: '36GB', checked: false },
                { value: '48gb', label: '48GB', checked: false },
                { value: '64gb', label: '64GB', checked: false },
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
                { value: '128gb', label: '128GB', checked: false },
                { value: '128gb-emmc', label: '128GB eMMC', checked: false },
                { value: '256gb', label: '256GB', checked: false },
                { value: '512gb', label: '512GB', checked: false },
            ],
        },
        {
            id: 'graphicsMemoryOptions',
            name: 'Graphics Memory',
            options: [
                { value: '2gb', label: '2GB', checked: false },
                { value: '4gb', label: '4GB', checked: false },
                { value: '6gb', label: '6GB', checked: false },
                { value: '8gb', label: '8GB', checked: false },
                { value: '16gb', label: '16GB', checked: false },
                { value: 'shared', label: 'Shared', checked: false },
            ],
        },
        {
            id: 'laptopSeriesOptions',
            name: 'Laptop Series',
            options: [
                { value: 'all', label: 'All', checked: false },
                { value: 'acer', label: 'Acer', checked: false },
                { value: 'apple', label: 'Apple', checked: false },
                { value: 'asus', label: 'Asus', checked: false },
                { value: 'avita', label: 'Avita', checked: false },
                { value: 'chuwi', label: 'Chuwi', checked: false },
                { value: 'dell', label: 'Dell', checked: false },
                { value: 'gigabyte', label: 'Gigabyte', checked: false },
                { value: 'hp', label: 'Hp', checked: false },
                { value: 'huawei', label: 'Huawei', checked: false },
                { value: 'infinix', label: 'Infinix', checked: false },
                { value: 'lenovo', label: 'Lenovo', checked: false },
                { value: 'microsoft', label: 'Microsoft', checked: false },
                { value: 'msi', label: 'MSI', checked: false },
            ],
        }
    ];

    return (
        <AllCategory data={data} isError={isError} isLoading={isLoading} error={error} filtering={allLaptop} model={true}  ></AllCategory>
    );
};

export default AllLaptops;