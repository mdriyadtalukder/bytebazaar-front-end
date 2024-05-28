import { Link } from "react-router-dom";
import { useChangeStatusMutation, useDeletePaymentMutation, useGetAllPaymentQuery } from "../../../RTK-Query/features/payment/paymentApi";
import Loading from "../../loading/Loading";
import Swal from "sweetalert2";

const OrderList = () => {
    const { data, isLoading, isError, error } = useGetAllPaymentQuery();
    const [changeStatus] = useChangeStatusMutation();
    const [deletePayment] = useDeletePaymentMutation();

    const handleStatus = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept!"
        }).then((result) => {
            if (result.isConfirmed) {
                changeStatus({
                    id: id,
                    data: {
                        status: 'Accepted'
                    }
                });
                Swal.fire({
                    title: "Accepted!",
                    text: `The order has been accepted.`,
                    icon: "success"
                });
            }
        });
    }

    const handledeleting = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                deletePayment(id);
                Swal.fire({
                    title: "Accepted!",
                    text: `The order has been deleted.`,
                    icon: "success"
                });
            }
        });
    }

    let content;
    let count = 1;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No User found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data?.map(d =>
            <tr key={d?._id}>
                <th>{count++}</th>
                <td>{d?.email}</td>
                <td>{d?.name}</td>
                <td>{d?.address}</td>
                <td>{d?.city}</td>
                <td>{d?.number}</td>
                <td>{d?.transactionId}</td>
                <td>{d?.price}</td>
                <td>{d?.date}</td>
                <td>{d?.method}</td>
                <td> {d?.menuItemIds?.map(i => <p className="text-teal-400 font-bold" key={i}><Link to={`/dashboard/laptop/${i}`} key={i}>{i}</Link></p>)}</td>
                <td>{d?.status === 'Pending' ? <button onClick={() => handleStatus(d?._id)} className='bg-gray-200 p-1 rounded-lg font-bold text-red-500' >{d?.status}</button>
                    : <button className='bg-gray-200 p-1 rounded-lg font-bold text-green-500' >{d?.status}</button>
                }</td>
                <td> <button onClick={() => handledeleting(d?._id)} className='bg-red-500 p-1 rounded-lg font-bold text-white' >Delete</button></td>

            </tr>)
    }

    return (
        <>
            {isLoading ? <Loading></Loading> :
                <div className="overflow-x-auto w-full h-full bg-indigo-100 p-2">
                    <table className="table table-xs bg-base-100 ">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Phone No.</th>
                                <th>Transaction ID</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Purchased Product IDs</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </div>}
        </>
    );
};

export default OrderList;