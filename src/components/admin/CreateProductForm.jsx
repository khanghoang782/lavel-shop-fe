import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import AxiosClient from "../../services/api/AxiosClient.js";
import {getCatalogList} from "../../services/ProductService.js";
import axios from "axios";
import {FormSelectAttribute} from "./FormSelectAttribute.jsx";


export function CreateProductForm() {
    const {register, handleSubmit, reset,setValue, control} = useForm();
    const [catalogs,setCatalogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [groupList, setGroupList] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState();
    const [selectedGroupList, setSelectedGroupList] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    useEffect(()=>{
        getCatalogs();
        getAttributeGroups();
    },[])
    const getCatalogs=async()=>{
        try{
            const result = await getCatalogList()
            setCatalogs(result);
        }catch(err){
            console.log(err);
        }
    }

    async function onSubmit(data) {
            //const response = await AxiosClient.post("/product",data);
            //console.log(response);
        data.attribute=selectedAttributes.toString();
        //console.log(selectedAttributes);
        //prepare image
        let token=localStorage.getItem("ACCESS_TOKEN");
        const formData = new FormData();
        formData.append('image',data.image[0]);
        delete data.image;

        const response = await AxiosClient.post("/product",data);
        console.log(response);
        setLoading(true);
        if(response.status === 200){
            //upload image
            formData.append('product_id',response.data.data.id);
            const BASE_URL=import.meta.env.VITE_API_BASE_URL;
            axios.post(`${BASE_URL}/upload`,formData,{
                headers: {
                    'content-type':'multipart/form-data',
                    'Authorization':`Bearer ${token}`
                }
            }).then(()=>{
                //console.log(res);
                reset();
                setLoading(false);
            }).catch(err=>{
                console.log(err);
            });
        }

    }
    const getAttributeGroups=async()=>{
        AxiosClient.get(`/attribute/groups`)
            .then((res)=>{
                //console.log(res);
                setGroupList(res.data);
            })
    }
    function addSelectedGroup(groupId){

        setSelectedGroupList((prev)=>[...prev, groupId]);
        //console.log(groupId);
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
                                    catalogs.map((item) => (
                                        <option key={item.id} value={item.id}>{item.catalog_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                            <input type="text" {...register("stock", {required: true})} defaultValue=""/>
                        </div>
                    </div>
                </div>
                <div className="">
                    <label className="block text-sm font-medium text-gray-900">Attribute group: </label>
                    <div className="flex">
                        <select className="min-w-[80px] max-h-[28px]" onChange={event => setSelectedGroup(event.target.value)}
                                value={selectedGroup} defaultValue={"0"}>
                            <option value="0">Choice Attribute</option>
                            {
                                groupList.map((item) => (
                                    <option key={item.id} value={item.id}>{item.group_name}</option>
                                ))
                            }
                        </select>
                        <button
                            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 w-32"
                            onClick={() => addSelectedGroup(selectedGroup)}
                        >Add
                        </button>
                    </div>
                    <div className="flex flex-col">
                        {
                            selectedGroupList.length===0?<h2>EMPTY</h2>:
                                selectedGroupList.map((item) => (
                                    <FormSelectAttribute key={item} groupId={item} setSelectedAttribute={setSelectedAttributes}/>
                                ))
                        }
                    </div>
                </div>
                <div className="flex flex-col">
                </div>
                <div className="flex flex-col max-w-[50%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea {...register("description")} rows={4}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 min-w-[800px]"/>
                </div>
                <div className="flex flex-col max-w-[50%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Product Image</label>
                    <input type="file" {...register("image")}/>
                </div>
                {
                    loading ? <button disabled type="button"
                                      className="text-white bg-blue-700 hover:bg-blue-800 max-w-32 my-2.5 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"/>
                        </svg>
                        Loading...
                    </button> : <button type="submit"
                                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 my-2.5 w-32"
                    >SAVE
                    </button>
                }
            </form>
        </div>
    )
}