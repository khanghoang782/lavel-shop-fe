import {NavBar} from "../components/NavBar.jsx";
import {CatalogSideBar} from "../components/CatalogSideBar.jsx";
import {ProductCard} from "../components/ui/ProductCard.jsx";
import {useEffect, useState} from "react";

import {getProductByCatalogId} from "../services/ProductService.js";
import {useParams} from "react-router-dom";

export function CatalogPage() {
    const catalogId=useParams().catalogname;
    const [productList, setProductList] = useState([]);
    const [showSort, setShowSort] = useState(false);
    const [page, setPage] = useState({current:0,last:0});
    const [selectedAttr, setSelectedAttr] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [sortOption,setSortOption] = useState("")

    useEffect(() => {
        initProductDisplay(catalogId);

    },[catalogId]);
    useEffect(() => {
        filterAndSortProducts();
    },[selectedAttr,sortOption,productList]);
    const initProductDisplay=async (id)=>{
        const result=await getProductByCatalogId(id);
        const productList=result?.data?.[0]?.data ?? []
        //console.log(result.data?.[0].last_page);//[0].last_page
        setPage({current: 1,last:result.data?.[0].last_page});

        setProductList(productList);
        setFilteredProductList(productList);

    }
    const getMoreProducts=async () => {

        const result=await getProductByCatalogId(catalogId,page.current+1);
        const list=result?.data?.[0]?.data ?? [];
        setProductList([...productList,...list]);
        setPage((prevPage)=> ({...prevPage,current:page.current+1}));
    }
    /*function setSortedList(option){
        if(option==="ascending"){
            const sortedList=[...productList];
            sortedList.sort((a,b)=>a.price-b.price);
            console.log(sortedList);
            setProductList(sortedList);
        }
        if(option==="descending"){
            const sortedList=[...productList];
            sortedList.sort((a,b)=>b.price-a.price);
            console.log(sortedList);
            setProductList(sortedList);
        }
    }*/
    const filterAndSortProducts=()=>{
        let tempList=[...productList]
        if(selectedAttr.length>0){
            tempList=tempList.filter((product)=>product.attribute.some((attr)=>selectedAttr.includes(attr.attribute_name)));
        }
        if(sortOption==="ascending"){
            tempList.sort((a, b) => a.price - b.price);
        } else if (sortOption === "descending") {
            tempList.sort((a, b) => b.price - a.price);
        }
        setFilteredProductList(tempList);
    }


    return (
        <>
            <NavBar/>
            <main className="w-full flex justify-center mt-10">
                <CatalogSideBar size={selectedAttr} setSelectedSize={setSelectedAttr}/>
                <section className="bg-white w-[1144px]">
                    <div className="w-full flex justify-end pr-10 my-5 text-xl gap-2 items-center">
                        <p>Xắp xếp theo</p>
                        <div className="relative">
                            <button
                                onClick={() => setShowSort(!showSort)}
                                className="w-[160px] py-2.5 px-5 text-sm text-left font-medium text-gray-900 bg-gray-100 rounded-full border border-gray-200">
                                Mặc định
                            </button>
                            <div
                                className={showSort ? 'bg-white p-4 mt-1 border border-gray-200 rounded-2xl absolute' : 'bg-white p-4 mt-1 border border-gray-200 rounded-2xl absolute hidden'}>
                                <div className="text-xl">
                                    <button onClick={()=>setSortOption("ascending")}>Giá tăng dần</button>
                                    <button onClick={()=>setSortOption("descending")}>Giá giảm dần</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[1144px] md:w-fit bg-white px-5">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2">
                            {filteredProductList.map((item) => (
                                <ProductCard key={item.id} name={item.product_name} price={item.price} id={item.id} img={item.image_url}/>
                            ))}
                        </div>
                        <div className="w-full flex-row flex justify-center mt-10 mb-14">
                            <button onClick={()=>getMoreProducts()}
                                className={page.current>=page.last?"py-2.5 px-5 rounded-full border border-gray-200  hidden":"py-2.5 px-5 rounded-full border border-gray-200"}>Thêm sản phẩm</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}