import {useState} from "react";
import {useForm} from "react-hook-form";
import AxiosClient from "../../services/api/AxiosClient.js";


export function FeedBackForm({productId,onSubmitSucced}){
    const {register, handleSubmit, reset,setValue, control} = useForm();
    const [selectStar,setSelectStar] = useState(5);
    const [temporarySelected,setTemporarySelected] = useState(0);
    const DEFAULT_SELECTED_STAR =()=> {
        return <svg className="w-6 h-6 ms-2 text-yellow-300" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>;
    };
    const DEFAULT_STAR=()=> {
        return <svg className="w-6 h-6 ms-2 text-gray-300 dark:text-gray-500" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>;
    };
    const DEFAULT_STAR_NUMBER=5;
    let starLIst=Array(DEFAULT_STAR_NUMBER).fill(DEFAULT_SELECTED_STAR);
    const onSubmit=(data)=>{
        data.rating=selectStar;
        AxiosClient.post(`/product/${productId}/feedback`,data).then((result)=>{
            if(result.status === 200){
                reset();
                onSubmitSucced();
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>


            <div className="flex w-full justify-between">
                <div className="flex items-center">
                    {
                        starLIst.map((element,index)=> {
                            return (
                                <div key={index}>
                                    {
                                        <div onMouseEnter={()=>setTemporarySelected(index+1)}
                                                onMouseLeave={()=>setTemporarySelected(0)}
                                                onClick={()=>setSelectStar(index+1)}>
                                            {
                                                (temporarySelected!==0&&(index+1)>temporarySelected)?<DEFAULT_STAR/>:((index+1)<=selectStar?<DEFAULT_SELECTED_STAR />:<DEFAULT_STAR/>)

                                            }
                                        </div>
                                    }
                                </div>
                            );
                        })
                    }

                </div>
                <button className="text-xl mt-2 mb-1.5 px-4 py-2 italic bg-green-500 rounded-xl text-white">
                    POST
                </button>
            </div>
            <textarea className="bg-gray-100 rounded-lg py-1.5 px-2 mb-4 text-xl w-full h-24 overflow-y-hidden"
                      {...register("feedback")} rows={3}>
            </textarea>
            </form>
        </div>

    )
}