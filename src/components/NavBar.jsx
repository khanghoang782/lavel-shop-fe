import {Link} from "react-router-dom";
import LoginIcon from '/icons/user_icon.png'
import CartIcon from '/icons/cart_icon.png'
import {useAuth} from "../utils/AuthContext.jsx";

export function NavBar(){
    const {auth}=useAuth();
    const menuList=[
        {title: "Trang chủ", link: "/",id:0},
        {title: "Áo", link: "/catalog/1",id:1},
        {title: "Quần", link: "/catalog/2",id:2},
        {title: "Phụ Kiện", link: "/catalog/4",id:4}
    ];
    return (
        <nav className="flex bg-white justify-between items-center px-20 h-fit">
            <div><h2 className="font-bold text-2xl">Lavel shop</h2></div>
            <div className="text-2xl w-[600px] h-fit flex justify-center items-center">
                {menuList.map((item) => (
                    <Link state={{id:item.id}} to={item.link} key={item.title} className="hover:bg-gray-100 py-2 px-3">{item.title}</Link>
                ))}
            </div>
            <div className="flex w-fit gap-5">
                <Link to={"/login"} className="flex items-center gap-2"><p className="font-semibold">{auth ? auth.name : "Đăng nhập"}</p><img src={LoginIcon} alt="logo" className="h-[36px]"/></Link>
                <Link to={"/checkout"}><img src={CartIcon} alt="logo" className="h-[36px]"/></Link>
            </div>
        </nav>
    )
}