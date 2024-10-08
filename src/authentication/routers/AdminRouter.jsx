import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import Loading from "../../components/loading/Loading";
import { useGetUserQuery } from "../../RTK-Query/features/users/usersApi";

const AdminRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { data, isLoading, error } = useGetUserQuery(user?.email)
    const location = useLocation();
    if (isLoading && !error?.status) {
        return <Loading></Loading>
    }

    if (user && data?.length > 0) {
        const userRole = data[0]?.role;
        if (userRole === 'admin' || userRole === 'seller') {
            return children;
        }
    }
    // return <Navigate to='/' state={{ from: location }} replace ></Navigate>

};


export default AdminRouter;