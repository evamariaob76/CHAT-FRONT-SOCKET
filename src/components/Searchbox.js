import React, { useContext,useRef, useState } from 'react';
import { AuthContext } from '../auth/AuthContext'
import { fileUpload } from '../helpers/fileUpload';


export const Searchbox = () => {
    const fileInputRef = useRef();

    const {auth, logout,actualizarAvatar} = useContext(AuthContext);

    const [img, setImg] = useState(auth.img);
    console.log(auth.img)

    const nombre = auth.nombre;
   /* const style ={
        borderRadius:40,
        width:'30px',
        fontWeight:'bold'
    }*/

   /* const span ={
        fontSize:'20px',
        color:'#0C5460',
        fontWeight:'bold',
        paddingRight:'20%'

    }*/




const onFileInputChange= async({target})=>{
 
    if(target.files===0)return;
    try {
        const imagen =await fileUpload(target.files)
        console.log(imagen)
        const actualizarIMG= await actualizarAvatar(imagen)

        setImg(actualizarIMG);
        console.log(img)
    } catch (error) {
        console.log(error);

    }
  
    
}
    return (


     <div className="container row " style={{boxShadow:'none',  width:'100%', background:'#f8f9fa'}}>


            <div  className="contenedor chat col-6">
            <img src={img}style={{opacity:'0.7'}} alt={img}/>
  <h3 className="centrado"style={{padding:'10px', fontSize:'30px', fontWeight:'bold'}}>{nombre.toUpperCase()}</h3>
         </div>

        <div className='col-3 '>

                <div className='centrado'>
                    <button name="img" href="#" className="btn btn-info  " style={{fontSize:'13px'}}onClick={ () => fileInputRef.current.click() }>Cambiar avatar</button>

                </div>

        </div>
        <div className='col-3 '>                   
             <button className="btn btn-danger centrado" onClick={logout} style={{fontSize:'13px', marginLeft:'10%'}}>
                        Salir
             </button>
        </div>



                   { /*<img className="card-img rounded-pill " id="imagen" src={img} alt={img} />*/}
                    <div> <input 
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                    name="img"
                /></div>

                        
              { /*<Fab size="small" style={{  margin: 20 }}color="secondary" aria-label="add" onClick={ () => fileInputRef.current.click() } >
                <AddIcon />
    </Fab><span >Cambiar</span>   */ }

  
                  
                  
        <hr />
    </div>
    )
}