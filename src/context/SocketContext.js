import { createContext, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types';
import { ChatContext } from './chat/ChatContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    //const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://chat-backend-socket.herokuapp.com');

    
    const { auth } = useContext( AuthContext );
    const {dispatch} = useContext(ChatContext);

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
                payload:mensaje
            });
           scrollToBottomAnimated('mensajes')

        })
    }, [socket, dispatch]);


    useEffect(() => {
        socket?.on('lista-mensajes-No-Leidos', (mensajesTotales)=>{
     
            dispatch({
                type: types.mensajesTotales,
                payload:mensajesTotales
            });

        })
    }, [socket]);
   
    useEffect(() => {
        socket?.on('lista-mensajes-No-Leidos-Usuario', (mensajesNoLeidos)=>{
           dispatch({
                type: types.mensajesNoLeidos,
                payload:mensajesNoLeidos
            });

        })
    }, [socket]);

     /*useEffect(() => {
        socket?.on('actualizar-Mensajes-Leidos', (actualizar)=>{
           dispatch({
                type: types.actualizar,
                payload:actualizar
            });

        })
    }, [socket]);*/
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}