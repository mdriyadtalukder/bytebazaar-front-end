import Swal from "sweetalert2";
import { useDeleteUserMutation, useGetUsersQuery, useMakeAdminMutation, useMakeSellerMutation } from "../../../RTK-Query/features/users/usersApi";
import Loading from "../../loading/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";


const Users = () => {
    // const { deletedUser } = useContext(AuthContext);

    const { data, isLoading, isError, error } = useGetUsersQuery();
    // const [deleteUser] = useDeleteUserMutation();
    const [makeAdmin] = useMakeAdminMutation();
    const [makeSeller] = useMakeSellerMutation();

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                makeAdmin(user?._id)
                Swal.fire({
                    title: `${user?.name} make admin succesfully!`,
                    text: "make admin.",
                    icon: "success"
                });

            }
        });

    }

    const hanldeMakeSeller = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make seller!"
        }).then((result) => {
            if (result.isConfirmed) {
                makeSeller(user?._id)
                Swal.fire({
                    title: `${user?.name} make seller succesfully!`,
                    text: "make seller.",
                    icon: "success"
                });

            }
        });

    }

    // const handleDeleteUser = user => {

    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, user delete!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             deletedUser()
    //                 .then(() => {
    //                     deleteUser(user?._id);
    //                     Swal.fire({
    //                         title: `${user?.name} make admin succesfully!`,
    //                         text: "user deleted.",
    //                         icon: "success"
    //                     });
    //                 })
    //                 .catch(err => console.log(err))


    //         }
    //     });

    // }

    let content;
    let count = 1;
    if (!isLoading && isError) content = <p className='text-red-600 font-bold text-center'>{error?.status}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p className='text-teal-400 font-bold  text-center'>No User found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data?.map(d => <tr key={d?._id}>
            <th>{count++}</th>
            <td>{d?.name}</td>
            <td>{d?.email}</td>
            <td>{d?.role === 'admin' ? "Admin" : d?.role === 'seller' ? 'Seller' : <>
                <button onClick={() => handleMakeAdmin(d)} className="bg-indigo-400 hover:bg-indigo-400 text-white font-bold p-1 rounded">Make admin</button>
                <button onClick={() => hanldeMakeSeller(d)} className="bg-teal-400 hover:bg-teal-400 text-white font-bold p-1 rounded ms-2">Make Seller</button>
            </>}</td>
            {/* <td>{d?.role === 'admin' ? '' : <button onClick={() => handleDeleteUser(d)} className="bg-red-500 hover:bg-red-500 text-white font-bold p-1 rounded">Delete User</button>}</td> */}
        </tr>)

    }

    return (
        <>
            {
                isLoading ? <Loading></Loading> :
                    <div className="overflow-x-auto w-full p-4 ">
                        <table className="table rounded-lg shadow-lg">
                            {/* head */}
                            <thead className="bg-teal-100">
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-base-100">
                                {content}
                            </tbody>
                        </table>
                    </div>
            }
        </>
    );
};

export default Users;