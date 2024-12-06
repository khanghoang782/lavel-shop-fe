import {Outlet, Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../../utils/AuthContext.jsx";
import {SideBar} from "../../components/admin/SideBar.jsx";


const PrivateRoute = () => {
    const {auth}=useAuth();
    const location = useLocation();

    return auth?.role === "ADMIN" ? <main className="flex h-screen">
        <SideBar/>
        <div className="bg-gray-200 flex-1">
            <Outlet/>
        </div>
    </main> : <Navigate to='/login' replace state={{from: location}}/>;
}
export default PrivateRoute;