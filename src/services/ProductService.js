import AxiosClient from "./api/AxiosClient.js";
import axiosClient from "./api/AxiosClient.js";

const getProductByCatalogId=async (catalogId,page) => {
    try{
        const response=await AxiosClient.get(`/products/catalog/${catalogId}?page=${page?page:1}`);
        return response;
    }catch(err){
        console.log(err);
    }
}
const getOneProductById=async (id) => {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data?.data;
}
const getAllProducts=async (page) => {
    try {
        const response=await AxiosClient.get('/products?page='+page?page:1);
        const result = response?.data?.[0]?.data ?? [];

        return result;
    }catch(err){
        console.log(err);
    }
}
const getProductDisplay=async (sort) => {
    try{
        const response=await AxiosClient.get(`/productdisplay?sort=${sort}`);
        return response.data;
    }catch(err){
        console.log(err);
    }

}
const getCatalogList = async () => {
    try{
        let list=sessionStorage.getItem('catalogList');
        if(Array.isArray(list)&&list.length>0){
            return JSON.parse(list);
        }
        const response=await AxiosClient.get(`/catalogs`);
        sessionStorage.setItem("catalogList",JSON.stringify(response.data));
        //console.log(response.data);
        return response.data;
    }catch(err){
        console.log(err);
    }
}
const getImageUrl=async (productId) => {
    const response = await AxiosClient.get(`/product/${productId}/image`);
    if(response.status === 200){
        const BASE_URL=import.meta.env.VITE_API_BASE;
        let url=BASE_URL+`/storage/images/${response.data.image_name}`;
        return url;
    }
    return "";
}

export {getProductByCatalogId,getAllProducts,getProductDisplay,getOneProductById,getCatalogList,getImageUrl}