import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../authProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const { updatepassword } = useContext(AuthContext);
    const navigate = useNavigate('');
    const handlePassword = (e) => {
        e.preventDefault();
        const form = e.target;
        const newPassword = form.password?.value;
        const currentPassword = form.password2?.value;

        if (newPassword === currentPassword) {
            updatepassword(newPassword)
                .then((result) => {
                    Swal.fire({
                        position: "top-start",
                        icon: "success",
                        title: "Successfully updated user password!!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/user-profile');
                })
                .catch((err) => {

                });
        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `New password and current Password are not same.try again!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div className="bg-indigo-100 dark:bg-gray-900 w-full">
            <div className="w-full max-w-3xl mx-auto p-8">
                <form onSubmit={handlePassword} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">

                    <div className="mb-6">


                        <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-white mb-1">New password</label>
                            <input name='password' type="password" id="name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-white mb-1">Confirm password</label>
                            <input name='password2' type="password" id="name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" />
                        </div>



                    </div>

                    <button type="submit" className="bg-indigo-400 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Change password</button>

                </form>


            </div>

        </div >
    );
};

export default UpdatePassword;