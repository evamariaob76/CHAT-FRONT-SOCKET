import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { horaMes } from '../helpers/horaMes';

export const IncomingMessage = ({msg}) => {
        const {auth} = useContext(AuthContext);

    
    return (
        <div className="incoming_msg" >
            <div className="incoming_msg_img">
                <img src={auth.img} alt="sunil" />
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
