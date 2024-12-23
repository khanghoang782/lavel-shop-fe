import {NavBar} from "../components/NavBar.jsx";
import {useParams} from "react-router-dom";

export default function OrderInfo(){
    const orderId = useParams().orderid;
    return(
        <>
            <NavBar/>
            <div className="w-screen flex flex-col items-center">
                <h2 className="text-5xl mt-20 text-green-500">Đặt hàng thành công</h2>
                <p className="text-3xl my-11">Mã đơn hàng của bạn là: #{orderId}</p>
            </div>

        </>
    )
}