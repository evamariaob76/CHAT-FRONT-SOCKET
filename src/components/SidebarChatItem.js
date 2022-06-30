

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


const badgeStyle = {
  "& .MuiBadge-badge": {
    width: 350,
    height: 250,
    borderRadius: '50%'
  }
}
export const SocketContext = createContext();


export const SidebarChatItem =  ({usuario}) => {
    const {chatState,dispatch} = useContext(ChatContext);
    const {chatActivo}= chatState;
    const [totales, settotales] = useState(0);
    const { auth } = useContext( AuthContext );
    const baseUrl = process.env.REACT_APP_API_URL;
  //console.log(chatActivo+'inicio')   

  //console.log(chatActivo+'chatactivo')   
  //console.log(usuario.uid)

    useEffect(() => {
        onLoad()

    }, [totales])
    


    const  onClick =async ()=>{
    
     const url = `${baseUrl}/mensajes/actualizar/${auth.uid}/${usuario.uid}`;
     const totalLeidios = `${baseUrl}/mensajes/totalLeidos/${auth.uid}/${usuario.uid}`;
         //console.log(chatActivo + 'click')

     await fetch(url);

        const respuesta=await fetch(totalLeidios)
        let commits = await respuesta.json(totalLeidios);



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

    useEffect(() => {

        return () => {
            settotales(0)
        }
    }, []);

const onLoad =async()=>{
////console.log(chatActivo)
//console.log(usuario.uid)
//console.log(auth.uid +'authuid')
  //console.log(chatState.chatActivo+'state')
//console.log(usuario)


   /* if(chatActivo === usuario.uid ){
        console.log('seteando')
            settotales(0)
}*/

    //console.log(chatActivo + 'alcargar')

        const totalNoLeidos = `${baseUrl}/mensajes/totalNoLeidos/${auth.uid}/${usuario.uid}`;
        const respuesta=await fetch(totalNoLeidos)
        const commits = await respuesta.json(respuesta);
        

        
       if(commits.de ===chatActivo && commits.para ===auth.uid  ){
            settotales(0)
        }
        else{
           // console.log(commits)
            settotales(commits.mensajesNoLeidos)

        }

}


    return (
        <div onLoad={onLoad} className='row chat-izquierda'onClick={onClick}>
        <div  className={`col-12 chat_list ${usuario.uid === chatActivo && 'active_chat'}` } >
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
                    <h4>{usuario.nombre}</h4>
                    {usuario.online
                    ?
                    <span className="text-success online">Online</span>
                    :
                    <span className="text-danger online">Offline</span>
                    }
                    </div>
                    <div className='col-6 icono' >     
            
                     
                    
                
                         <Badge badgeContent={totales} color="primary"  >
                            <MailIcon color="action"/>
                        </Badge> 
                 
                      

                    </div>                               
                </div>
            </div>
        </div>
    </div>
    )
}