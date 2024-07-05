import Swal from "sweetalert2";
import { useDeletePurchaseCoinsRecordsMutation, useEditPurchaseCoinsRecordsMutation, useGetPurchaseCoinsRecordsQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../loading/Loading";

const AllPurchase = () => {
    const { data, isLoading, isError, error } = useGetPurchaseCoinsRecordsQuery();
    const [deletePurchaseCoinsRecords] = useDeletePurchaseCoinsRecordsMutation();
    const [editPurchaseCoinsRecords] = useEditPurchaseCoinsRecordsMutation();

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
                deletePurchaseCoinsRecords(id);
                Swal.fire({
                    title: "Accepted!",
                    text: `The order has been deleted.`,
                    icon: "success"
                });
            }
        });
    }

    const handleStatus = (id) => {

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
                editPurchaseCoinsRecords({
                    id: id,
                    data: {
                        status: 'Accepted'
                    }
                });
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
                <td>{d?.coins}</td>
                <td>{d?.date}</td>
                <td>{d?.status === 'Pending' ? <button onClick={() => handleStatus(d?._id)} className='bg-gray-200 p-1 rounded-lg font-bold text-red-500' >{d?.status}</button>
                    : <button className='bg-gray-200 p-1 rounded-lg font-bold text-green-500' >{d?.status}</button>
                }</td>                <td> <button onClick={() => handledeleting(d?._id)} className='bg-red-500 p-1 rounded-lg font-bold text-white' >Delete</button></td>

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
                                <th>Product Name</th>
                                <th>Coins</th>
                                <th>Date</th>
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

export default AllPurchase;