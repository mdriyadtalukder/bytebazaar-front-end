import { MdDelete } from "react-icons/md";
import { useDeleteCartMutation, useEditCartMutation, useGetAllProductQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SingleCart = ({ d }) => {
    const [deleteCart] = useDeleteCartMutation();
    const [editCart] = useEditCartMutation();
    const { data: laptops } = useGetAllProductQuery();
    const cart = laptops?.find(c => c?._id === d?.cartId);
    const handleIncreaseQuantity = (e) => {
        e.preventDefault();
        editCart({
            id: d?._id,
            data: {
                quantity: Number(d?.quantity) + 1
            }
        })

    }
console.log(d)
    const handleDecreaseQuantity = (e) => {
        e.preventDefault();
        editCart({
            id: d?._id,
            data: {
                quantity: Number(d?.quantity) - 1
            }
        })

    }

    const handleDeleteCart = (e) => {
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
                deleteCart(d?._id);
                Swal.fire({
                    title: "Deleted!",
                    text: `The item has been deleted.`,
                    icon: "success"
                });
            }
        });
    }

    return (
        <tr className="border-b-2 border-teal-400">
            <td className="py-4">
                <div className="flex items-center">
                    <img className="h-16 w-16 mr-4" src={d?.productImage} alt="Product image" />
                    <Link to={`/dashboard/laptop/${d?.cartId}`}> <span className="hidden sm:block truncate-2-lines  font-semibold">{d?.productName}</span></Link>
                </div>
                <Link to={`/dashboard/laptop/${d?.cartId}`}><span className=" lg:hidden md:hidden  font-semibold">{d?.productName}</span></Link>

            </td>
            <td className="py-4"><span className="font-bold text-2xl">৳</span>{d?.productPrice}</td>
            <td className="py-4 ">
                <div className="lg:flex justify-center items-center md:flex text-center me-2 ms-2">
                    <button onClick={handleDecreaseQuantity} disabled={d?.quantity <= 1} className="border rounded-md py-2 px-4 mr-2 text-base-100 font-bold  bg-red-500">-</button>
                    <span className="text-center w-8">{d?.quantity}</span>
                    <button onClick={handleIncreaseQuantity} disabled={cart?.productQuantity <= d?.quantity} className="border rounded-md py-2 px-4 ml-2 text-base-100 font-bold  bg-green-500">+</button>
                </div>
            </td>
            <td className="py-4"><span className="font-bold text-2xl">৳</span>{Number(d?.productPrice) * Number(d?.quantity)}</td>
            <td onClick={handleDeleteCart} className="cursor-pointer ps-4"><MdDelete className="text-red-600 lg:text-3xl md:text-2xl" /></td>
        </tr>
    );
};

export default SingleCart;