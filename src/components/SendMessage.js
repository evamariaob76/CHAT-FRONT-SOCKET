import React, { useContext, useState } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';



export const SendMessage = () => {
    const {chatState} = useContext(ChatContext)
    
    const [ mensaje, setMensaje ] = useState('');

    const { socket } = useContext( SocketContext );
    const { auth } = useContext( AuthContext );
    const baseUrl = process.env.REACT_APP_API_URL;

     socket.on();
 
    const onChange = ({ target }) => {socket.on()

    setMensaje( target.value );
              
   // setMensajeNoLeido( target.value );
    }


    const onSubmit = async(ev) => {
        ev.preventDefault();


        if ( mensaje.length === 0 ){ return; }
        setMensaje('');
        // TODO: Emitir un evento de sockets para enviar el mensaje
        // {
        //     de: // UID del usuario enviando el mensaje
        //     para: // UID del usuario que recibe el mensaje
        //     mensaje: // lo que quiero enviar
        // }
        socket.emit( 'mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
           mensaje,
        });

        // TODO: hacer el dispatch de el mensaje... 
        
    }


/*const cargando=async ()=>{
    
            const actualizar = `${baseUrl}/mensajes/actualizar/${auth.uid}/${chatState.chatActivo}`;
            const respuestaServidor=await fetch(actualizar)
            const commits = await respuestaServidor.json(respuestaServidor);
            console.log(commits +'actualizando');
       
}*/


const onClick=async()=>{
        const totalNoLeidos = `${baseUrl}/mensajes/totalNoLeidos/${chatState.chatActivo}/${auth.uid}`;
        const respuesta=await fetch(totalNoLeidos)
        await respuesta.json(respuesta);

         socket.emit( 'lista-mensajes-No-Leidos-Usuario', {
            de: chatState.chatActivo,
            para: auth.uid,
           mensaje,
        });

}
  /*  useEffect(() => {
         dispatch ({
            type: types.actualizar,
            actualizar:auth.uid
        })

 }, []);*/
 

    return (
        <div className='row row-chat' style={{width:'100%'}}  >
        <form onSubmit={ onSubmit } className='col-12' >
            <div className="type_msg ">
                <div className="input_msg_write col-sm-9 " >
                    <input
                      type="text"
                        autoFocus
                        id='foco'
                        className="write_msg "
                        placeholder="Mensaje..."
                        value={ mensaje }
                        onChange={ onChange }
                    />
                </div>
                <div className="row text-center" style={{paddingInlineStart:'1%'}}>
                    <button className="msg_send_btn mt-3" type="submit" onClick={onClick}>
                        enviar
                    </button>
                </div>
            </div>
        </form>
    </div>
    )
}