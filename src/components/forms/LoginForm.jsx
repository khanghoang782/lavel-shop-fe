import { useForm } from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import AxiosClient from "../../services/api/AxiosClient.js";
import {useAuth} from "../../utils/AuthContext.jsx";

export function LoginForm() {
    const {setAuth}=useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname||"/";



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

    return (
        <>
            <div className="">
                <h2 className="mt-10 text-center text-2xl/9 font-bold text-gray-900">Log in</h2>
            </div>
            <div className="max-w-xl py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl w-[20%]">
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
                </form>
            </div>
        </>
    )
}