import {useParams} from "react-router-dom";

export function ProductPage() {
    const productId=useParams().id;
    return (
        <div className="">
            <h1>Product Page id:{productId}</h1>
        </div>
    )
}