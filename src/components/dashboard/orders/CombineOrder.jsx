import { useContext } from "react";
import AllOrders from "./AllOrders";
import OrderList from "./OrderList";
import { AuthContext } from "../../../authentication/authProvider/AuthProvider";
import { useGetUserQuery } from "../../../RTK-Query/features/users/usersApi";
import Loading from "../../loading/Loading";

const CombineOrder = () => {
    const { user } = useContext(AuthContext);

    const { data, isLoading } = useGetUserQuery(user?.email);

    return (
        <>
            {
                isLoading ? <Loading></Loading> : <>{data?.length > 0 && data[0].role === 'admin' && (<AllOrders></AllOrders>)}
                    {data?.length > 0 && data[0].role === 'seller' && (<OrderList></OrderList>)} </>
            }

        </>
    );
};

export default CombineOrder;