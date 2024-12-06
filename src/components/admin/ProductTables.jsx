import {useEffect, useState} from "react";
import AxiosClient from "../../services/api/AxiosClient.js";
import {Link} from "react-router-dom";

export function ProductTable() {
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState({current:1,last:1});

    useEffect(() => {
        getProductList();
    },[])

    const getProductList = async ()=>{

        setProductList([]);

        const response = await AxiosClient.get('/products');
        const products = response?.data?.[0]?.data ?? [];
        setPage({current:1,last:response?.data?.[0]?.last_page??1})

        setProductList(products);
    }
    const getNextPage = async () => {
            let nextPage=page.current+1;
            if(nextPage<=page.last){
                setProductList([]);

                const response = await AxiosClient.get(`/products?page=${nextPage}`);
                const products = response?.data?.[0]?.data ?? [];

                setPage((prevPage) => ({ ...prevPage, current: nextPage }));

                //console.log(page)

                setProductList(products);
            }

    }
    const getPrevPage = async () => {
        const prevPage=page.current-1;
        if(prevPage>=1){
            setProductList([]);

            const response = await AxiosClient.get(`/products?page=${prevPage}`);
            const products = response?.data?.[0]?.data ?? [];

            setPage((prevPageStage) => ({ ...prevPageStage, current: prevPage }));

            //console.log(page)

            setProductList(products);
        }
    }


    return (
        <div className="bg-white mb-5">
            <div className="my-2 pl-2">
                <button onClick={()=>getProductList()}
                    className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5">Refresh</button>
                <button
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add</button>
            </div>
            <table className="bg-white w-[1200px]">
                <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Product name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Catalog</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Stock</th>
                </tr>
                </thead>
                <tbody className="text-gray-700">
                {
                    productList.map((product)=>{
                        return (
                            <tr key={product.id}>
                                <td className="px-4 py-3 text-left">{product.id}</td>
                                <td className="px-4 py-3 text-left"><Link to={"/product/"+product.id}>{product.product_name}</Link></td>
                                <td className="px-4 py-3 text-left">{product.catalog_name}</td>
                                <td className="px-4 py-3 text-left">{product.price}</td>
                                <td className="px-4 py-3 text-left">{product.stock}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className="flex pt-4">
                <button onClick={()=>getPrevPage()}
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Previous</button>
                <button onClick={()=>getNextPage()}
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Next</button>
            </div>
        </div>
    )
}