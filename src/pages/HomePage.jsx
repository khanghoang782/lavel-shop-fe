
import {NavBar} from "../components/NavBar.jsx";
import banner from "/banner.png"
import {useAuth} from "../utils/AuthContext.jsx";
import defaultProductImg from "/defaultProductImg.png";
import {Link} from "react-router-dom";
import {ItemDisplayB} from "../components/ui/ItemDisplayB.jsx";
import {FeetureDisplay} from "../components/FeetureDisplay.jsx";

export function HomePage() {
    const {auth}=useAuth();

    return (
        <>
            <NavBar/>
            <div className="flex flex-col items-center">


                <div className="flex justify-center">
                    <img src={banner} alt="banner" className="w-[70%]"/>
                </div>
                <FeetureDisplay/>
            </div>
        </>
    )
}