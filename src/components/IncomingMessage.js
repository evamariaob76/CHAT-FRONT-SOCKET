import React, { useContext,useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { horaMes } from '../helpers/horaMes';

export const IncomingMessage = ({msg}) => {
    const {auth} = useContext(AuthContext);



    return (
        <div className="incoming_msg" >
            <div className="incoming_msg_img">
                {
                    auth.img
                    ? <img src={auth.img} alt={auth.nombre}  style={{borderRadius:'50%', border:'1 px solid grey'}}/>
                    : <img src="https://res.cloudinary.com/drwgawhls/image/upload/v1656148114/chat/avatar_xehcv6.png" alt={auth.nombre} style={{borderRadius:'50%', border:'1 px solid grey'}}/>
                }
               
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{msg.mensaje}</p>

                    <span className="time_date"> {horaMes(msg.createAt)}</span>
                </div>
            </div>
        </div>
    )
}
