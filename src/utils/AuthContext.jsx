import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const AuthContext=createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider=({children}) => {
    const [auth,setAuth]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        checkToken();
    },[])
    const checkToken=()=>{
        const token=localStorage.getItem("ACCESS_TOKEN");
        if(token){
            let name=jwtDecode(token).username;
            let role=jwtDecode(token).role;
            setAuth({name:name,role:role});
        }
    }

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