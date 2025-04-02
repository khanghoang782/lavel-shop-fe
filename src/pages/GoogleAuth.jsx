import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import AxiosClient from "../services/api/AxiosClient.js";
import {useAuth} from "../utils/AuthContext.jsx";


export function GoogleAuth(){
    const [searchParms] = useSearchParams();
    const code=searchParms.get('code');
    const {setAuth}=useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        getCallBack();
    })

    const getCallBack=async ()=>{
        AxiosClient.get(`/auth/google/callback?code=${code}`)
            .then(res=>{
                console.log(res);
                const token=res?.data?.token;
                localStorage.setItem("ACCESS_TOKEN",token);

                const name=res?.data?.name;
                const role=res?.data?.role;

                setAuth({name:name,role:role});

                navigate("/");
                }).catch(err=>{
                    console.log(err);
                });
    }
    return (
        <div>
            <h1>Please wait...</h1>
        </div>
    )
}