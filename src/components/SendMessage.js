import React, { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';



export const SendMessage = () => {
    const {chatState} = useContext(ChatContext)
    const [ mensaje, setMensaje ] = useState('');
    const { socket } = useContext( SocketContext );
    const { auth } = useContext( AuthContext );
    const [totales, settotales] = useState(0)
    const baseUrl = process.env.REACT_APP_API_URL;
//console.log(auth.uid)
//console.log(chatState.chatActivo)
  
const referencia = React.createRef()
const cargado=()=>{
    referencia.current.focus()
}

    const [input, setinput] = useState('')

    const onChange = ({ target }) => {
    setMensaje( target.value );

    }


    const onSubmit = (ev) => {
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
const focus =async()=>{
       const totalNoLeidos = `${baseUrl}/mensajes/totalNoLeidos/${auth.uid}/${chatState.chatActivo}`;
        const respuesta=await fetch(totalNoLeidos)
        let commits = await respuesta.json(respuesta);
        console.log(commits)
       // settotales(commits.mensajesNoLeidos)
        //settotales(0)
}

const Onclick =async()=>{
       const totalNoLeidos = `${baseUrl}/mensajes/totalNoLeidos/${auth.uid}/${chatState.chatActivo}`;
        const respuesta=await fetch(totalNoLeidos)
       const  commits= await respuesta.json(respuesta);
        console.log(commits)
        settotales(commits.mensajesNoLeidos)
}

    return (
        <div className='row row-chat' >
        <form onSubmit={ onSubmit } className='col-12'>
            <div className="type_msg ">
                <div className="input_msg_write col-sm-9 ">
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
                    <button className="msg_send_btn mt-3" type="submit" onClick={Onclick}>
                        enviar
                    </button>
                </div>
            </div>
        </form>
    </div>
    )
}