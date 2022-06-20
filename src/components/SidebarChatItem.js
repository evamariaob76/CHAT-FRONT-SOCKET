import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext'
import { fetchConToken } from '../helpers/fecth'
import { scrollToBottom } from '../helpers/scrollToBottom'
import { types } from '../types/types'
import {Image} from 'cloudinary-react';


export const SidebarChatItem = ({usuario}) => {
    const {chatState,dispatch} = useContext(ChatContext);


 const {chatActivo}= chatState;
    const  onClick =async ()=>{
        dispatch({
            type: types.activarChat,
            payload:usuario.uid
        })

       const resp =  await fetchConToken (`mensajes/${usuario.uid}`);

        dispatch ({
            type: types.cargarMensajes,
            payload:resp.mensajes
        });
        scrollToBottom("mensajes")
}
 

    return (
        <div className={`chat_list ${usuario.uid === chatActivo && 'active_chat'}`} onClick={onClick}>
            {/* active_chat */}
            <div className="chat_people">
                <div className="chat_img"> 
                { usuario.img
                ?  <Image cloudName="drwgawhls"  upload_preset="chatEva" publicId={usuario.img} style={{borderRadius:'50%', border:'1 px solid grey'}}> 
   
                    </Image>

                :
                 <img  style={{borderRadius:'50%', border:'1 px solid grey'}} src="data:image/png;base64,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" alt="sunil" />

                }
                </div>
                <div className="chat_ib">
                    <h5>{usuario.nombre}</h5>
                    {usuario.online
                    ?
                    <span className="text-success">Online</span>
                    :
                    <span className="text-danger">Offline</span>
                    }
                    
                </div>
            </div>
        </div>
    )
}