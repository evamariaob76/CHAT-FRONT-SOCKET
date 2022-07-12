

import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fecth';
import { types } from '../types/types';
import {Image} from 'cloudinary-react';
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { AuthContext } from '../auth/AuthContext';


//export const SocketContext = createContext();

export const SidebarChatItem =  ({usuario}) => {
    const {chatState,dispatch} = useContext(ChatContext);
    const {chatActivo}= chatState;

    const [noleidos, setNoleidos] = useState([]);

    const { auth } = useContext( AuthContext );
    const baseUrl = process.env.REACT_APP_API_URL;
    const [Mountes, setMountes] = useState(0)

    useEffect(() => {
      
    
      return () => {
        setMountes(0)
      }
    }, [])
    
    useEffect(() => {
      
    
      return () => {
        setNoleidos(0)
      }
    }, [])
//console.log(mensajesNoLeidos)

   /*  useEffect(() => {
     mensajesNoLeidos.map((item)=>{
        if(usuario.uid ===item._id){
            setMountes(item.totales)
            console.log(item.totales+ 'OK')
        }

      return () => {
        setMountes(0)
      }
    }, [mensajesNoLeidos])
    })*/







    /* const fetchData = async()=>{    

        const totalNoLeidos = `${baseUrl}/mensajes/totalNoLeidos/${auth.uid}/${usuario.uid}`;
        const respuesta=await fetch(totalNoLeidos)
        const commits = await respuesta.json(respuesta);
        //console.log(commits)
            if(commits.de ===chatActivo && commits.para ===auth.uid  ){
             //   console.log(commits)
                   setNoleidos(0);
                    //actualizar(commits.de,commits.para )
            }
            else if(commits.para ===auth.uid){

              setNoleidos(commits.mensajesNoLeidos)
              console.log('veces')
        }
     }*/


     useEffect(() => {


      setTimeout(async() => {
        const totalNoLeidos = `${baseUrl}/mensajes/totalNoLeidos/${auth.uid}/${usuario.uid}`;
        await fetch(totalNoLeidos).then((response)=>response.json()).then((commits)=>{
            if(commits.de ===chatActivo && commits.para ===auth.uid  ){
             //   console.log(commits)
                   setNoleidos(0);
                    //actualizar(commits.de,commits.para )
            }
            else{
              setNoleidos(commits.mensajesNoLeidos)
           }
        })
}, 500);

}, [ usuario.uid, auth.uid, baseUrl])
     

        /*  socket.emit( 'lista-mensajes-No-Leidos',{
            uid: auth.uid,
        });*/

        
 


/*useEffect(() => {


  for (x=0;x<mensajesNoLeidos.length;x++) {
    console.log(mensajesNoLeidos[x].de +'///'+ usuario.uid)
    if(mensajesNoLeidos[x].de ===usuario.uid)
    console.log(mensajesNoLeidos[x].de+'OK')
   // setMountes(x)
}
  return () => {

  }
}, [usuario.uid])*/







/*useEffect(() => {

  return () => {    

    actualizando();
  }
}, [])*/





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
        const actualizar = async()=>{


          setTimeout(async() => {
            const actualizar = `${baseUrl}/mensajes/actualizar/${auth.uid}/${usuario.uid}`;
            const respuestaServidor=await fetch(actualizar)
            await respuestaServidor.json(respuestaServidor);
            
            setMountes(0)}, 500);


     }   
        actualizar()
}




    return (
        <div className='row chat-izquierda' onClick={onClick}>
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
            
                     {noleidos>0  && Mountes===0
                     ?
                      <Badge badgeContent={noleidos} color="primary"  key ={usuario.uid} >
                        <MailIcon color="action"/>
                    </Badge>
                     :
                 
                    <Badge badgeContent={Mountes} color="primary" key ={usuario.uid} >
                         <MailIcon color="action"/>
                    </Badge>  
                     }
            
         

{/*


         mensajesNoLeidos.map( item => (
                        ( usuario.uid ===item._id )
                            ?      <Badge badgeContent={item.totales} color="primary" key ={usuario.uid} >
                            <MailIcon color="action"/>
                </Badge>  
                            :      <Badge badgeContent='0' color="primary" key ={usuario.uid} >
                            <MailIcon color="action"/>
                </Badge>  
                    ))
*/

}
                      

                    </div>                               
                </div>
            </div>
        </div>
    </div>
    )
}
