import ProductExampleImg from "/placeholders/product_example.jpg";
import {Link} from "react-router-dom";

export function ProductCard({img="",name="ProductName",price="999.999.999",id}) {
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
            <div className="m-2 h-fit w-fit">
                <div className="w-[260px] h-[370px] rounded-lg overflow-hidden">
                    <img src={img?img:ProductExampleImg} className="w-full h-auto block"/>
                </div>
                <Link to={"/product/"+id} className="text-xl my-1 ml-1">
                    {name}
                </Link>
                <p className="font-semibold text-xl ml-1">{formatNumber(price)} đ</p>
            </div>
    )
}