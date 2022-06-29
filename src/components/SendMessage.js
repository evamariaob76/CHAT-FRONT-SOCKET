import React, { useContext, useState } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';

export const SendMessage = () => {
    const {chatState} = useContext(ChatContext)
    const [ mensaje, setMensaje ] = useState('');
    const { socket } = useContext( SocketContext );
    const { auth } = useContext( AuthContext );


        //console.log(chatState.mensajesSinLeer)

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
            //msgNoLeidos: mensaje.length,
        });

        // TODO: hacer el dispatch de el mensaje... 

    }

    return (
        <div className='row'>
        <form onSubmit={ onSubmit } className='col-12'>
            <div className="type_msg ">
                <div className="input_msg_write col-sm-9 ">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={ mensaje }
                        onChange={ onChange }
                    />
                </div>
                <div className="row text-center" style={{paddingInlineStart:'1%'}}>
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    </div>
    )
}