import { Link } from "react-router-dom";

const SingleRelated = ({ r }) => {
    return (
        <div className="rounded overflow-hidden shadow-lg bg-base-100">


            <div className="relative">
                <Link to={`/dashboard/laptop/${r?._id}`}>
                    <img className="w-full"
                        src={r?.productImage}
                        alt="Sunset in the mountains" />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </Link>



            </div>
            <div className="px-6 py-4">

                <Link to={`/dashboard/laptop/${r?._id}`}
                    className="font-semibold truncate-2-lines text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{r?.productName}</Link>
                <p className="text-center mt-3 font-bold">
                    Tk {r?.productPrice}
                </p>
                <p className="text-center mt-3 font-bold">
                    Quantity: {r?.productQuantity}
                </p>
            </div>
        </div>
    );
};

export default SingleRelated;