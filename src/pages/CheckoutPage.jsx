import {NavBar} from "../components/NavBar.jsx";
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import {deleteItem, getCartData, getTotal} from "../services/CartService.js";
import AxiosClient from "../services/api/AxiosClient.js";
import {useNavigate} from "react-router-dom";
import ProductExampleImg from "/placeholders/product_example.jpg";

export default function CheckoutPage(){
    const {register,handleSubmit} = useForm();
    const [carts,setCart]=useState([]);
    const [total,setTotal]=useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        let data=getCartData();
        let totalData=getTotal();
        setTotal(totalData);
        setCart(data);
    },[]);
    const onSubmit=async (data) => {
        let orderData = {customer: data, cart: carts};
        //console.log(orderData);
        const request = await AxiosClient.post("/order", orderData);
        if(request.status === 200){
            setCart([]);
            localStorage.removeItem("CART_DATA");
            //console.log(request.data.data.id);
            navigate(`/orderdone/${request.data.data.id?request.data.data.id:"x"}`);
        }
        //console.log(JSON.stringify(request));
    }
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    function removeItem(id){
        deleteItem(id);
        let newData=carts.filter(item => item.product_id !== Number(id));
        let total=0;
        newData.forEach(item=>{
            total+=item.product_price*item.quantity;
        });
        setTotal(total);
        setCart(carts.filter(item => item.product_id !== Number(id)));

    }
    return (
        <>
            <NavBar/>
            <main className="flex h-screen">
                <div className="flex-1 pl-28 pt-10 pr-20">
                    <h2 className="font-semibold text-3xl mb-6">Thông tin đặt hàng: </h2>
                    <form className="text-2xl" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                            <label>Họ và tên: </label>
                            <input {...register("name", {required: true})} type="text"/>
                        </div>
                        <div className="flex flex-col">
                            <label>Email: </label>
                            <input {...register("email", {required: true})} type="text"/>
                        </div>
                        <div className="flex flex-col">
                            <label>Số điện thoại: </label>
                            <input {...register("phone_number", {required: true})} type="text"/>
                        </div>
                        <div className="flex flex-col">
                            <label>Địa chỉ: </label>
                            <input {...register("address", {required: true})} type="text"/>
                        </div>
                        <div className="mt-5 text-2xl mb-4">
                            <h2>Số tiền thanh toán:</h2>
                            <p className="font-bold">{formatNumber(total)} đ</p>
                        </div>
                        <button
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-3xl px-5 py-2.5 me-2 mb-">
                            Xác nhận
                        </button>
                    </form>


                </div>
                <div className="bg-white flex-1 flex justify-center pt-10">
                    <div className="bg-white w-[80%]">
                        {
                            carts.map((item)=> (
                                /*<CheckoutCard key={item.product_id} name={item.product_name} quantity={item.quantity} price={item.product_price} id={item.product_id} imageUrl={item.image}/>*/
                                <div className="flex" key={item.product_id}>
                                    <div className="w-[160px] h-[270px] rounded-lg overflow-hidden">
                                        <img src={item.image?item.image:ProductExampleImg}
                                             className="w-full h-auto block"/>
                                    </div>
                                    <div className="flex flex-col flex-1 ml-2">
                                        <div>
                                            <p className="text-2xl">{item.product_name?item.product_name: "Tên sản phẩm"}</p>
                                            <p className="text-xl">Giá: {formatNumber(item.product_price)} đ</p>
                                            <p className="text-xl">Số lượng: {item.quantity}</p>
                                            <button
                                                onClick={()=>removeItem(item.product_id)}
                                                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Xoá
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
        </>
    )
}