import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import Loading from "../../components/loading/Loading";
import { useGetUserQuery } from "../../RTK-Query/features/users/usersApi";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { error } = useGetUserQuery(user?.email)

    const location = useLocation();
    if (loading && !error?.status) {
        return <Loading></Loading>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>

};

export default PrivateRouter;