import {Link, Outlet} from "react-router-dom";
import {NavBar} from "../components/NavBar.jsx";
import banner from "../../public/banner.png"

export function HomePage() {
    return (
        <>
            <NavBar/>
            <div className="flex flex-col items-center">


                <div className="flex justify-center">
                    <img src={banner} alt="banner" className="w-[70%]"/>
                </div>
            </div>
        </>
    )
}