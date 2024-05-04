
const Title = ({ title }) => {
    return (
        <div className='flex justify-center items-center text-4xl font-bold mb-8 '>
            <h1 className='border-y-2 border-teal-400 p-4 w-auto bg-base-100 shadow-lg rounded-lg'>{title}</h1>
        </div>

    );
};

export default Title;