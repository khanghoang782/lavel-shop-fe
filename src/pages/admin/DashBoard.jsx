import {Outlet} from "react-router-dom";
import {SideBar} from "../../components/admin/SideBar.jsx";



export function Dashboard() {
    
    return (
        <main className="flex h-screen">
            <SideBar />
            <div className="bg-gray-200 flex-1">
                <Outlet/>
            </div>
        </main>
    )
}