import { Rating } from "@smastrom/react-rating";

const SingleReview = ({ r }) => {
    return (
        <div className="flex items-start p-5 bg-base-100 rounded-lg shadow-lg mt-3 ">
            <div className="flex-shrink-0">
                <div className="inline-block relative">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src={r?.image} alt="Profile picture" />
                        <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                    </div>

                </div>
            </div>
            <div className="ml-6">
                <p className="flex items-baseline">
                    <span className="text-gray-600 font-bold">{r?.name}</span>
                </p>
                <div className="flex items-center mt-1">
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={r?.rating}
                        readOnly
                    />
                </div>

                <div className="mt-3">
                    <p className="mt-1">{r?.review}</p>
                </div>

            </div>
        </div>
    );
};

export default SingleReview;