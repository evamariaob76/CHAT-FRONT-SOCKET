import React, { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";


export const ChatContext = createContext();
const initialState ={
    uid:'',
    chatActivo:null,
    usuarios:[],
    mensajes:[],
    mensajesTotales:[],
    mensajesNoLeidos:[],
    mensajesLeidos:[],
    actualizar:[]
}


export const ChatProvider = ({children}) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState)
  return (
    <ChatContext.Provider value ={{chatState, dispatch}}>
        {children}
    </ChatContext.Provider>
  )
}
