import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {NavBar} from "../components/NavBar.jsx";
import ProductExampleImg from "/placeholders/product_example.jpg";
import {getOneProductById} from "../services/ProductService.js";
import {saveItem} from "../services/CartService.js";
import AxiosClient from "../services/api/AxiosClient.js";


export function ProductPage() {
    const productId = useParams().id;
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState("");
    const [attribute, setAttribute] = useState("");
    const [attributeList, setAttributeList] = useState([]);
    useEffect(() => {
        getProduct();
    },[])
    const getProduct = async () => {

        const result = await getOneProductById(productId);
        setProduct(result);
        setAttributeList(result.attribute);
        console.log(result);
        AxiosClient.get(`/product/${productId}/image`).then((response) => {
            const BASE_URL=import.meta.env.VITE_API_BASE;
            let url=BASE_URL+`/storage/images/${response.data.image_name}`;
            setImage(url);
        }).catch(() => {
            //console.log(error);
            setImage("");
        })
    }


    function saveProduct(product,quantity,image,attribute){
        saveItem(product,quantity,image,attribute);
        setQuantity(0);
    }
    function AttributeButton({value,selectedButton,setSelected}){
        return (
            <button
                className={selectedButton!=value?"text-3xl font-semibold border-[3px] px-1.5 mr-2":"text-3xl font-semibold border-[3px] px-1.5 border-blue-400 mr-2"}
                onClick={()=>setSelected(value)}>{value}</button>
        )
    }
    return (
        <>
            <NavBar/>
            <main className="flex flex-col items-center">
                <div className="my-10 flex w-fit justify-center gap-10 rounded bg-white p-4 pr-32">
                    <div className="overflow-hidden rounded-lg border-4 border-gray-200 bg-white w-[420px] h-[540px]">
                        <img src={image?image:ProductExampleImg} className="block h-auto w-full"/>
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-5xl font-semibold">{product.product_name}</h1>
                        <div>
                            <h3 className="text-3xl">Size: </h3>
                            <div>
                                {
                                    attributeList.map((item) => (
                                        <AttributeButton value={item.attribute_name} key={item.id} selectedButton={attribute} setSelected={setAttribute}/>
                                    ))
                                }
                            </div>
                        </div>
                        <h2 className="mt-20 text-4xl">{product.price} đ</h2>
                        <div className="mb-5 flex gap-28">
                            <div className="relative flex items-center max-w-[8rem]">
                                <button
                                    onClick={()=>setQuantity(quantity - 1)}
                                    className="h-11 border border-gray-300 bg-gray-100 p-3 text-2xl font-bold rounded-s-lg hover:bg-gray-200"
                                >-
                                </button>
                                <p className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 px-4 text-center text-3xl text-gray-900 py-2.5">{quantity}</p>
                                <button
                                    onClick={()=>setQuantity(quantity + 1)}
                                    className="h-11 border border-gray-300 bg-gray-100 p-3 text-2xl font-bold rounded-e-lg hover:bg-gray-200"
                                >+
                                </button>
                            </div>
                            <button
                                onClick={()=>saveProduct(product,quantity,image,attribute)}
                                className="mb-2 rounded-full bg-blue-700 px-5 text-center text-xl font-medium text-white py-2.5 me-2 hover:bg-blue-800">Thêm
                                vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <p className="rounded-lg bg-white p-6 text-xl w-[1060px]">
                        {product.description}
                    </p>
                </div>
            </main>
        </>
    )
}