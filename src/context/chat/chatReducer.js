import { types } from "../../types/types";

export const chatReducer = ( state, action ) => {


    switch ( action.type ) {
        case types.cerrarSesión:
            return{
                uid:'',
                chatActivo:null,
                usuarios:[],
                mensajes:[]

            }
        
        case types.usuariosCargados:

            return {
                ...state,
                usuarios: [ ...action.payload ]
            }
        
        case types.activarChat:
            if ( state.chatActivo === action.payload ) return state;

            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }


        case types.nuevoMensaje:
            

            if ( state.chatActivo === action.payload.de || 
                 state.chatActivo === action.payload.para   
            )
            
            {
                return {
                    ...state,
                    mensajes: [ ...state.mensajes, action.payload ]
                }
            } else {
                return state;
            }

        case types.cargarMensajes:

            return {
                ...state,
                mensajes: [ ...action.payload ]
            }
            


      /* case types.actualizarMensajesLeidos:
            console.log(state.chatActivo)
                        console.log(action.payload)
                        console.log(action)
                        console.log(state)

            return {
                ...state,
                chatActivo: action.payload,
            }*/

           /* if ( state.chatActivo === action.payload) {
                return {
                    ...state,
                    Noleidos: [ action.payload ]
                }
            } else {
                return state;
            }*/



        default:
            return state;
    }

}
