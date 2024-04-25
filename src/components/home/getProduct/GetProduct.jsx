import image from '../../../assets/many-laptops/many-laptops.png';
import Title from '../../title/Title';


const GetProduct = () => {
    return (

        <div className='bg-gradient-to-r from-indigo-100 to-teal-100'>
            <Title title='Get Laptop'></Title>
            <div className="hero min-h-screen bg-gradient-to-r from-indigo-100 to-teal-100">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={image} className="w-screen" />
                    <div>
                        <h1 className="text-5xl font-bold">Unleash Your Potential with Cutting-Edge Laptops!</h1>
                        <p className="py-6">Discover the perfect blend of power and portability. Shop our curated collection of top-notch laptops designed to elevate your productivity, gaming experience, and creative pursuits. From sleek ultrabooks to high-performance gaming rigs, find your perfect match today and step into a world of limitless possibilities.</p>
                        <button className="p-3 rounded-lg bg-indigo-400 text-white font-bold me-4">Go Shopping</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default GetProduct;