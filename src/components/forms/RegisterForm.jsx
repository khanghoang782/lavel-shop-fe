import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import AxiosClient from "../../services/api/AxiosClient.js";


export function RegisterForm() {
    const navigate = useNavigate();




    const {register,handleSubmit} = useForm();

    const onSubmit = async (data) => {
           AxiosClient.post("/register",data).then(
               navigate("/login",{replace:true})
           ).catch((error)=>{
               console.log(error);
           });
    }

    return (
        <div className="flex flex-col items-center">
            <div className="">
                <h2 className="mt-10 text-center text-2xl/9 font-bold text-gray-900">Wellcome</h2>
            </div>
            <div className="max-w-xl py-6 px-8 h-fit mt-20 bg-white rounded shadow-xl w-[20%]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label className="block text-gray-800 font-bold">Fullname:</label>
                        <input {...register("name", {required: true})} type="text"
                               className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"/>
                    </div>
                    <div>
                        <label className="block text-gray-800 font-bold">Email:</label>
                        <input {...register("email", {required: true})}
                               className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 font-bold">Password:</label>
                        <input {...register("password")} type="password"
                               className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 font-bold">Phone number:</label>
                        <input {...register("phone_number", {required: true})}
                               className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"/>
                    </div>
                    <button
                        className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Đăng ký
                    </button>
                </form>
            </div>
        </div>
    )
}