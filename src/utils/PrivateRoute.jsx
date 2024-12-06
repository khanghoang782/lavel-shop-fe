import {Outlet, Navigate, useLocation} from "react-router-dom";
import {useAuth} from "./AuthContext.jsx";

const PrivateRoute = () => {
    const {auth}=useAuth();
    const location = useLocation();

    return auth?<Outlet/>:<Navigate to='/login' replace state={{from:location}}/>;
}
export default PrivateRoute;