import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpdateName = () => {
    const { updateName } = useContext(AuthContext);
    const navigate = useNavigate('');

    const chnageName = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name?.value;

        updateName(name)
            .then((result) => {
                Swal.fire({
                    position: "top-start",
                    icon: "success",
                    title: "Successfully updated user name!!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/user-profile');
            })
            .catch((err) => {

            });
    }
    return (
        <div className="bg-indigo-100 dark:bg-gray-900 w-full">
            <div className="w-full max-w-3xl mx-auto p-8">
                <form onSubmit={chnageName} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">

                    <div className="mb-6">


                        <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-white mb-1">Enter new name</label>
                            <input name='name' type="text" id="name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                        </div>



                    </div>

                    <button type="submit" className="bg-indigo-400 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Change name</button>

                </form>


            </div>

        </div >
    );
};

export default UpdateName;