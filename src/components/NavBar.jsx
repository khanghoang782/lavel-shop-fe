import {Link} from "react-router-dom";

export function NavBar(){
    return (
        <nav className="bg-blue-400 w-screen flex justify-around text-white items-center py-4">
            <div><h2 className="font-bold text-3xl">Lavel shop</h2></div>
            <div className="flex w-[20%] justify-evenly text-xl font-bold">
                <Link to={"/"}>Home</Link>
                <Link to={"/"}>Áo</Link>
                <Link to={"/"}>Quần</Link>
                <Link to={"/"}>Phụ kiện</Link>
            </div>
            <div>
                <Link to={"/login"} className="font-bold text-2xl">Login</Link>
            </div>
        </nav>
    )
}