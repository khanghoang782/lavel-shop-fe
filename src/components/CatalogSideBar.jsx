import {useEffect, useState} from "react";
import {getCatalogList} from "../services/ProductService.js";
import AxiosClient from "../services/api/AxiosClient.js";

export function CatalogSideBar({size,setSelectedSize}) {
    const [catalogs,setCatalogs] = useState([]);
    const [sizes, setSizes] = useState([]);
    useEffect(() => {
       fetchCatalogs();
       fetchSizeList();
    },[])
    const fetchCatalogs = async () => {
        const result=await getCatalogList();
        setCatalogs(result);
    }
    const fetchSizeList = async () => {
        let list=sessionStorage.getItem('sizeList');
        if(Array.isArray(list)&&list.length>0){
            setSizes(JSON.parse(list));
        }else{
            AxiosClient.get("/attribute/size").then((response) => {
                //console.log(response);
                sessionStorage.setItem("sizeList",JSON.stringify(response.data));
                setSizes(response.data);
            })
        }
    }
    function AttributeButton({value,selectedButton,setSelected}){
        return (
            <button
                className={selectedButton.includes(value)?"text-3xl font-semibold border-[3px] px-1.5 mr-2 my-1 border-blue-400":"text-3xl font-semibold border-[3px] px-1.5 mr-2 my-1"}
                onClick={()=>setSelected(value)}>{value}</button>
        )
    }
    const toggleSize = (size) => {
        setSelectedSize((prevState) => prevState.includes(size)?prevState.filter(item=>item!==size):[...prevState,size]);
    }
    return (
        <aside className="bg-white w-[240px] h-auto pl-5 pt-10">
            <h2 className="text-2xl font-semibold">Size:</h2>
            <div className="text-xl text-gray-700 pl-2">
                {
                    sizes.map((item,index) => (
                        <AttributeButton key={index} value={item.attribute_name} setSelected={()=>toggleSize(item.attribute_name)} selectedButton={size}/>
                    ))
                }
            </div>

        </aside>
    )
}