import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AxiosClient from "../../services/api/AxiosClient.js";
import ProductExampleImg from "/placeholders/product_example.jpg";

export function OrderActionPage(){
    const orderId=useParams().id;
    const [orderInfor,setOrderInfor]=useState({});
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        initData();
    },[])
    async function initData(){
        AxiosClient.get(`/order/${orderId}`).then((response)=>{
            //console.log(response);
            setCart(response.data.cart);
            setOrderInfor(response.data.order);
        }).catch((err)=>{
            console.log(err);
        })
    }
    function formatDate(dateTime) {
        const date = new Date(dateTime);


        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    async function updateOrderStatus(id,action){
        if(action===1){
            AxiosClient.put(`/admin/order/${id}?action=accept`).then((response)=>{
                //console.log(response);
                initData();
            }).catch((err)=>{
                console.log(err);
            })
        }
        if(action===2){
            AxiosClient.put(`/admin/order/${id}?action=cancel`).then((response)=>{
                //console.log(response);
                initData();
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    return (
        <div className="w-[1200px] h-full px-20 py-12 mx-autop bg-white">
            <table className="text-xl">
                <tbody>
                <tr>
                    <td className="">Order ID:</td>
                    <td>{orderInfor.id}</td>
                </tr>
                <tr>
                    <td className="pr-3">Created at:</td>
                    <td>{formatDate(orderInfor.created_at)}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>{orderInfor.status}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{orderInfor.email}</td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td>{orderInfor.name}</td>
                </tr>
                <tr>
                    <td>Phone:</td>
                    <td>{orderInfor.phone}</td>
                </tr>
                <tr>
                    <td>Address:</td>
                    <td>{orderInfor.address}</td>
                </tr>
                </tbody>
            </table>
            <div>
                <button type="button"
                        onClick={()=>updateOrderStatus(orderInfor.id,1)}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    CONFIRM
                </button>
                <button type="button"
                        onClick={()=>updateOrderStatus(orderInfor.id,2)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            CANCEL
                </button>
            </div>
            <div className="bg-white flex-1 flex justify-center pt-10">
                <div className="bg-white w-[80%] max-h-[520px] overflow-y-scroll mb-9">
                    {
                        cart.map((item) => (
                            <div className="flex" key={item.id}>
                                <div className="w-[160px] h-[270px] rounded-lg overflow-hidden">
                                    <img src={item.image ? item.image : ProductExampleImg}
                                         className="w-full h-auto block"/>
                                </div>
                                <div className="flex flex-col flex-1 ml-2">
                                    <div>
                                        <p className="text-2xl">ID: {item.id} - {item.product_name ? item.product_name : "Tên sản phẩm"}</p>
                                        <p className="text-xl">Giá: {formatNumber(item.price)} đ</p>
                                        <p className="text-xl">Số lượng: {item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}