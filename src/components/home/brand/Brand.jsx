import img from '../../../assets/brand/acer.png';
import img2 from '../../../assets/brand/apple.png';
import img3 from '../../../assets/brand/asus.png';
import img4 from '../../../assets/brand/dell.png';
import img5 from '../../../assets/brand/gigabyte.png';
import img6 from '../../../assets/brand/hp.png';
import img7 from '../../../assets/brand/huawei.png';
import img8 from '../../../assets/brand/levono.png';
import img9 from '../../../assets/brand/microsoft.png';
import img10 from '../../../assets/brand/msi.png';
import img11 from '../../../assets/brand/razer.png';
import img12 from '../../../assets/brand/samsung.png';
import Title from '../../title/Title';
const Brand = () => {
    return (
        <div className='bg-indigo-100 p-10'>
            <Title title='Our Brand'></Title>
            <div className='flex justify-evenly items-center bg-base-100 shadow-lg rounded-lg lg:p-4 md:p-3 sm:p-0'>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-indigo-400' src={img} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-teal-400' src={img2} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-indigo-400' src={img3} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-teal-400' src={img4} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-indigo-400' src={img5} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-teal-400' src={img6} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-indigo-400' src={img7} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-teal-400' src={img8} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-indigo-400' src={img9} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-teal-400' src={img10} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-indigo-400' src={img11} alt="" /></div>
                <div><img className='h-[80px] w-[90px] border-2 p-2 shadow-lg rounded-lg border-teal-400' src={img12} alt="" /></div>

            </div>
        </div>
    );
};

export default Brand;