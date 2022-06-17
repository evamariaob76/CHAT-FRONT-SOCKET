import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';
import Fab from '@mui/material/Fab';

import { fileUpload } from '../helpers/fileUpload';
import {  Button } from '@mui/material';
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



    return (
   
    <>
    <div className="mbsc-row container" >
        <div className="  avatarRegistro ocultar-div ">            
        </div>
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
            <span className="login100-form-title mb-3">
                 REGISTRO
            </span>
    </div>
        <form className="login100-form validate-form flex-sb flex-w"
               onSubmit={onSubmit}>
        <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3 input" >
        <input 
            label="nombre" 
            className=" form-control " 
            type="nombre" 
            name="nombre" 
            placeholder="nombre"
             value={form.nombre}
            onChange={onChange}/>
    </div>
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3 input" >
        <input 
            label="Password" 
            className=" form-control " 
            type="email" 
            name="email" 
            placeholder="Email"
             value={form.email}
            onChange={onChange}/>
    </div>

<div className="mbsc-row input">
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3 ">
        <input 
            className=" form-control input" 
            type="password" 
            name="password" 
            placeholder="Password"
            value={form.password}
            onChange={onChange} />
    </div>

</div>
<div className="mbsc-row input">
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3 ">
        <input 
            type="file"
            multiple
            ref={ fileInputRef }
            onChange={ onFileInputChange }
            style={{ display: 'none' }}
            name="img"
            />
    </div>

</div>
            <Fab size="small" style={{  margin: 20 }}color="secondary" aria-label="add" onClick={ () => fileInputRef.current.click() } >
                <AddIcon />
            </Fab><span >Subir avatar</span>
<div className="mbsc-row">
    <div className="mbsc-col-12 mbsc-col-md-12 mbsc-col-lg-3">
        <div className="mbsc-button-group-block">
      
              <div className="col text-right responsive">
              <Link to="/" className="txt1">
                            Tienes cuenta?
                </Link>
                </div>        </div>
    </div>
    <div className="mbsc-col-12 mbsc-col-md-12 mbsc-col-lg-3">
        <div className="mbsc-button-group-block">
            <Button type="submit" className="login100-form-btn responsive-ingresar" >
                                            Crear cuenta

                </Button>
         </div>
    </div>
</div></form>
</div>

    
    </>
    )
}