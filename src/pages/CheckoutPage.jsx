import {NavBar} from "../components/NavBar.jsx";
import { useForm } from "react-hook-form";
import {CheckoutCard} from "../components/ui/CheckoutCard.jsx";
import {useEffect, useState} from "react";
import {getCartData,getTotal} from "../services/CartService.js";

export default function CheckoutPage(){
    const {register,handleSubmit} = useForm();
    const [carts,setCart]=useState([]);
    const [total,setTotal]=useState(0);
    useEffect(()=>{
        let data=getCartData();
        //console.log(data);
        let totalData=getTotal();
        setTotal(totalData);
        setCart(data);
    },[]);


    return (
        <>
            <NavBar/>
            <main className="flex h-screen">
                <div className="flex-1 pl-28 pt-10 pr-20">
                    <h2 className="font-semibold text-3xl mb-6">Thông tin đặt hàng: </h2>
                    <form className="text-2xl">
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
                    </form>

                    <div className="mt-5 text-2xl">
                        <h2>Số tiền thanh toán:</h2>
                        <p className="font-bold">{total} đ</p>
                    </div>
                    <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-3xl px-5 py-2.5 me-2 mb-">
                        Xác nhận
                    </button>
                </div>
                <div className="bg-blue-500 flex-1 flex justify-center pt-10">
                    <div className="bg-white w-[80%]">
                        {
                            carts.map((item)=>(
                                <CheckoutCard key={item.product_id} name={item.product_name} quantity={item.quantity} price={item.product_price} id={item.product_id}/>
                            ))
                        }
                    </div>
                </div>
            </main>
        </>
    )
}