import { useContext } from "react";
import { useGetPaymentsQuery } from "../../../RTK-Query/features/payment/paymentApi";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import Loading from "../../loading/Loading";
import { Link } from "react-router-dom";

const Order = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetPaymentsQuery(user?.email);
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
                <td> {d?.menuItemIds?.map(i => <p key={i} className="text-teal-400 font-bold"><Link to={`/dashboard/laptop/${i}`} key={i}>{i}</Link></p>)}</td>
                <td><p className={`${d?.status === 'Pending' ? 'text-red-500' : 'text-green-500'} font-bold `} >{d?.status}</p></td>
               
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

export default Order;