import { Parallax } from 'react-parallax';
import image from '../../../assets/gaming-laptops/gaming-laptop.jpg';
import Title from '../../title/Title';
import { Link } from 'react-router-dom';
const GamingLaptop = () => {
    return (

        <div className=' bg-indigo-100'>
            <Title title='Get Gaming Laptop'></Title>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={image}
                bgImageAlt="the dog"
                strength={-200}
            ><div className="hero min-h-screen" >
                    {/* uporer class  hero te bg-fixed class add krle pic utha nama krbe full obdi scroll krle */}
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Enter the World of Ultimate Gaming Power</h1>
                            <p className="mb-5">Immerse yourself in unparalleled gaming experiences with our handpicked selection of high-performance gaming laptops. From lightning-fast processors to cutting-edge graphics cards, each laptop in our collection is meticulously crafted to deliver the power and precision you need to dominate the virtual battlefield. Explore our range of gaming laptops and elevate your gaming journey to new heights. Whether you are a casual gamer or a competitive esports enthusiast, find your perfect gaming companion here.</p>
                            <Link to='/dashboard/gaming'><button className="p-3 rounded-lg bg-indigo-400 text-white font-bold me-4">Get Laptop</button></Link>
                        </div>
                    </div>
                </div> </Parallax>


        </div>


    );
};

export default GamingLaptop;