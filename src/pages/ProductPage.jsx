import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../services/api/AxiosClient.js";
import {NavBar} from "../components/NavBar.jsx";
import defaultProductImg from "/defaultProductImg.png"

export function ProductPage() {
    const productId = useParams().id;
    const [product, setProduct] = useState({});
    useEffect(() => {
        getProduct();
    },[])
    const getProduct = async () => {

            const response = await axiosClient.get(`/products/${productId}`);
            //console.log(response);
            setProduct(response.data?.data);
    }

    return (
        <main>
            <NavBar/>
            <div className="flex flex-col items-center w-screen gap-28 mt-8">
                <div className="flex gap-8">
                    <div>
                        <img src={product.image?product.image:defaultProductImg} alt="product"
                             className="w-[400px] h-[340px] border-8"/>
                    </div>
                    <div>
                        <h2 className="text-3xl font-medium uppercase mb-2">{product.product_name}</h2>
                        <div className="space-y-2">
                            <p className="text-gray-800 font-semibold space-x-2">
                                <span>Availability: </span>
                                <span className="text-green-600">{product.stock}</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Doanh mục: </span>
                                <span className="text-gray-600">{product.catalog_name}</span>
                            </p>
                        </div>
                        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                            <p className="text-xl text-primary font-semibold">Price: {product.price} đ</p>
                            {/*<p className="text-base text-gray-400 line-through">$55.00</p>*/}
                        </div>


                        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Add to cart
                            </button>
                        </div>
                    </div>


                </div>
                <div className="w-[790px]">
                    <h2 className="text-4xl font-bold">Mô tả sản phẩm: </h2>
                    <p className="mt-2 text-gray-800">{product.description}</p>
                </div>
            </div>
        </main>
    )
}