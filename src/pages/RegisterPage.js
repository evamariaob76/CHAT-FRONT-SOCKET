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


    return (
    <div className='container  'style={{border:'1px solid red'}} id="container">
        <div className='row'> 
                <div className="img ">         

        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-12 login100-form  ">   
        <img src ="https://res.cloudinary.com/drwgawhls/image/upload/v1655289112/chat/j8idqcxbbxwhcxymelpw.png" alt='imagenRegistro' className='img-fluid'/>         
        </div>
</div>
        </div>
            <div className='form-group row'>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
        <form className="login100-form validate-form flex-sb flex-w"
               onSubmit={onSubmit}>  
            <span className="login100-form-title mb-3 responsive">
                 Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input className="input100 inputstl" type="text" name="nombre" placeholder="Nombre" onChange={onChange} value={form.nombre}/>
                <span className="focus-input100"></span>
            </div>

            
            <div className="wrap-input100 validate-input mb-3">
                <input className="input100 responsive" type="email" name="email" placeholder="Email"onChange={onChange} value={form.email}/>
                <span className="focus-input100"></span>
            </div>
            
            
            <div className="wrap-input100 validate-input mb-3">
                <input className="input100 responsive" type="password" name="password" onChange={onChange} placeholder="Password"value={form.password}/>
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
            </Fab><span className='responsive'>Subir avatar</span>
            <div className='col text-right ' style={{marginBottom:'3%'}}>
                <Link to="/" className="txt1 responsive">
                            Tienes cuenta?
                </Link>
             </div>
                         </div>

            <div className="center-block ">
                    <button type="submit" className="login100-form-btn responsive">
                        Crear cuenta
                </button>
            </div>

        </form>
                </div>
    </div>
    </div>
    )
}