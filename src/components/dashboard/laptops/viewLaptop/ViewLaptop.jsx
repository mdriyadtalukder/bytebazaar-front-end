import { useParams } from "react-router-dom";
import { useAddToCartMutation, useEditCartMutation, useEditLaptopMutation, useGetAProductQuery, useGetAllProductQuery, useGetCartQuery } from "../../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../../loading/Loading";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../authentication/authProvider/AuthProvider";
import { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoriteQuery } from "../../../../RTK-Query/features/favorite/favoriteApi";
import { useGetRelatedQuery } from "../../../../RTK-Query/features/related/relatedApi";
import { Rating } from "@smastrom/react-rating";
import SingleReview from "./SingleReview";
import SingleRelated from "./SingleRelated";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useAddLikedProductMutation, useDeleteLikedProductMutation, useGetLikedProductQuery, useUpdateLikesMutation } from "../../../../RTK-Query/features/likes/likedProductApi";
import { useAddDislikedProductMutation, useDeleteDislikedProductMutation, useGetDislikedProductQuery, useUpdateDislikesMutation } from "../../../../RTK-Query/features/dislikes/dislikedProductApi";
import { MdGroups } from "react-icons/md";
import { useGetPaymentsQuery } from "../../../../RTK-Query/features/payment/paymentApi";

