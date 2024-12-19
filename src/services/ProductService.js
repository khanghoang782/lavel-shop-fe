import AxiosClient from "./api/AxiosClient.js";
import axiosClient from "./api/AxiosClient.js";

const getProductByCatalogId=async (catalogId) => {
    try{
        const response=await AxiosClient.get(`/products/catalog/${catalogId}`);
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
        const response=await AxiosClient.get(`/catalogs`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export {getProductByCatalogId,getAllProducts,getProductDisplay,getOneProductById,getCatalogList}