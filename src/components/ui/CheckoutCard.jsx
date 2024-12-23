import ProductExampleImg from "/placeholders/product_example.jpg";
import {deleteItem} from "../../services/CartService.js";

export function CheckoutCard({id, name, price, quantity}) {
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <div className="flex">
            <div className="w-[160px] h-[270px] rounded-lg overflow-hidden">
                <img src={ProductExampleImg} className="w-full h-auto block"/>
            </div>
            <div className="flex flex-col flex-1 ml-2">
                <div>
                    <p className="text-2xl">{name?name:"Tên sản phẩm"}</p>
                    <p className="text-xl">Giá: {formatNumber(price)} đ</p>
                    <p className="text-xl">Số lượng: {quantity}</p>
                    <button
                        onClick={()=>deleteItem(id)}
                        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Xoá</button>
                </div>
            </div>
        </div>
    )
}