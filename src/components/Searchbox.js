import React, { useContext,useRef, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { fileUpload } from '../helpers/fileUpload';


export const Searchbox = () => {
    const fileInputRef = useRef();



    const {auth, logout,actualizarAvatar} = useContext(AuthContext);
    const [imagen, setImg] = useState(auth.img);

    const nombre = auth.nombre;


    const onFileInputChange= async({target})=>{

        if(target.files===0)return;
        try {
            const imagen =await fileUpload(target.files);
            console.log(imagen)
            const actualizarIMG= await actualizarAvatar(imagen)

            setImg(actualizarIMG);

        } catch (error) {
            console.log(error);

    }
  
    
}
    return (


     <div className="container row grid " style={{boxShadow:'none',  width:'100%', height:'100%', background:'#f8f9fa'}}>
        <div  className="contenedor chat col-6 responsive grid-item">
            {
                imagen.length>0
                ? <img src={imagen}style={{opacity:'0.7', width:'1000px'}} alt={imagen} className="imagen"/>

                :  <img src="https://res.cloudinary.com/drwgawhls/image/upload/v1656148114/chat/avatar_xehcv6.png"style={{opacity:'0.7', width:'1000px', borderRadius:'50%'}} alt={imagen} className="imagen"/>

            }
            <span className='responsive'>  <h3 className="centrado responsive"style={{padding:'10px', fontSize:'30px', fontWeight:'bold',borderRadius:'50%'}}>{nombre.toUpperCase()}</h3></span>
        </div>

        <div className='col-3 auth grid-item'>

                <div className='centrado'>
                    <button name="img" href="#" className="btn btn-info  " style={{fontSize:'13px'}}onClick={ () => fileInputRef.current.click() }>Cambiar avatar</button>

                </div>

        </div>
        <div className='col-3 grid-item'>                   
             <button className="btn btn-danger centrado " onClick={logout} style={{fontSize:'13px', marginLeft:'10%'}}>
                        Salir
             </button>
        </div>

                    <div> <input 
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                    name="img"
                /></div>         

        <hr />
    </div>
    )
}