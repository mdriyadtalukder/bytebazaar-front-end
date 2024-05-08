import { Link } from "react-router-dom";
import { useAddToCartMutation, useDeleteLaptopMutation, useEditCartMutation, useGetAllProductQuery, useGetCartQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import { MdFavorite } from "react-icons/md";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../../authentication/authProvider/AuthProvider";
import { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoriteQuery } from "../../../../RTK-Query/features/favorite/favoriteApi";
import { Rating } from "@smastrom/react-rating";

const SingleProduct = ({ d }) => {
    const { user } = useContext(AuthContext);
    const { data: carts } = useGetCartQuery(user?.email)
    const [addToCart] = useAddToCartMutation();
    const [addFavorite] = useAddFavoriteMutation();
    const [editCart] = useEditCartMutation();
    const { data: laptops } = useGetAllProductQuery();
    const { data: favorites } = useGetFavoriteQuery(user?.email);
    const [deleteFavorite] = useDeleteFavoriteMutation()
    const [deleteLaptop] = useDeleteLaptopMutation()


    const handleCart = (e) => {
        e.preventDefault();
        const cart = carts.find(c => c?.cartId === d?._id);
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
                title: `${d?.productGeneral?.productModel} added more to your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (cart?._id && laptop?.productQuantity <= cart?.quantity) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `You already added all quantity of ${d?.productGeneral?.productModel} in your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (!cart?._id) {
            addToCart({
                productName: d?.productName,
                email: user?.email,
                cartId: d?._id,
                productImage: d?.productImage,
                productPrice: d?.productPrice,
                quantity: 1,
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${d?.productGeneral?.productModel} added to your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    // const a = {
    //     _id: 6444444444447788,
    //     productName: 566,
    //     favoriteId: 223,
    //     productPrice: 5689,
    // };
    // const { _id, ...newObject } = a;

    // console.log(newObject)


    const handleFavorite = (e) => {
        e.preventDefault();
        const favorite = favorites.find(f => f?.favoriteId === d?._id);
        if (favorite?._id) {
            deleteFavorite(favorite?._id);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${d?.productGeneral?.productModel} deleted!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            addFavorite({
                productName: d?.productName,
                email: user?.email,
                favoriteId: d?._id,
                productImage: d?.productImage,
                productPrice: d?.productPrice,
                quantity: d?.productQuantity,
            });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${d?.productGeneral?.productModel} added to your wishlist!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const handleDeleteLaptop = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteLaptop(d?._id);
                Swal.fire({
                    title: "Deleted!",
                    text: `The item has been deleted.`,
                    icon: "success"
                });
            }
        });
    }

    const productReviews = d?.productReviews || [];

    // Calculate the total number of reviews and the sum of all ratings
    const totalReviews = productReviews.length;
    const totalRatingSum = productReviews.reduce((sum, review) => sum + review.rating, 0);

    // Calculate the average rating
    const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;
    return (

        <div className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col">
            <Link to={`/dashboard/laptop/${d?._id}`}><img
                src={d?.productImage}
                alt="Card img"
                className="object-cover object-center w-full h-48  bg-base-100 rounded-t-lg shadow-lg"
            /></Link>
            <div className="flex flex-grow">
                <div className="triangle"></div>
                <div className="flex flex-col justify-between px-4 py-6 w-full bg-base-100 rounded-b-lg shadow-lg">
                    <div>

                        <Link to={`/dashboard/laptop/${d?._id}`}
                            className=" truncate-2-lines block mb-4  font-black leading-tight  hover:text-indigo-400">
                            {d?.productName}
                        </Link>
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={averageRating}
                            readOnly
                        />
                        <Link to={`/dashboard/laptop/${d?._id}`}>
                            <p><span className="font-bold">Brand: </span>{d?.productGeneral?.productBrand}</p>
                            <p><span className="font-bold">Processor Type: </span>{d?.productProcessor?.processorType}</p>
                            <p><span className="font-bold">Generation: </span>{d?.productProcessor?.processorGeneration || "Not Applicable"}</p>
                            <p><span className="font-bold">RAM: </span>{d?.productMemory?.ram}</p>
                            <p><span className="font-bold">Storage: </span>{d?.productStorage?.storage}</p>
                            <p><span className="font-bold">Graphics Memory: </span>{d?.productGraphics?.graphicsMemory}</p>
                            <p><span className="font-bold">Display Size (Inch): </span>{d?.productDisplay?.displaySizeInch} (Inch)</p>
                            <p><span className="font-bold">Laptop Series: </span>{d?.productGeneral?.productLaptopSeries}</p>
                            <p><span className="font-bold">Quantity: </span>{d?.productQuantity}</p>
                        </Link>

                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-bold">Tk {d?.productPrice}</span>


                        <MdFavorite onClick={handleFavorite} className="h-7 w-7 text-pink-600 cursor-pointer"></MdFavorite>
                        <Link to={`/dashboard/editLaptop/${d?._id}`}>
                            <button className="bg-indigo-400 hover:bg-indigo-400 text-white font-bold p-2 rounded">
                                Edit
                            </button>
                        </Link>

                        <button onClick={handleDeleteLaptop} className="bg-red-600 hover:bg-red-600 text-white font-bold p-2  rounded">
                            Delete
                        </button>
                        <button onClick={handleCart} className="bg-indigo-400 hover:bg-indigo-400 text-white font-bold p-2 rounded">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SingleProduct;