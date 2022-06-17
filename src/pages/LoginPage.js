import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';
import {  Button } from '@mui/material';



export const LoginPage = () => {
const {login} = useContext(AuthContext);

    const [form, setForm] = useState({
    email:'',
    password:'',
    rememberMe: false
});
useEffect(() => {
  const email=localStorage.getItem('email');
  if(email){
    setForm((form)=>({
        ...form,
        email,
        rememberMe:true,  
    }))
  }
}, [])

const onChange =({target})=>{
    const {name, value}= target;
    setForm({
        ...form,
        [name]: value
    })

};

const onSubmit= async (e)=>{
    e.preventDefault();
    if(form.rememberMe){
        localStorage.setItem('email', form.email)
    }
    else{
        localStorage.removeItem('email')
    }
    const{email, password}= form;

    const ok = await login(email,password);
    console.log(ok)
    if(!ok){
        Swal.fire('Error', 'Verifique usuario y/o contraseña', 'error')

    }
}

const toogleCheck= ()=>{
    setForm({
        ...form,
        rememberMe: !form.rememberMe
    })
};

const todoOK=()=>{
    return( form.email.length > 0 && form.password.length >0) ? true : false;
}

    return (
   
<>
<div className="mbsc-row container" >
        <div className="  avatarRegistro ocultar-div ">            
        </div>
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
            <span className="login100-form-title mb-3">
                 Ingreso
            </span>
    </div>
        <form className="login100-form validate-form flex-sb flex-w"
               onSubmit={onSubmit}>
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
    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3 " onClick={()=>toogleCheck()}>

        <input 
            className="input-checkbox100" 
            id="ckb1" 
            type="checkbox" 
            name="rememberMe"
            checked={form.rememberMe}
            readOnly />
                       <label className="label-checkbox100 responsive">
                        Recordarme
                 </label>
    </div>

</div>
<div className="mbsc-row">
    <div className="mbsc-col-12 mbsc-col-md-12 mbsc-col-lg-3">
        <div className="mbsc-button-group-block">
     
              <div className="col text-right responsive">
                    <Link to="/auth/register" className="txt1">
                        Nueva cuenta?
                    </Link>
                </div>        </div>
    </div>
    <div className="mbsc-col-12 mbsc-col-md-12 mbsc-col-lg-3">
        <div className="mbsc-button-group-block">
            <Button type="submit" className="login100-form-btn responsive-ingresar" disabled={!todoOK()}>
                    Ingresar
                </Button>
         </div>
    </div>
</div></form>
</div>

</>

    )
}