import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateImage = () => {
    const { user, updateImage } = useContext(AuthContext);
    const navigate = useNavigate('');

    const handleImage = async (e) => {
        e.preventDefault();

        //---------in imgbb update image-------------------------
        const forms = new FormData(e.target); //ei vabeo data neye jai input field theke
        const image = forms.get('image');
        const data = new FormData();
        data.append('image', image)
        const res = await axios.post(image_hosting_api, data)
        //-----------------------------------------------------------
        const images = res?.data?.data?.display_url;
        updateImage(user?.displayName, images)
            .then((result) => {
                Swal.fire({
                    position: "top-start",
                    icon: "success",
                    title: "Successfully updated user profile picture!!",
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
                <form onSubmit={handleImage} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">

                    <div className="mb-6">


                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                Upload a file
                            </label>
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input type="file" name='image' onChange="loadFile(event)" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-indigo-400 hover:file:bg-violet-100" required />
                            </label>
                        </div>



                    </div>

                    <button type="submit" className="bg-indigo-400 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Change image</button>

                </form>


            </div>

        </div >
    );
};

export default UpdateImage;