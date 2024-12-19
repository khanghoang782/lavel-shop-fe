import {NavBar} from "../components/NavBar.jsx";
import {CatalogSideBar} from "../components/CatalogSideBar.jsx";
import {ProductCard} from "../components/ui/ProductCard.jsx";
import {useEffect, useState} from "react";

import {getProductByCatalogId} from "../services/ProductService.js";

export function CatalogPage() {
    const [productList, setProductList] = useState([]);
    const [showSort, setShowSort] = useState(false);
    useEffect(() => {
        initProductDisplay(1);
    },[])
    const initProductDisplay=async (id)=>{

        const result=await getProductByCatalogId(id);
        const productList=result?.data?.[0]?.data ?? []
        setProductList(productList);

    }

    return (
        <>
            <NavBar/>
            <main className="w-full flex justify-center mt-10">
                <CatalogSideBar/>
                <section className="bg-white w-[1144px]">
                    <div className="w-full flex justify-end pr-10 my-5 text-xl gap-2 items-center">
                        <p>Xắp xếp theo</p>
                        <div className="relative">
                            <button
                                onClick={() => setShowSort(!showSort)}
                                className="w-[150px] py-2.5 px-5 text-sm text-left font-medium text-gray-900 bg-gray-100 rounded-full border border-gray-200">
                                Mặc định
                            </button>
                            <div
                                className={showSort ? 'bg-white p-4 mt-1 border border-gray-200 rounded-2xl absolute' : 'bg-white p-4 mt-1 border border-gray-200 rounded-2xl absolute hidden'}>
                                <ul className="text-xl">
                                    <li>Giá tăng dần</li>
                                    <li>Giá giảm dần</li>
                                    <li>Mới nhất</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-[1144px] bg-white px-5">
                        <div className="grid grid-cols-4">
                            {productList.map((item) => (
                                <ProductCard key={item.id} name={item.product_name} price={item.price} id={item.id}/>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}