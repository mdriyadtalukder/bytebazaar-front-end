import { useContext } from "react";
import { TbCoinFilled } from "react-icons/tb";
import { useGetCoinQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";

const SingleCoinProduct = ({ d }) => {
    const { user } = useContext(AuthContext);
    const { data: coin } = useGetCoinQuery(user?.email);

    return (
        <div className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col">
            <img
                src={d?.image}
                alt="Card img"
                className="object-cover object-center w-full h-full  bg-base-100 rounded-t-lg shadow-lg"
            />
            <div className="flex flex-grow">
                <div className="triangle"></div>
                <div className="flex flex-col justify-between px-4 py-6 w-full bg-base-100 rounded-b-lg shadow-lg">
                    <div>

                        <p
                            className=" truncate-2-lines block mb-4  font-black leading-tight  hover:text-indigo-400">
                            {d?.name}
                        </p>


                        <p><span className="font-bold">Type: </span>{d?.type}</p>
                        {
                            d?.lighting ? <p><span className="font-bold">Lighting: </span>{d?.lighting}</p> : <p><span className="font-bold">Plug Type: </span>{d?.plugType}</p>

                        }

                        {
                            d?.clickSound ? <p><span className="font-bold">Click Sound: </span>{d?.clickSound}</p> : <p><span className="font-bold">Microphone: </span>{d?.microphone}</p>

                        }                        <p><span className="font-bold">Quantity: </span>{d?.Quantity}</p>
                        <button disabled={coin?.coins < d?.coins} className={`${coin?.coins < d?.coins ? 'bg-gray-300 text-gray-600' : 'bg-yellow-300 text-yellow-600 '} py-2.5 px-6 w-full rounded-lg text-lg   flex items-center justify-center font-bold`}>
                            <TbCoinFilled className={`${coin?.coins < d?.coins ? ' text-gray-600' : ' text-yellow-600 '} h-9 w-9  mr-2`} /> {d?.coins}
                        </button>



                    </div>


                </div>
            </div>
        </div>
    );
};

export default SingleCoinProduct;