import { createContext, useState, useEffect , useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const AuthContext = createContext(null)

export const AuthProvider  = ({children}) =>{
  const [auth,setAuth] =  useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    const stringifyAuthData = localStorage.getItem("blogData");
    if(stringifyAuthData){
      const blogData = JSON.parse(stringifyAuthData);
      const user = blogData.user;
      setAuth(user)
    }
    else{
      setAuth(null)
    }
  },[location,navigate])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>

}

export const useAuth = () =>{
 const auth =  useContext(AuthContext)
 return auth;
}
