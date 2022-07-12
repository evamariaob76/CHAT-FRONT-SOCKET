import React, { createContext, useCallback, useContext, useState } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken, fetchSinToken } from "../helpers/fecth";
import { types } from "../types/types";



export const AuthContext = createContext();


const initialState ={
    uid:null,
    checking: true,
    logged:false,
    nombre:null,
    email:null,
    img:null,
    online:false
};


export const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState(initialState);
  const {dispatch} = useContext(ChatContext)
  const login = async (email, password)=>{
    const resp = await  fetchSinToken ('login', {email,password}, 'POST');


    if(resp.ok){
        localStorage.setItem('token', resp.token);

        const {usuario} = resp;
        setAuth({
            uid:usuario.uid,
            checking: false,
            logged:true,
            nombre:usuario.nombre,
            email:usuario.email,
            img:usuario.img,
           // online:true
        })
    }

    return resp.ok;

  };
    const register = async (nombre,email, password, img)=>{
    const resp = await  fetchSinToken ('login/new', {nombre,email,password,img}, 'POST');
    if(resp.ok){
        localStorage.setItem('token', resp.token);
        const {usuario} = resp;
        setAuth({
            uid:usuario.uid,
            checking: false,
            logged:true,
            nombre:usuario.nombre,
            email:usuario.email,
            img:usuario.img,
            //online:usuario.online
        })
                       
    }
    return resp.ok;
    }


    const verificarToken =useCallback(async ()=>{
        const token = localStorage.getItem('token');
        if(!token){
             setAuth({
                uid:null,
                checking: false,
                logged:false,
            })
            return false;
        }

        const resp = await fetchConToken('login/renew');
        if(resp.ok){
            localStorage.setItem('token', resp.token);
            const {usuario} = resp;
            setAuth({
                uid:usuario.uid,
                checking: false,
                logged:true,
                nombre:usuario.nombre,
                email:usuario.email,
                img:usuario.img,
                online:true


            })
            return true;
        }
        else{
            setAuth({
                uid:null,
                checking: false,
                logged:false,
            });
            return false;
        }
    }, []);

    const logout =()=>{
        localStorage.removeItem('token');
        dispatch({
            type:types.cerrarSesión

        })
         setAuth({
                uid:null,
                checking: false,
                logged:false,
            });

    }
   const actualizarAvatar =async (img)=>{
        const email = auth.email;
        const resp = await fetchConToken('login/actualizarAvatar',{email,img}, 'POST');
        setAuth({
            uid:auth.uid,
                checking: false,
                logged:true,
                nombre:auth.nombre,
                email:auth.email,
                img:resp.img
        })
        return resp.img


  
    
  
}
   /*const avatar =async (email)=>{
    const resp = await  fetchConToken ('login/avatar', {email}, 'POST');
    console.log(resp)

        return resp 
  
}*/

  return (
    <AuthContext.Provider value={{
        auth,
        login,
        register,
        verificarToken,
        logout,
        actualizarAvatar,
        
    }}>
            {children}

    </AuthContext.Provider>
  )
}