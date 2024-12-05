import {Link} from "react-router-dom";

export function SideBar() {
    const menuList=[
        {to:"/admin",title:"Product Manager"},
        {to:"/admin/accounts",title:"Account Manager"},
        {to:"/admin/orders",title:"Order Manager"},
    ];

    return (
        <aside className="flex flex-col h-screen w-[16%] bg-[#3d68ff] gap-4">
            {/*Logo Header */}
            <div className="flex justify-center">
                <Link to="/admin">
                    <h2 className="text-4xl font-bold">Lavel panel</h2>
                </Link>
            </div>
            <nav className="flex flex-col gap-2 text-white font-semibold pt-3">
                {menuList.map((item) => (
                    <Link to={item.to} key={item.title} className="hover:bg-blue-400 py-2 pl-4">
                        <p className="">{item.title}</p>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}