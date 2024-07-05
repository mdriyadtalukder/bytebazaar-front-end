import { useContext } from "react";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useGetPurchaseCoinRecordQuery } from "../../../RTK-Query/features/allProduct/allProductApi";
import Loading from "../../loading/Loading";

const Purchased = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetPurchaseCoinRecordQuery(user?.email);
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
                                <th>Product Name</th>
                                <th>Coins</th>
                                <th>Date</th>
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

export default Purchased;