import {useEffect, useState} from "react";
import {getCatalogList} from "../services/ProductService.js";

export function CatalogSideBar() {
    const [catalogs,setCatalogs] = useState([]);
    useEffect(() => {
       fetchCatalogs();
    },[])
    const fetchCatalogs = async () => {
        const result=await getCatalogList();
        setCatalogs(result.data);
    }

    return (
        <aside className="bg-white w-[240px] h-screen pl-5 pt-10">
            <h2 className="text-2xl font-semibold">Doanh mục</h2>
            <ul className="text-xl text-gray-700 pl-2">
                {catalogs.map((item) => (
                    <li key={item.id}>{item.catalog_name}</li>
                ))}
            </ul>
        </aside>
    )
}