import {ItemDisplayB} from "./ui/ItemDisplayB.jsx";
import {useEffect, useState} from "react";
import AxiosClient from "../services/api/AxiosClient.js";

export function FeetureDisplay(){
    const [itemList,setItemList] = useState([]);
    useEffect(()=>{
        getList()
    },[])
    const getList=async ()=>{
        try{
            const data=await AxiosClient.get('/products/random');
            console.log(data);
        }catch(err){
            console.log(err);
        }


    }
    return (
        <div className="bg-gray-100 w-[70%]">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Feeture</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <ItemDisplayB/>
                </div>
            </div>
        </div>
    )
}