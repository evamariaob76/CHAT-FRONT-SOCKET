import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types';
import { ChatContext } from './chat/ChatContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
   // const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://chat-backend-socket.herokuapp.com');

    
    const { auth } = useContext( AuthContext );
    const {dispatch} = useContext(ChatContext)

    useEffect(() => {
        if ( auth.logged ) {
            conectarSocket();
        }
    }, [ auth, conectarSocket ]);

    useEffect(() => {
        if ( !auth.logged ) {
            desconectarSocket();
        }
    }, [ auth, desconectarSocket ]);

    useEffect(() => {

        socket?.on('lista-usuarios', (usuarios)=>{                   

            dispatch({
                type:types.usuariosCargados,
                payload:usuarios
            })
        })
    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje)=>{

            dispatch({
                type: types.nuevoMensaje,
                payload:mensaje,
            });
           scrollToBottomAnimated('mensajes')

        })
    }, [socket, dispatch]);            
        const mensaje=   socket?.on('mensaje-personal', (mensaje)=>{
        return mensaje
        })


   useEffect(() => {
        socket?.on('totalMensajes', (uid)=>{
            dispatch({
                type:types.totalMensajes,
                payload:uid
            })
     
        }) }, [socket, dispatch]);
           

    useEffect(() => {
        socket?.on('actualizarMensajes', (usuario)=>{
            dispatch({
                type: types.Noleidos,
                payload:usuario,
            });
           scrollToBottomAnimated('mensajes')

        })
    }, [socket, dispatch]);            
        //const mensaje=   socket?.on('mensaje-personal', (mensaje)=>{
       // return mensaje
        //})




    return (
        <SocketContext.Provider value={{ socket, online , mensaje}}>
            { children }
        </SocketContext.Provider>
    )
}