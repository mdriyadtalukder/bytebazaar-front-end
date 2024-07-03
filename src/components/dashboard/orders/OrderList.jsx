import { Link } from "react-router-dom";
import { useChangeStatusMutation, useDeletePaymentMutation, useGetAllPaymentQuery } from "../../../RTK-Query/features/payment/paymentApi";
import Loading from "../../loading/Loading";
import Swal from "sweetalert2";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useContext } from "react";
import { useGetUserQuery } from "../../../RTK-Query/features/users/usersApi";

const OrderList = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetAllPaymentQuery();
    const [changeStatus] = useChangeStatusMutation();
    const [deletePayment] = useDeletePaymentMutation();
    const { data: userRole, isLoading: userRoleLoading } = useGetUserQuery(user?.email);


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
    let price = 0;
    let seller = [];
    // data?.map(d => {
    //     d?.cartItems?.map((f) => {
    //         if (seller.includes(f?.sellerID)) {
    //             return true
    //         }
    //         else {
    //             seller.push(f?.sellerID)
    //         }
    //     })
    // })
    console.log(seller?.length)
    console.log(price)
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No User found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        if (userRole?.length > 0 && userRole[0]?.sellerID) {
            content = data?.filter(d => d?.cartItems?.some(f => f?.sellerID === userRole[0]?.sellerID))?.map(d =>
                <tr key={d?._id}>
                    <th>{count++}</th>
                    <td>{userRole[0]?.sellerID}</td>
                    <td>{d?.email}</td>
                    <td>{d?.name}</td>
                    <td>{d?.address}</td>
                    <td>{d?.city}</td>
                    <td>{d?.number}</td>
                    <td>{d?.transactionId}</td>

                    {
                        d?.method === 'Cash On Delivery' ? <td>
                            {
                                d?.cartItems?.map(i => {
                                    if (seller?.includes(i?.sellerID)) {
                                        return;
                                    }
                                    else {
                                        seller.push(i?.sellerID)
                                    }
                                })
                            }
                            {d?.cartItems?.filter(f => f?.sellerID === userRole[0]?.sellerID)?.reduce((acc, item) => {
                                return acc + (item?.productPrice || 0) + 50 / seller.length;

                            }, 0) || 0}
                        </td> : <td>
                            {
                                d?.cartItems?.map(i => {
                                    if (seller?.includes(i?.sellerID)) {
                                        return;
                                    }
                                    else {
                                        seller.push(i?.sellerID)
                                    }
                                })
                            }
                            {d?.cartItems?.filter(f => f?.sellerID === userRole[0]?.sellerID)?.reduce((acc, item) => {
                                return acc + (item?.productPrice || 0);

                            }, 0) || 0}
                        </td>
                    }
                    <td>{d?.date}</td>
                    <td>{d?.method}</td>
                    <td> {d?.cartItems?.filter(f => f?.sellerID === userRole[0]?.sellerID)?.map(i => {
                        seller = [];
                        return <p key={i?.cartId} className="text-teal-400 font-bold"><Link to={`/dashboard/laptop/${i?.cartId}`} key={i?.cartId}>{i?.cartId}</Link></p>
                    })}</td>
                    {/* <td> {d?.menuItemIds?.map(i => <p className="text-teal-400 font-bold" key={i}><Link to={`/dashboard/laptop/${i}`} key={i}>{i}</Link></p>)}</td> */}
                    <td>{d?.status === 'Pending' ? <button onClick={() => handleStatus(d?._id)} className='bg-gray-200 p-1 rounded-lg font-bold text-red-500' >{d?.status}</button>
                        : <button className='bg-gray-200 p-1 rounded-lg font-bold text-green-500' >{d?.status}</button>
                    }</td>
                    <td> <button onClick={() => handledeleting(d?._id)} className='bg-red-500 p-1 rounded-lg font-bold text-white' >Delete</button></td>

                </tr>)
        }
        else {
            content = '';
        }

    }

    return (
        <>
            {(isLoading || userRoleLoading) ? <Loading></Loading> :
                <div className="overflow-x-auto w-full h-full bg-indigo-100 p-2">
                    <table className="table table-xs bg-base-100 ">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>SID</th>
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