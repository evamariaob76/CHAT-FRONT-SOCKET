

import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fecth';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from '../types/types';
import {Image} from 'cloudinary-react';
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { AuthContext } from '../auth/AuthContext';
import { createContext } from 'react';

export const SocketContext = createContext();

export const SidebarChatItem =  ({usuario}) => {
    const {auth} = useContext(AuthContext);
    const {chatState,dispatch} = useContext(ChatContext);
    const {chatActivo}= chatState;
    const [totales, settotales] = useState(0)
    const baseUrl = process.env.REACT_APP_API_URL;

    
    const  onClick =async ()=>{
    
     const url = `${baseUrl}/mensajes/actualizar/${auth.uid}/${usuario.uid}`;
     const totalLeidios = `${baseUrl}/mensajes/totalLeidos/${auth.uid}/${usuario.uid}`;
     
     await fetch(url);

    const respuesta=await fetch(totalLeidios)
    let commits = await respuesta.json(totalLeidios);


        if(commits.de === usuario.uid){
            settotales(0)
            console.log('ok')
            return
}
    dispatch({   
            type: types.activarChat,
            payload:usuario.uid
        })

       const resp =  await fetchConToken (`mensajes/${usuario.uid}`);
        dispatch ({
            type: types.cargarMensajes,
            payload:resp.mensajes
        });

         dispatch ({
            type: types.Noleidos,
            payload:usuario
        });
        scrollToBottom("mensajes")
}

    useEffect(() => {

        return () => {
            settotales(0)
        }
    }, []);
    

const onLoad =async()=>{

        const totalNoLeidos = `${baseUrl}/mensajes/totalNoLeidos/${auth.uid}/${usuario.uid}`;
        const respuesta=await fetch(totalNoLeidos)
        let commits = await respuesta.json(respuesta);
        settotales(commits.mensajesNoLeidos)

}


    return (
        <div onLoad={onLoad} className='row chat-izquierda'>
        <div  className={`col-12 chat_list ${usuario.uid === chatActivo && 'active_chat'}` } onClick={onClick}>
            {/* active_chat */}
            <div className="chat_people row">
                <div className="chat_img"> 
                { usuario.img
                ?  <Image cloudName="drwgawhls"  upload_preset="chatEva" publicId={usuario.img} style={{borderRadius:'50%', border:'1 px solid grey'}}> 
   
                    </Image>

                :
                 <img  style={{borderRadius:'50%', border:'1 px solid grey'}} src="https://res.cloudinary.com/drwgawhls/image/upload/v1656148114/chat/avatar_xehcv6.png" alt="avatar" />

                }
                </div>
                <div className="chat_ib row" >
                    <div className='col-6' >
                    <h5>{usuario.nombre}</h5>
                    {usuario.online
                    ?
                    <span className="text-success">Online</span>
                    :
                    <span className="text-danger">Offline</span>
                    }
                    </div>
                    <div className='col-6 icono' >     
               
                       <Badge badgeContent={totales} color="primary"  >
                            <MailIcon color="action" />
                        </Badge> 

                    </div>                               
                </div>
            </div>
        </div>
    </div>
    )
}