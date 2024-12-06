import {ProductTable} from "../../components/admin/ProductTables.jsx";
import {CreateProductForm} from "../../components/admin/CreateProductForm.jsx";
import {useState} from "react";


export function ProductManager() {
    const [createProduct, setCreateProduct] = useState(false);
    function toggleCreateProduct() {
        createProduct?setCreateProduct(false):setCreateProduct(true);
    }

    return (
            <div className="mx-auto flex h-screen w-full flex-col items-center bg-gray-100 overflow-y-auto">
                <h2>Product Manager Page </h2>
                <div className="h-[100px]"></div>

                <ProductTable handleAdd={toggleCreateProduct}/>
                <CreateProductForm/>

            </div>
    )
}