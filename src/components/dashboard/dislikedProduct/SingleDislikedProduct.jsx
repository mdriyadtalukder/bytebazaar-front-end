import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useAddToCartMutation, useEditCartMutation, useGetAllProductQuery, useGetCartQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import { useDeleteDislikedProductMutation, useUpdateDislikesMutation } from "../../../RTK-Query/features/dislikes/dislikedProductApi";
import Swal from "sweetalert2";
import { AiFillDislike } from "react-icons/ai";
import Loading from "../../loading/Loading";

const SingleDislikedProduct = ({ f }) => {
    const { user } = useContext(AuthContext);
    const { data: carts } = useGetCartQuery(user?.email)
    const [addToCart] = useAddToCartMutation();
    const [editCart] = useEditCartMutation();
    const { data: laptops, isLoading } = useGetAllProductQuery();
    const [deleteDislikedProduct] = useDeleteDislikedProductMutation();
    const [updateDislikes] = useUpdateDislikesMutation();



    const handleCart = (e) => {
        e.preventDefault();
        const cart = carts.find(c => c?.cartId === f?.dislikeId);

        const laptop = laptops?.find(c => c?._id === cart?.cartId);

        if (cart?._id && laptop?.productQuantity > cart?.quantity) {
            editCart({
                id: cart?._id,
                data: {
                    quantity: Number(cart?.quantity) + 1
                }
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${f?.productName} added more to your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (cart?._id && laptop?.productQuantity <= cart?.quantity) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `You already added all quantity of ${f?.productName} in your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (!cart?._id) {
            addToCart({
                productName: f?.productName,
                email: user?.email,
                cartId: f?.dislikeId,
                productImage: f?.productImage,
                productPrice: f?.productPrice,
                quantity: 1,
                sellerID: f?.sellerID,
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${f?.productName} added to your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handledislikeDelete = (e) => {
        e.preventDefault();
        const laptopp = laptops?.find(c => c?._id === f?.dislikeId);
        updateDislikes({
            id: laptopp?._id,
            data: {
                productUnlikes: Number(laptopp?.productUnlikes) - 1
            }
        });
        deleteDislikedProduct(f?._id);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `This liked item deleted!`,
            showConfirmButton: false,
            timer: 1500
        });


    }
    return (
        <>
            {
                isLoading ? <Loading></Loading> :
                    <div className="rounded overflow-hidden shadow-lg bg-base-100">


                        <div className="relative">
                            <Link to={`/dashboard/laptop/${f?.dislikeId}`}>
                                <img className="w-full"
                                    src={f?.productImage}
                                    alt="Sunset in the mountains" />
                                <div
                                    className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                </div>
                            </Link>



                        </div>
                        <div className="px-6 py-4">

                            <Link to={`/dashboard/laptop/${f?.dislikeId}`}
                                className="font-semibold truncate-2-lines text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{f?.productName}</Link>
                            <p className="text-center mt-3 font-bold">
                                Tk {f?.productPrice}
                            </p>
                            {/* <p className="text-center mt-3 font-bold">
                Quantity: {f?.quantity}
            </p> */}
                        </div>
                        <div className="px-6 py-4 flex justify-between items-center ">
                            <button onClick={handleCart} className="bg-indigo-400 hover:bg-indigo-400 text-white font-bold p-1 rounded">
                                Add to cart
                            </button>
                            <p>{f?.productLikes} <AiFillDislike onClick={handledislikeDelete} className={`${f?.dislike && 'text-indigo-500'} text-2xl cursor-pointer `}></AiFillDislike></p>

                        </div>
                    </div>
            }
        </>
    );
};

export default SingleDislikedProduct;