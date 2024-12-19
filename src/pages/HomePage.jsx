import {NavBar} from "../components/NavBar.jsx";
import Banner from "/banners/banner1.png"
import {ProductDisplay} from "../components/ProductDisplay.jsx";


export function HomePage() {


    return (
        <>
            <NavBar/>
            <main className="flex flex-col items-center">
                <div className="w-screen flex justify-center">
                    <img src={Banner} className="w-[1440px] h-[580]"/>
                </div>
                <ProductDisplay/>
            </main>
        </>
    )
}