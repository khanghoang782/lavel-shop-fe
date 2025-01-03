import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import AxiosClient from "../../services/api/AxiosClient.js";
import {getCatalogList} from "../../services/ProductService.js";


export function CreateProductForm() {
    const {register, handleSubmit, reset,setValue, control} = useForm();
    const [catalogs,setCatalogs] = useState([]);


    useEffect(()=>{
        getCatalogs();
    },[])
    const getCatalogs=async()=>{
        try{
           /* const response = await AxiosClient.get("/catalogs");
            const data=response?.data?.[0] ?? [];

            console.log(data);
            setCatalogs(data);*/
            const respone = await getCatalogList()
            //console.log(respone);
            setCatalogs(respone.data);

        }catch(err){
            console.log(err);
        }
    }

    async function onSubmit(data) {
        try{
            const response = await AxiosClient.post("/product", data);

            if(response.status === 200){
                reset();
            }
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div className="w-[1200px] mb-9 mx-auto mt-20">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="flex gap-6">
                    <div>
                        <div className="flex flex-col min-w-80 mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Product name: </label>
                            <input type="text" {...register("product_name", {required: true})} defaultValue=""/>
                        </div>
                        <div className="flex flex-col ">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Price: </label>
                            <input type="text" {...register("price", {required: true})} defaultValue=""/>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col min-w-80 mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Catalog: </label>
                            <select {...register("catalog_id", {required: true})}>
                                {/*<option key="..." defaultValue value="...">...</option>*/}
                                {
                                    catalogs?.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.catalog_name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                            <input type="text" {...register("stock", {required: true})} defaultValue=""/>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col max-w-[50%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea {...register("description")} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 min-w-[800px]"/>
                </div>
                <button type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 my-2.5 w-32"
                    >SAVE</button>
            </form>
        </div>
    )
}