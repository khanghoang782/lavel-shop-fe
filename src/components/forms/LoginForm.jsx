import { useForm } from "react-hook-form";
import {useLocation, useNavigate,Link} from "react-router-dom";
import AxiosClient from "../../services/api/AxiosClient.js";
import {useAuth} from "../../utils/AuthContext.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

export function LoginForm() {
    const {setAuth}=useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname||"/";
    const [gUrl,setGUrl]=useState("/login");

    useEffect(()=>{
       getGoogleLoginPortal();
    },[])


    const {register,handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try{
            const response = await AxiosClient.post("/login",data);

            const token=response?.data?.token;
            localStorage.setItem("ACCESS_TOKEN",token);

            const name=response?.data?.name;
            const role=response?.data?.role;

            setAuth({name:name,role:role});
            //console.log(name,role);

            navigate(from,{replace:true});
        }catch(error){

            console.log(error);
        }
    }
    const getGoogleLoginPortal=async()=>{
        const gLogin= await AxiosClient.get("/auth/google/url");
        if(gLogin.status===200){
            setGUrl(gLogin.data.url);
        }
    }

    return (
        <>
            <div className="">
                <h2 className="mt-10 text-center text-2xl/9 font-bold text-gray-900">Log in</h2>
            </div>
            <div className="max-w-xl py-6 px-8 h-fit mt-20 bg-white rounded shadow-xl w-[20%]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-800 font-bold">Email:</label>
                        <input {...register("email", {required: true})} type="text"
                               className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-800 font-bold">Password:</label>
                        <input {...register("password")} type="password"
                               className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"/>
                    </div>
                    <button
                        className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login
                    </button>
                    <a
                            href={gUrl}
                            className={gUrl==="/login"?"text-white bg-indigo-500 font-medium rounded px-5 py-2.5 text-center items-center justify-center w-full mt-2.5 hidden"
                                        :"text-white bg-indigo-500 font-medium rounded px-5 py-2.5 text-center inline-flex items-center justify-center w-full mt-2.5"}>
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 18 19">
                            <path fillRule="evenodd"
                                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                  clipRule="evenodd"/>
                        </svg>
                        Sign in with Google
                    </a>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Chưa là thành viên ?
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500"> Ấn vào đây đễ
                        đăng ký</Link>
                </p>
            </div>
        </>
    )
}