const ViewLaptop = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { data, isError, isLoading, error } = useGetAProductQuery(id);
    const { data: carts } = useGetCartQuery(user?.email)
    const [addToCart] = useAddToCartMutation();
    const [editCart] = useEditCartMutation();
    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFavorite] = useDeleteFavoriteMutation();
    const { data: favorites } = useGetFavoriteQuery(user?.email);
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState('');
    const [editLaptop] = useEditLaptopMutation();
    const { data: laptops } = useGetAllProductQuery();
    const { data: relateds, isLoading: rloading, error: err } = useGetRelatedQuery(id);

    const [updateLikes] = useUpdateLikesMutation();
    const [updateDislikes] = useUpdateDislikesMutation();

    const { data: likes } = useGetLikedProductQuery(user?.email);
    const [addLikedProduct] = useAddLikedProductMutation();
    const [deleteLikedProduct] = useDeleteLikedProductMutation();

    const { data: dislikes } = useGetDislikedProductQuery(user?.email);
    const [addDislikedProduct] = useAddDislikedProductMutation();
    const [deleteDislikedProduct] = useDeleteDislikedProductMutation();

    const { data: order, isLoading: orderLoading } = useGetPaymentsQuery(user?.email);
    let arr = []
    order?.map(d => {
        d?.menuItemIds?.map(i => {
            if (i === id) {
                arr.push('true')
            }
        })
    })
    //console.log('id', id)
    //console.log(arr.length)

    const handleCart = (e) => {
        e.preventDefault();
        const cart = carts.find(c => c?.cartId === data?._id);
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
                title: `${data?.productGeneral?.productModel} added more to your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (cart?._id && laptop?.productQuantity <= cart?.quantity) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `You already added all quantity of ${data?.productGeneral?.productModel} in your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        if (!cart?._id) {
            addToCart({
                productName: data?.productName,
                email: user?.email,
                cartId: data?._id,
                productImage: data?.productImage,
                productPrice: data?.productPrice,
                quantity: 1,
                sellerID: data?.sellerID,

            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data?.productGeneral?.productModel} added to your cart!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleFavorite = (e) => {
        e.preventDefault();
        const favorite = favorites.find(f => f?.favoriteId === data?._id);
        if (favorite?._id) {
            deleteFavorite(favorite?._id);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data?.productGeneral?.productModel} deleted!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            addFavorite({
                productName: data?.productName,
                email: user?.email,
                favoriteId: data?._id,
                productImage: data?.productImage,
                productPrice: data?.productPrice,
                quantity: data?.productQuantity,
                sellerID: data?.sellerID,

            });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data?.productGeneral?.productModel} added to your wishlist!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleEditReview = (e) => {
        e.preventDefault();
        const rev = data?.productReviews?.find(d => d?.email === user?.email);
        if (rev?.email) {
            editLaptop({
                id: data?._id,
                data: {
                    productReviews: [
                        ...(data?.productReviews?.filter(d => d?.email !== user?.email) || []),
                        {
                            name: user?.displayName,
                            email: user?.email,
                            image: user?.photoURL,
                            rating: rating,
                            review: review,
                        }
                    ]
                }
            });

            e.target.reset();
            setRating(null)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `A rating and review has added`,
                showConfirmButton: false,
                timer: 1500
            });

        }
        else {
            editLaptop({
                id: data?._id,
                data: {
                    productReviews: [...(data?.productReviews || []), {
                        name: user?.displayName,
                        email: user?.email,
                        image: user?.photoURL,
                        rating: rating,
                        review: review,
                    }]
                }
            });
            e.target.reset();
            setRating(null)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `A rating and review has added`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    const handleLike = (e) => {
        e.preventDefault();
        const liked = likes.find(f => f?.likeId === data?._id);
        const disliked = dislikes.find(f => f?.dislikeId === data?._id);

        console.log(liked)
        if (liked?._id && !disliked?._id) {
            updateLikes({
                id: data?._id,
                data: {
                    productLikes: Number(data?.productLikes) - 1
                }
            });
            deleteLikedProduct(liked?._id);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `This liked item deleted!`,
                showConfirmButton: false,
                timer: 1500
            });

        }
        if (!liked?._id) {
            updateLikes({
                id: data?._id,
                data: {
                    productLikes: Number(data?.productLikes) + 1
                }
            });
            addLikedProduct({
                productName: data?.productName,
                email: user?.email,
                likeId: data?._id,
                like: true,
                likes: Number(data?.productLikes) + 1,
                dislikes: Number(data?.productUnlikes),
                productImage: data?.productImage,
                productPrice: data?.productPrice,
                quantity: data?.productQuantity,
                sellerID: data?.sellerID,

            });
            if (disliked?._id) {
                updateDislikes({
                    id: data?._id,
                    data: {
                        productUnlikes: Number(data?.productUnlikes) - 1
                    }
                });
                deleteDislikedProduct(disliked?._id);
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `This liked item added!`,
                showConfirmButton: false,
                timer: 1500
            });


        }
    }

    const handleDislike = (e) => {
        e.preventDefault();
        const disliked = dislikes.find(f => f?.dislikeId === data?._id);
        const liked = likes.find(f => f?.likeId === data?._id);

        if (disliked?._id && !liked?._id) {
            updateDislikes({
                id: data?._id,
                data: {
                    productUnlikes: Number(data?.productUnlikes) - 1
                }
            });
            deleteDislikedProduct(disliked?._id);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `This disliked item deleted!`,
                showConfirmButton: false,
                timer: 1500
            });


        }
        if (!disliked?._id) {
            updateDislikes({
                id: data?._id,
                data: {
                    productUnlikes: Number(data?.productUnlikes) + 1
                }
            });
            addDislikedProduct({
                productName: data?.productName,
                email: user?.email,
                dislikeId: data?._id,
                dislike: true,
                likes: Number(data?.productLikes),
                dislikes: Number(data?.productUnlikes) + 1,
                productImage: data?.productImage,
                productPrice: data?.productPrice,
                quantity: data?.productQuantity,
                sellerID: data?.sellerID,

            });
            if (liked?._id) {
                updateLikes({
                    id: data?._id,
                    data: {
                        productLikes: Number(data?.productLikes) - 1
                    }
                });
                deleteLikedProduct(liked?._id);
            }

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `This disliked item added!`,
                showConfirmButton: false,
                timer: 1500
            });

        }
    }

    const productReviews = data?.productReviews || [];

    // Calculate the total number of reviews and the sum of all ratings
    const totalReviews = productReviews.length;
    const totalRatingSum = productReviews.reduce((sum, review) => sum + review.rating, 0);

    // Calculate the average rating
    const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;

    const fav = favorites.find(f => f?.favoriteId === data?._id);
    const like = likes?.find(f => f?.likeId === data?._id);
    const dislike = dislikes?.find(f => f?.dislikeId === data?._id);
    return (
        <>
            {
                isLoading ? <Loading></Loading> : rloading ? <Loading></Loading> : isError ? <p className='text-red-600 font-bold text-center'>{error?.status}</p> : err ? <p className='text-red-600 font-bold text-center'>{err?.status}</p> :
                    <>
                        <div className="bg-base-100 w-full dark:bg-gray-800 py-8">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col md:flex-row -mx-4">
                                    <div className="md:flex-1 px-4">
                                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 ">
                                            <img className="w-full h-full object-cover" src={data?.productImage} alt="Product Image" />

                                        </div>
                                        {
                                            user && <div className="flex -mx-2 mb-4 mt-20">
                                                <div onClick={handleCart} className="w-1/2 px-2">
                                                    <button className="w-full bg-indigo-400 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-400 dark:hover:bg-indigo-400">Add to Cart</button>
                                                </div>
                                                <div className="w-1/2 px-2">
                                                    <button onClick={handleFavorite} className={`${fav?._id ? 'bg-pink-400 text-white' : 'bg-slate-200 text-gray-800'} w-full   dark:bg-gray-700  dark:text-white py-2 px-4 rounded-full font-bold hover:bg-pink-400 dark:hover:bg-gray-600 `}>Add to Wishlist</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="md:flex-1 px-4">
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{data?.productName}</h2>
                                        <div className="flex items-center justify-start">
                                            <Rating
                                                style={{ maxWidth: 180 }}
                                                value={averageRating}
                                                readOnly
                                            />
                                            <MdGroups className="text-3xl text-indigo-400 ms-5"></MdGroups>
                                            <span className="ms-2 text-lg font-bold"> {totalReviews}</span>
                                        </div>
                                        {
                                            user && <div className="flex items-center justify-start text-lg">
                                                <p>{data?.productLikes} <AiFillLike onClick={handleLike} className={`${like?._id && 'text-indigo-500'} text-2xl cursor-pointer me-2 `}></AiFillLike></p>
                                                <p>{data?.productUnlikes} <AiFillDislike onClick={handleDislike} className={`${dislike?._id && 'text-indigo-500'} text-2xl cursor-pointer `} ></AiFillDislike ></p>



                                            </div>
                                        }
                                        {
                                            !user && <div className="flex items-center justify-start text-lg">
                                                <p>{data?.productLikes}  <p className="font-bold text-indigo-400 me-2"> Likes</p></p>
                                                <p>{data?.productUnlikes}<p className="font-bold text-indigo-400"> Dislikes</p></p>



                                            </div>
                                        }
                                        <div className="flex my-4">
                                            <div className="mr-4">

                                                <span className=" text-lg font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                                <span className=" text-lg text-gray-600 dark:text-gray-300">{data?.productPrice}</span>
                                            </div>
                                            <div>
                                                <span className=" text-lg font-bold text-gray-700 dark:text-gray-300">Quantity: </span>
                                                <span className=" text-lg text-gray-600 dark:text-gray-300">{data?.productQuantity}</span>
                                            </div>
                                        </div>


                                        <div>
                                            <span className="font-bold  dark:text-gray-300 text-2xl ">Quick view</span>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">

                                                <p className="text-lg mb-2"><span className="font-bold">Brand: </span>{data?.productGeneral?.productBrand}</p>
                                                <p className="text-lg mb-2"><span className="font-bold">Processor Type: </span>{data?.productProcessor?.processorType}</p>
                                                <p className="text-lg mb-2"><span className="font-bold">Generation: </span>{data?.productProcessor?.processorGeneration}</p>
                                                <p className="text-lg mb-2"><span className="font-bold">RAM: </span>{data?.productMemory?.ram}</p>
                                                <p className="text-lg mb-2"><span className="font-bold">Storage: </span>{data?.productStorage?.storage}</p>
                                                <p className="text-lg mb-2"><span className="font-bold">Graphics Memory: </span>{data?.productGraphics?.graphicsMemory}</p>
                                                <p className="text-lg mb-2"><span className="font-bold">Display Size (Inch): </span>{data?.productDisplay?.displaySizeInch} (Inch)</p>
                                                <p className="text-lg mb-2"><span className="font-bold">Laptop Series: </span>{data?.productGeneral?.productLaptopSeries}</p>
                                                <p className="text-lg mb-2"><span className="font-bold">SID: </span>{data?.sellerID}</p>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <body className="flex items-center justify-center w-full h-full p-6 bg-indigo-100">
                            <div className="flex flex-col w-full bg-base-100 rounded-lg shadow-lg">
                                <div className="flex items-center h-20 px-4 border-b border-gray-500">
                                    <div className="w-40 text-3xl font-bold">Description</div>
                                    <div className="flex-grow text-lg font-semibold text-center"></div>
                                </div>

                                {/* General */}
                                {data?.productGeneral && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">General</div>
                                    </div>
                                    {data?.productGeneral?.productBrand && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Brand</div>
                                        <div className="flex justify-center flex-grow">{data?.productGeneral?.productBrand}</div>
                                    </div>}
                                    {data?.productGeneral?.productModel && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Model</div>
                                        <div className="flex justify-center flex-grow">{data?.productGeneral?.productModel}</div>

                                    </div>}
                                    {data?.productGeneral?.productLaptopSeries && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Laptop Series</div>
                                        <div className="flex justify-center flex-grow">{data?.productGeneral?.productLaptopSeries}</div>

                                    </div>}
                                    {data?.productGeneral?.productPartNo && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Part No</div>
                                        <div className="flex justify-center flex-grow">{data?.productGeneral?.productPartNo}</div>
                                    </div>}
                                </>}

                                {/* Processor */}
                                {data?.productProcessor && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Processor</div>
                                    </div>
                                    {data?.productProcessor?.processorBrand && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Processor Brand</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.processorBrand}</div>
                                    </div>}
                                    {data?.productProcessor?.processorType && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Processor Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.processorType}</div>

                                    </div>}
                                    {data?.productProcessor?.processorGeneration && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Generation</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.processorGeneration}</div>

                                    </div>}
                                    {data?.productProcessor?.processorModel && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Processor Model</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.processorModel}</div>
                                    </div>}
                                    {data?.productProcessor?.processorBaseFrequency && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Processor Base Frequency</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.processorBaseFrequency}</div>
                                    </div>}
                                    {data?.productProcessor?.processorMaxTurboFrequency && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Processor Max Turbo Frequency</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.processorMaxTurboFrequency}</div>
                                    </div>}
                                    {data?.productProcessor?.processorCore && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Processor Core</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.processorCore}</div>
                                    </div>}
                                    {data?.productProcessor?.processorThread && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Processor Thread</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.processorThread}</div>
                                    </div>}
                                    {data?.productProcessor?.cpuCache && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">CPU Cache</div>
                                        <div className="flex justify-center flex-grow">{data?.productProcessor?.cpuCache}</div>
                                    </div>}
                                </>}

                                {/* Memory */}
                                {data?.productMemory && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Memory</div>
                                    </div>
                                    {data?.productMemory?.ram && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">RAM</div>
                                        <div className="flex justify-center flex-grow">{data?.productMemory?.ram}</div>
                                    </div>}
                                    {data?.productMemory?.installedRamDetails && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Installed RAM Details</div>
                                        <div className="flex justify-center flex-grow">{data?.productMemory?.installedRamDetails}</div>

                                    </div>}
                                    {data?.productMemory?.ramType && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">RAM Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productMemory?.ramType}</div>

                                    </div>}
                                    {data?.productMemory?.totalRamSlot && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Total RAM Slot</div>
                                        <div className="flex justify-center flex-grow">{data?.productMemory?.totalRamSlot}</div>
                                    </div>}
                                    {data?.productMemory?.emptyExpansionRamSlot && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Empty/Expansion RAM Slot</div>
                                        <div className="flex justify-center flex-grow">{data?.productMemory?.emptyExpansionRamSlot}</div>
                                    </div>}
                                    {data?.productMemory?.maxRamSupport && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Max. RAM Support</div>
                                        <div className="flex justify-center flex-grow">{data?.productMemory?.maxRamSupport}</div>
                                    </div>}
                                </>}

                                {/* Storage */}
                                {data?.productStorage && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Storage</div>
                                    </div>
                                    {data?.productStorage?.storage && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Storage</div>
                                        <div className="flex justify-center flex-grow">{data?.productStorage?.storage}</div>
                                    </div>}
                                    {data?.productStorage?.installedHddType && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Installed HDD Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productStorage?.installedHddType}</div>
                                    </div>}
                                    {data?.productStorage?.hddRpm && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">HDD RPM</div>
                                        <div className="flex justify-center flex-grow">{data?.productStorage?.hddRpm}</div>

                                    </div>}
                                    {data?.productStorage?.hddExpansionSlot && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">HDD Expansion Slot</div>
                                        <div className="flex justify-center flex-grow">{data?.productStorage?.hddExpansionSlot}</div>

                                    </div>}
                                    {data?.productStorage?.installedSsdType && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Installed SSD Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productStorage?.installedSsdType}</div>
                                    </div>}
                                    {data?.productStorage?.m2SsdExpansionSlot && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">M.2/SSD Expansion Slot</div>
                                        <div className="flex justify-center flex-grow">{data?.productStorage?.m2SsdExpansionSlot}</div>
                                    </div>}
                                    {data?.productStorage?.storageUpgrade && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Storage Upgrade</div>
                                        <div className="flex justify-center flex-grow">{data?.productStorage?.storageUpgrade}</div>
                                    </div>}

                                </>}

                                {/* Graphics */}
                                {data?.productGraphics && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Graphics</div>
                                    </div>
                                    {data?.productGraphics?.graphicsChipset && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Graphics Chipset</div>
                                        <div className="flex justify-center flex-grow">{data?.productGraphics?.graphicsChipset}</div>
                                    </div>}
                                    {data?.productGraphics?.graphicsMemoryAccessibility && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Graphics Memory Accessibility</div>
                                        <div className="flex justify-center flex-grow">{data?.productGraphics?.graphicsMemoryAccessibility}</div>
                                    </div>}
                                    {data?.productGraphics?.graphicsMemory && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Graphics Memory</div>
                                        <div className="flex justify-center flex-grow">{data?.productGraphics?.graphicsMemory}</div>

                                    </div>}
                                    {data?.productGraphics?.graphicsMemoryType && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Graphics Memory Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productGraphics?.graphicsMemoryType}</div>

                                    </div>}

                                </>}

                                {/* Display */}
                                {data?.productDisplay && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Display</div>
                                    </div>
                                    {data?.productDisplay?.displaySizeInch && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Display Size (Inch)</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.displaySizeInch}</div>
                                    </div>}
                                    {data?.productDisplay?.displayType && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Display Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.displayType}</div>

                                    </div>}
                                    {data?.productDisplay?.panelType && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Panel Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.panelType}</div>

                                    </div>}
                                    {data?.productDisplay?.displayResolution && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Display Resolution</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.displayResolution}</div>
                                    </div>}
                                    {data?.productDisplay?.displaySurface && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Display Surface</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.displaySurface}</div>
                                    </div>}
                                    {data?.productDisplay?.touchScreen && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Touch Screen</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.touchScreen}</div>
                                    </div>}
                                    {data?.productDisplay?.displayRefreshRate && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Display Refresh Rate</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.displayRefreshRate}</div>
                                    </div>}
                                    {data?.productDisplay?.displayBezel && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Display Bezel</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.displayBezel}</div>
                                    </div>}
                                    {data?.productDisplay?.brightness && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Brightness</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.brightness}</div>
                                    </div>}
                                    {data?.productDisplay?.displayFeatures && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Display Features</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.displayFeatures}</div>
                                    </div>}
                                    {data?.productDisplay?.secondaryScreenSize && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Secondary Screen Size</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.secondaryScreenSize}</div>
                                    </div>}
                                    {data?.productDisplay?.secondaryScreenTechnology && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Secondary Screen Technology</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.secondaryScreenTechnology}</div>
                                    </div>}
                                    {data?.productDisplay?.secondaryScreenResolution && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Secondary Screen Resolution</div>
                                        <div className="flex justify-center flex-grow">{data?.productDisplay?.secondaryScreenResolution}</div>
                                    </div>}
                                </>}

                                {/* Ports & Slots */}
                                {data?.productPortsSlots && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Ports & Slots</div>
                                    </div>
                                    {data?.productPortsSlots?.opticalDrive && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Optical Drive</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.opticalDrive}</div>
                                    </div>}
                                    {data?.productPortsSlots?.multimediaCardSlot && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Multimedia Card Slot</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.multimediaCardSlot}</div>

                                    </div>}
                                    {data?.productPortsSlots?.supportedMultimediaCard && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Supported Multimedia Card</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.supportedMultimediaCard}</div>

                                    </div>}
                                    {data?.productPortsSlots?.usb2Port && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">USB 2 Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.usb2Port}</div>
                                    </div>}
                                    {data?.productPortsSlots?.usb3Port && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">USB 3 Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.usb3Port}</div>
                                    </div>}
                                    {data?.productPortsSlots?.usbCThunderboltPort && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">USB C / Thunderbolt Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.usbCThunderboltPort}</div>
                                    </div>}
                                    {data?.productPortsSlots?.hdmiPort && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">HDMI Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.hdmiPort}</div>
                                    </div>}
                                    {data?.productPortsSlots?.microHdmiPort && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Micro HDMI Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.microHdmiPort}</div>
                                    </div>}
                                    {data?.productPortsSlots?.miniHdmiPort && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Mini HDMI Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.miniHdmiPort}</div>
                                    </div>}
                                    {data?.productPortsSlots?.displayPort && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Display Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.displayPort}</div>
                                    </div>}
                                    {data?.productPortsSlots?.miniDpPort && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Mini DP Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.miniDpPort}</div>
                                    </div>}
                                    {data?.productPortsSlots?.vgaDSub && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">VGA/D-Sub</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.vgaDSub}</div>
                                    </div>}
                                    {data?.productPortsSlots?.headphonePort && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Headphone Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.headphonePort}</div>
                                    </div>}
                                    {data?.productPortsSlots?.microphonePort && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Microphone Port</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.microphonePort}</div>
                                    </div>}
                                    {data?.productPortsSlots?.securityLockSlot && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Security Lock Slot</div>
                                        <div className="flex justify-center flex-grow">{data?.productPortsSlots?.securityLockSlot}</div>
                                    </div>}
                                </>}

                                {/* Network & Connectivity */}
                                {data?.productNetworkConnectivity && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Network & Connectivity</div>
                                    </div>
                                    {data?.productNetworkConnectivity?.lan && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">LAN</div>
                                        <div className="flex justify-center flex-grow">{data?.productNetworkConnectivity?.lan}</div>
                                    </div>}
                                    {data?.productNetworkConnectivity?.wiFi && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">WiFi</div>
                                        <div className="flex justify-center flex-grow">{data?.productNetworkConnectivity?.wiFi}</div>
                                    </div>}
                                    {data?.productNetworkConnectivity?.bluetooth && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Bluetooth</div>
                                        <div className="flex justify-center flex-grow">{data?.productNetworkConnectivity?.bluetooth}</div>

                                    </div>}


                                </>}

                                {/* Audio & Camera */}
                                {data?.productAudioCamera && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Audio & Camera</div>
                                    </div>
                                    {data?.productAudioCamera?.audioProperties && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Audio Properties</div>
                                        <div className="flex justify-center flex-grow">{data?.productAudioCamera?.audioProperties}</div>
                                    </div>}
                                    {data?.productAudioCamera?.speaker && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Speaker</div>
                                        <div className="flex justify-center flex-grow">{data?.productAudioCamera?.speaker}</div>
                                    </div>}
                                    {data?.productAudioCamera?.microphone && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Microphone</div>
                                        <div className="flex justify-center flex-grow">{data?.productAudioCamera?.microphone}</div>

                                    </div>}

                                    {data?.productAudioCamera?.webCam && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">WebCam</div>
                                        <div className="flex justify-center flex-grow">{data?.productAudioCamera?.webCam}</div>

                                    </div>}
                                </>}

                                {/* Keyboard */}
                                {data?.productKeyboard && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Keyboard</div>
                                    </div>
                                    {data?.productKeyboard?.keyboardLayout && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Keyboard Layout</div>
                                        <div className="flex justify-center flex-grow">{data?.productKeyboard?.keyboardLayout}</div>
                                    </div>}
                                    {data?.productKeyboard?.keyboardBacklit && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Keyboard Back-lit</div>
                                        <div className="flex justify-center flex-grow">{data?.productKeyboard?.keyboardBacklit}</div>
                                    </div>}
                                    {data?.productKeyboard?.rgbKeyboard && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">RGB Keyboard</div>
                                        <div className="flex justify-center flex-grow">{data?.productKeyboard?.rgbKeyboard}</div>

                                    </div>}

                                    {data?.productKeyboard?.numKeypad && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Num Key pad</div>
                                        <div className="flex justify-center flex-grow">{data?.productKeyboard?.numKeypad}</div>

                                    </div>}
                                    {data?.productKeyboard?.pointingDevice && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Pointing Device</div>
                                        <div className="flex justify-center flex-grow">{data?.productKeyboard?.pointingDevice}</div>

                                    </div>}

                                    {data?.productKeyboard?.dedicatedNavigationKey && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Dedicated Navigation key</div>
                                        <div className="flex justify-center flex-grow">{data?.productKeyboard?.dedicatedNavigationKey}</div>

                                    </div>}
                                </>}

                                {/* Security */}
                                {data?.productSecurity && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Security</div>
                                    </div>
                                    {data?.productSecurity?.fingerPrintSensor && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Finger Print Sensor</div>
                                        <div className="flex justify-center flex-grow">{data?.productSecurity?.fingerPrintSensor}</div>
                                    </div>}
                                    {data?.productSecurity?.faceDetection && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Face Detection</div>
                                        <div className="flex justify-center flex-grow">{data?.productSecurity?.faceDetection}</div>
                                    </div>}
                                    {data?.productSecurity?.securityChip && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Security Chip</div>
                                        <div className="flex justify-center flex-grow">{data?.productSecurity?.securityChip}</div>

                                    </div>}
                                </>}

                                {/* Software */}
                                {data?.productSoftware && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Software</div>
                                    </div>
                                    {data?.productSoftware?.operatingSystem && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Operating System</div>
                                        <div className="flex justify-center flex-grow">{data?.productSoftware?.operatingSystem}</div>
                                    </div>}
                                    {data?.productSoftware?.preLoadedApplication && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Pre-loaded Application</div>
                                        <div className="flex justify-center flex-grow">{data?.productSoftware?.preLoadedApplication}</div>
                                    </div>}
                                    {data?.productSoftware?.licensedApplication && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Licensed Application</div>
                                        <div className="flex justify-center flex-grow">{data?.productSoftware?.licensedApplication}</div>

                                    </div>}
                                </>}

                                {/* Physical Description */}
                                {data?.productPhysicalDescription && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Physical Description</div>
                                    </div>
                                    {data?.productPhysicalDescription?.bodyMaterial && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Body Material</div>
                                        <div className="flex justify-center flex-grow">{data?.productPhysicalDescription?.bodyMaterial}</div>
                                    </div>}
                                    {data?.productPhysicalDescription?.deviceLighting && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Device Lighting</div>
                                        <div className="flex justify-center flex-grow">{data?.productPhysicalDescription?.deviceLighting}</div>
                                    </div>}
                                    {data?.productPhysicalDescription?.color && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Color</div>
                                        <div className="flex justify-center flex-grow">{data?.productPhysicalDescription?.color}</div>

                                    </div>}
                                    {data?.productPhysicalDescription?.dimensions && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Dimensions</div>
                                        <div className="flex justify-center flex-grow">{data?.productPhysicalDescription?.dimensions}</div>
                                    </div>}
                                    {data?.productPhysicalDescription?.weightKg && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Weight (Kg)</div>
                                        <div className="flex justify-center flex-grow">{data?.productPhysicalDescription?.weightKg}</div>
                                    </div>}
                                    {data?.productPhysicalDescription?.packageContent && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Package Content</div>
                                        <div className="flex justify-center flex-grow">{data?.productPhysicalDescription?.packageContent}</div>

                                    </div>}
                                </>}

                                {/* Power */}
                                {data?.productPower && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Power</div>
                                    </div>
                                    {data?.productPower?.batteryCapacity && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Battery Capacity</div>
                                        <div className="flex justify-center flex-grow">{data?.productPower?.batteryCapacity}</div>
                                    </div>}
                                    {data?.productPower?.batteryType && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Battery Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productPower?.batteryType}</div>
                                    </div>}
                                    {data?.productPower?.backupTime && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Backup Time</div>
                                        <div className="flex justify-center flex-grow">{data?.productPower?.backupTime}</div>

                                    </div>}
                                    {data?.productPower?.powerAdapter && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Power Adapter</div>
                                        <div className="flex justify-center flex-grow">{data?.productPower?.powerAdapter}</div>
                                    </div>}
                                    {data?.productPower?.adapterType && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Adapter Type</div>
                                        <div className="flex justify-center flex-grow">{data?.productPower?.adapterType}</div>
                                    </div>}

                                </>}

                                {/* Warranty */}
                                {data?.productWarranty && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Warranty</div>
                                    </div>
                                    {data?.productWarranty?.warranty && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Warranty</div>
                                        <div className="flex justify-center flex-grow">{data?.productWarranty?.warranty}</div>
                                    </div>}
                                    {data?.productWarranty?.warrantyDetails && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Warranty Details</div>
                                        <div className="flex justify-center flex-grow">{data?.productWarranty?.warrantyDetails}</div>
                                    </div>}
                                    {data?.productWarranty?.warrantyClaimDurationApproximate && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Warranty Claim Duration (Approximate)</div>
                                        <div className="flex justify-center flex-grow">{data?.productWarranty?.warrantyClaimDurationApproximate}</div>

                                    </div>}
                                </>}


                                {/* Additional Info */}
                                {data?.productAdditionalInfo && <>
                                    <div className="flex items-center h-12 px-4 bg-gray-100 border-b border-gray-500">
                                        <div className="font-bold text-xl">Additional Info</div>
                                    </div>
                                    {data?.productAdditionalInfo?.certifications && <div className="flex items-center h-12 px-4 border-b border-gray-500">
                                        <div className="w-40">Certifications</div>
                                        <div className="flex justify-center flex-grow">{data?.productAdditionalInfo?.certifications}</div>
                                    </div>}
                                    {data?.productAdditionalInfo?.bestFor && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Best For</div>
                                        <div className="flex justify-center flex-grow">{data?.productAdditionalInfo?.bestFor}</div>
                                    </div>}
                                    {data?.productAdditionalInfo?.gamingFeature && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Gaming Feature</div>
                                        <div className="flex justify-center flex-grow">{data?.productAdditionalInfo?.gamingFeature}</div>

                                    </div>}
                                    {data?.productAdditionalInfo?.specialty && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Specialty</div>
                                        <div className="flex justify-center flex-grow">{data?.productAdditionalInfo?.specialty}</div>
                                    </div>}
                                    {data?.productAdditionalInfo?.others && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Others</div>
                                        <div className="flex justify-center flex-grow">{data?.productAdditionalInfo?.others}</div>

                                    </div>}
                                    {data?.productAdditionalInfo?.countryOfOrigin && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Country Of Origin</div>
                                        <div className="flex justify-center flex-grow">{data?.productAdditionalInfo?.countryOfOrigin}</div>
                                    </div>}
                                    {data?.productAdditionalInfo?.madeInAssemble && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Made in/ Assemble</div>
                                        <div className="flex justify-center flex-grow">{data?.productAdditionalInfo?.madeInAssemble}</div>

                                    </div>}
                                    {data?.productAdditionalInfo?.disclaimer && <div className="flex items-center h-full p-4 border-b border-gray-500">
                                        <div className="w-40">Disclaimer</div>
                                        <div className="flex justify-center flex-grow">{data?.productAdditionalInfo?.disclaimer}</div>
                                    </div>}
                                </>}

                            </div>

                        </body>
                        <div className="w-full h-full bg-indigo-100 p-8 ">
                            <h2 className="text-4xl font-bold mb-4 text-center">Reviews</h2>

                            {
                                data?.productReviews.map(r => <SingleReview key={r?.email} r={r}></SingleReview>)
                            }
                        </div>

                        {
                            (user && arr.length > 0) && <div className="w-full h-full bg-indigo-100 p-8 items-center flex flex-col justify-center ">
                                <h2 className="text-4xl font-bold mb-4">Post review and rating</h2>
                                <form onSubmit={handleEditReview} className="w-1/2 bg-base-100 p-5 rounded-lg shadow-lg">
                                    <div className="mb-4">
                                        <label className="block mb-1">Rating</label>
                                        <div className="flex items-center space-x-2">
                                            <Rating
                                                style={{ maxWidth: 180 }}
                                                value={rating}
                                                onChange={setRating}
                                                isRequired
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="block mb-1">Review</label>
                                        <textarea onChange={(e) => setReview(e.target.value)} id="message" className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
                                    </div>
                                    <button type="submit" className="py-2 px-4 bg-indigo-400 text-white rounded hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400">Submit</button>

                                </form>
                            </div>
                        }
                        <div className="h-full w-full text-center bg-indigo-100">
                            <h2 className="text-4xl font-bold mb-4">Related Laptops</h2>
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 bg-indigo-100 p-4  ">

                                {

                                    relateds?.map(r => <SingleRelated key={r?._id} r={r}></SingleRelated>)
                                }
                            </div>
                        </div>

                    </>
            }
        </>
    );
};

export default ViewLaptop;