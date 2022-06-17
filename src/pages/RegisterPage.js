import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';
import Fab from '@mui/material/Fab';

import { fileUpload } from '../helpers/fileUpload';
import AddIcon from '@material-ui/icons/Add';


export const RegisterPage = () => {

       const fileInputRef = useRef();

    const {register} = useContext(AuthContext);
    const [form, setForm] = useState({
        nombre:'',
        email:'',
        password:'',
        img:''
});


const onChange =({target})=>{
    const {name, value}= target;
    setForm({
        ...form,
        [name]: value
    })};
    const onFileInputChange= async({target})=>{
    if(target.files===0)return;
   const img = await fileUpload(target.files)
    const {name}= target;

        setForm({
        ...form,
        [name]: img
    })
}
const onSubmit= async (e)=>{
    e.preventDefault();   

    const{nombre, email, password,img}= form;  

    const ok = await register(nombre,email, password, img);

    if(!ok){
        Swal.fire('Error', 'Ya existe el usuario', 'error')
    }
}



const todoOK=()=>{
    return( form.email.length > 0 && form.password.length >0 && form.nombre.length>0) ? true : false;
}
    return (
    <div className='container'>
                <div className="img ">            

        <div className="row login100-form avatarRegistro ">            
        </div>

        </div>
              <div className='form-group'>
        <form className="login100-form "
               onSubmit={onSubmit}>  
                <div className='contenedor-registro'>             
            <span className="login100-form-title mb-3">
                 Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input className="input100 inputstl" type="text" name="nombre" placeholder="Nombre" onChange={onChange} value={form.nombre}/>
                <span className="focus-input100"></span>
            </div>

            
            <div className="wrap-input100 validate-input mb-3">
                <input className="input100" type="email" name="email" placeholder="Email"onChange={onChange} value={form.email}/>
                <span className="focus-input100"></span>
            </div>
            
            
            <div className="wrap-input100 validate-input mb-3">
                <input className="input100" type="password" name="password" onChange={onChange} placeholder="Password"value={form.password}/>
                <span className="focus-input100"></span>
            </div>
    
             <input 
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                    name="img"
                />
                {/*<IconButton
                    color="primary"
                    onClick={ () => fileInputRef.current.click() }
                > 
                    <UploadOutlined />
                </IconButton><span>Subir avatar</span>*/}
                <div>


                </div>
        <div className="col " >

            <Fab size="small" style={{  margin: 20 }}color="secondary" aria-label="add" onClick={ () => fileInputRef.current.click() } >
                <AddIcon />
            </Fab><span >Subir avatar</span>
            <div className='col text-right' style={{marginBottom:'3%'}}>
                <Link to="/" className="txt1">
                            Tienes cuenta?
                </Link>
             </div>
                         </div>

            <div className="container-login100-form-btn m-t-17">
                    <button type="submit" className="login100-form-btn">
                        Crear cuenta
                    </button>
            </div>
            
        </div>

        </form>
        </div>
    </div>
    )
}