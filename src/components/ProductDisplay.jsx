import {ProductCard} from "./ui/ProductCard.jsx";
import {useEffect, useState} from "react";
import {getProductDisplay} from "../services/ProductService.js";


export function ProductDisplay() {
    const [menuChoice,setMenuChoice]=useState(1);
    const [productList,setProductList]=useState([]);
    useEffect(()=>{
       changeProductDisplay(1,'random');
    },[])

    const changeProductDisplay=async(pos,sort)=>{
        const result = await getProductDisplay(sort);
        setProductList(result.data);
        setMenuChoice(pos);

    }
    return (
        <div className="w-[1144px] bg-white px-5">
            <ul className="flex w-full justify-center gap-8 text-2xl font-semibold my-4">
                <li className={menuChoice===1?"":"text-gray-500"}>
                    <button onClick={()=>changeProductDisplay(1,'random')}>Dành cho bạn</button>
                </li>
                <li className={menuChoice===2?"":"text-gray-500"}>
                    <button onClick={()=>changeProductDisplay(2,'new')}>Sản phẩm mới</button>
                </li>
                <li className={menuChoice===3?"":"text-gray-500"}>
                    <button onClick={()=>changeProductDisplay(3,'4')}>Phụ kiện mới</button>
                </li>
            </ul>
            <div className="grid grid-cols-4 mb-9">
                {productList.map((item)=>(
                    <ProductCard key={item.id} name={item.product_name} price={item.price} img={item.image_url} id={item.id}/>
                ))}
            </div>
        </div>
    )
}