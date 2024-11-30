import {useParams} from "react-router-dom";

export function ProductPage() {
    const productId=useParams().id;
    return (
        <>
            <h1>Product Page id:{productId}</h1>
        </>
    )
}