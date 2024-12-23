import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {NavBar} from "../components/NavBar.jsx";
import ProductExampleImg from "/placeholders/product_example.jpg";
import {getOneProductById} from "../services/ProductService.js";
import {saveItem} from "../services/CartService.js";


export function ProductPage() {
    const productId = useParams().id;
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        getProduct();
    },[])
    const getProduct = async () => {

        const result = await getOneProductById(productId);
        setProduct(result);
    }
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <>
            <NavBar/>
            <main className="flex flex-col items-center">
                <div className="flex justify-center gap-10 pr-32 my-10 bg-white w-fit p-4 rounded">
                    <div className="w-[420px] h-[540px] bg-white rounded-lg overflow-hidden border-4 border-gray-200">
                        <img src={product.immage?product.immage:ProductExampleImg} className="w-full h-auto block"/>
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-5xl font-semibold">{product.product_name}</h1>
                        <h2 className="text-4xl mt-20">{formatNumber(product.price)} đ</h2>
                        <div className="flex gap-28 mb-5">
                            <div className="relative flex items-center max-w-[8rem]">
                                <button
                                    onClick={()=>setQuantity(quantity - 1)}
                                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 text-2xl font-bold"
                                >-
                                </button>
                                <p className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 block w-full py-2.5 text-3xl px-4">{quantity}</p>
                                <button
                                    onClick={()=>setQuantity(quantity + 1)}
                                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 text-2xl font-bold"
                                >+
                                </button>
                            </div>
                            <button
                                onClick={()=>saveItem(product,quantity)}
                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-xl px-5 py-2.5 text-center me-2 mb-2">Thêm
                                vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <p className="w-[1060px] text-xl bg-white p-6 rounded-lg">
                        {product.description}
                    </p>
                </div>
            </main>
        </>
    )
}