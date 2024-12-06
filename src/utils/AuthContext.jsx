import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AxiosClient from "../services/api/AxiosClient.js";


const AuthContext=createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider=({children}) => {
    const [auth,setAuth]=useState(null);
    const navigate=useNavigate();



    const setLogout=()=>{
        localStorage.removeItem("ACCESS_TOKEN");
        setAuth(null);
        navigate("/");
    }
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>{
    return  useContext(AuthContext);
}
export default AuthContext;