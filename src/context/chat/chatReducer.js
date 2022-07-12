import { types } from "../../types/types";

export const chatReducer = ( state, action ) => {


    switch ( action.type ) {
        case types.cerrarSesión:
            return{
                uid:'',
                chatActivo:null,
                usuarios:[],
                mensajes:[],
            mensajesTotales:[],
            mensajesNoLeidos:[]

            }
        
        case types.usuariosCargados:
            return {
                ...state,
                usuarios: [ ...action.payload ],

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
            ) {
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
            
        case types.mensajesTotales:
            return {
                ...state,
                mensajesTotales: [ ...action.payload ]
            }

         case types.mensajesNoLeidos:


               return {
                ...state,
                mensajesNoLeidos: [ action.payload ]
            }  
            

          case types.mensajesLeidos:
               return {
                ...state,
                mensajesNoLeidos: [ action.payload ]
            } 

            case types.actualizar:

               return {
                ...state,
                actualizar: [ action.actualizar ]
            } 
        default:
            return state;   }
}
